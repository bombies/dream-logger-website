import {authenticated} from "@/app/api/utils/api-utils";
import s3Service from "@/app/api/s3/s3.service";

export const POST = (req: Request) =>
    authenticated(async () =>
        s3Service.uploadFile(await req.formData())
    )

export const GET = (req: Request) =>
    authenticated(async () => s3Service.fetchFileUrl(new URL(req.url).searchParams))

export const DELETE = (req: Request) =>
    authenticated(async () => s3Service.deleteFile(new URL(req.url).searchParams))