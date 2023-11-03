import {NextResponse} from "next/server";
import {ZodError} from "zod";

export type RouteResponseType<T> = {
    status?: number,
    message?: string,
    headers?: HeadersInit,
    data?: T,
}

class RouteResponse<T> {

    constructor(private readonly data: RouteResponseType<T>) {
    }

    public toNextResponse(): NextResponse<T | null> {
        return NextResponse.json(this.data.data ?? null, {
            status: this.data.status,
            statusText: this.data.message,
            headers: this.data.headers,
        })
    }
}

export const buildResponse = <T>(response: RouteResponseType<T>): NextResponse<T | null> => {
    return new RouteResponse(response).toNextResponse()
}

export const buildFailedValidationResponse = <T>(error: ZodError): NextResponse<T | null> => {
    if (!error.message)
        console.error(error.issues)

    return new RouteResponse({
        status: 400,
        message: error.issues.map(issue => issue.message).join(", ") ?? "Something went wrong!",
        data: null
    }).toNextResponse()
}