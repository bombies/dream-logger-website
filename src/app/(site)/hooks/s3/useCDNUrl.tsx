"use client"

const useCDNUrl = (key?: string | null): string | undefined => {
    return key ? process.env.NEXT_PUBLIC_CDN_URL + `/${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}/${key}` : undefined
}

export default useCDNUrl