// To be used on the SERVER ONLY

import {S3Client} from "@aws-sdk/client-s3";
import {fromEnv} from "@aws-sdk/credential-providers";

const S3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv(),
})

export default S3