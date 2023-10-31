// To be used on the SERVER ONLY

import {CloudFrontClient} from "@aws-sdk/client-cloudfront";
import {fromEnv} from "@aws-sdk/credential-providers";

const CloudFront = new CloudFrontClient({
    region: process.env.AWS_REGION,
    credentials: fromEnv()
})

export default CloudFront