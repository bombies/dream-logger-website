import {NextRequest, NextResponse} from "next/server";
import redis from "@/app/api/utils/redis";
import Redis from "ioredis";
import {buildResponse} from "@/app/api/utils/types";

export type RateLimiterLocation = {
    country: string,
    city: string,
}

export type RateLimiterGeoLimit = {
    location: RateLimiterLocation,
    limit: number,
    duration: number,
}

export default class RateLimiter {
    private readonly redisClient: Redis

    constructor(
        private readonly LIMIT_PER_SECOND = 10,
        private readonly DURATION = 60,
        private readonly GEO_LIMITS: RateLimiterGeoLimit[] = []
    ) {
        this.redisClient = redis
    }

    public async handle(req: NextRequest, work: () => Promise<NextResponse>): Promise<NextResponse> {
        const ipAddr = req.ip
        if (!ipAddr)
            return buildResponse({
                status: 403,
                message: "Couldn't fetch your IP address for this rate-limited route!"
            })

        const {country, city} = req.geo ?? {country: undefined, city: undefined}
        const matchingLimit = this.GEO_LIMITS.find((limit) =>
            limit.location.country === country && limit.location.city === city
        )

        const doRateLimitCheck = async (key: string, limitMax: number) => {
            let count = Number(await this.redisClient.get(key) || 0)

            if (count >= limitMax)
                return this.tooManyRequests()

            this.redisClient.incr(key)
            this.redisClient.expire(key, this.DURATION)
            return work()
        }

        if (!matchingLimit)
            return doRateLimitCheck(`dreamlogger_${process.env.NODE_ENV}_ratelimit:${ipAddr}`, this.LIMIT_PER_SECOND)
        else
            return doRateLimitCheck(
                `dreamlogger_${process.env.NODE_ENV}_ratelimit:${country}:${city}:${ipAddr}`,
                matchingLimit.limit
            )
    }

    private tooManyRequests(): NextResponse {
        return NextResponse.json(null, {
            status: 429,
            statusText: "You are being rate limited!"
        })
    }
}