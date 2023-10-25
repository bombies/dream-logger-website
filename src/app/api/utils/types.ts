import {NextResponse} from "next/server";
import {ZodError} from "zod";

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

export const buildFailedValidationResponse = <T>(error: ZodError): NextResponse<T | undefined> => {
    return new RouteResponse({
        status: 400,
        message: error.message,
        data: undefined
    }).toNextResponse()
}

export type NextRouteResponse<T extends RouteResponse<T>> = NextResponse<T>