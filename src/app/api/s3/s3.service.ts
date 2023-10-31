import {S3FileFetchFormSchema, S3PostFormDataSchema} from "@/app/api/s3/s3.dto";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import {DeleteObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import S3 from "@/libs/S3";
import {CreateInvalidationCommand} from "@aws-sdk/client-cloudfront";
import CloudFront from "@/libs/cloudfront";
import {generateRandomString} from "@/app/api/utils/node-utils";

class S3Service {

    public async uploadFile(formData: FormData): Promise<NextResponse<{ key: string } | null>> {
        const formValidated = S3PostFormDataSchema.safeParse(formData)
        if (!formValidated.success)
            return buildFailedValidationResponse(formValidated.error)

        const {key, file, isPublic, path, oldKey} = formValidated.data
        const fileBuffer = Buffer.from(await file.arrayBuffer())

        const validKey = key && key.length ? (path && path.length ? `${path}${key}` : key) : (path && path.length ? `${path}${generateRandomString()}` : generateRandomString())
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Body: fileBuffer,
            Key: `${process.env.NODE_ENV === "development" ? "dev" : "prod"}/${validKey}`,
            ContentType: file.type,
            Tagging: isPublic === "true" ? "public=true" : undefined
        })

        const res = await S3.send(command);
        if (res.$metadata.httpStatusCode === 200 && oldKey && oldKey.length) {
            // Delete the old version (if any)
            const validOldKey = path && path.length ? `${path}${oldKey}` : oldKey

            // Delete from S3 bucket
            await this.deleteFileFromKey(validOldKey)
        }

        return buildResponse({
            data: {key: validKey}
        })
    }

    public async fetchFileUrl(searchParams: URLSearchParams): Promise<NextResponse<{ url: string } | null>> {
        const formValidated = S3FileFetchFormSchema.safeParse(searchParams)
        if (!formValidated.success)
            return buildFailedValidationResponse(formValidated.error)

        const {key} = formValidated.data
        const url = `${process.env.CLOUDFRONT_URL}/${process.env.NODE_ENV === "development" ? "dev" : "prod"}/${key}`
        // const privateKey = await fs.readFile(process.cwd() + process.env.CLOUDFRONT_PRIVATE_KEY_PATH, "utf-8")
        // const signedUrl = getSignedUrl({
        //     url,
        //     keyPairId: process.env.CLOUDFRONT_PUBLIC_KEY_ID ?? "",
        //     privateKey: privateKey,
        //     dateLessThan: new Date(Date.now() + (1000 * 60 * 60 * 24)).toString()
        // })

        return buildResponse({
            data: {url}
        })
    }

    public async deleteFile(searchParams: URLSearchParams): Promise<NextResponse> {
        const formValidated = S3FileFetchFormSchema.safeParse(searchParams)
        if (!formValidated.success)
            return buildFailedValidationResponse(formValidated.error)

        const {key} = formValidated.data
        return this.deleteFileFromKey(key)
    }

    private async deleteFileFromKey(key: string): Promise<NextResponse> {
        const command = new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${process.env.NODE_ENV === "development" ? "dev" : "prod"}/${key}`
        })

        const res = await S3.send(command)
        const statusCode = res.$metadata.httpStatusCode

        if (statusCode === 204)
            await this.invalidateCloudFrontCache(key)

        return buildResponse({
            status: statusCode === 204 ? 200 : statusCode,
            message: statusCode !== 204 ? `Couldn't find any objects with the key: ${key}` : undefined,
            data: statusCode !== 204 ? {key} : undefined
        })
    }

    private async invalidateCloudFrontCache(key: string) {
        const invalidationCommand = new CreateInvalidationCommand({
            DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID ?? "",
            InvalidationBatch: {
                CallerReference: key,
                Paths: {
                    Quantity: 1,
                    Items: [
                        `/${process.env.NODE_ENV === "development" ? "dev" : "prod"}/${key}`
                    ]
                }
            }
        })

        return CloudFront.send(invalidationCommand)
    }
}

const s3Service = new S3Service()
export default s3Service