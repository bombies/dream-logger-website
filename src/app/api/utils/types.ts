import {NextResponse} from "next/server";

export type RouteResponseType<T> = {
    status?: number,
    message?: string,
    data?: T,
}

class RouteResponse<T> {

    constructor(private readonly data: RouteResponseType<T>) {
    }

    public toNextResponse(): NextResponse<T | undefined> {
        return NextResponse.json<T | undefined>(this.data.data, {
            status: this.data.status,
            statusText: this.data.message
        })
    }
}

export const buildResponse = <T>(response: RouteResponseType<T>): NextResponse<T | undefined> => {
    return new RouteResponse(response).toNextResponse()
}

export type NextRouteResponse<T extends RouteResponse<T>> = NextResponse<T>