"use client"

import { useMediaQuery } from "@uidotdev/usehooks"

export const usePhone = () => useMediaQuery("only screen and (max-width : 615px)")
export const useTablet = () => useMediaQuery("only screen and (min-width: 616px) and (max-width : 1025px)")
export const useLaptop = () => useMediaQuery("only screen and (min-width: 1206px) and (max-width : 1280px)")
export const useLaptopBig = () => useMediaQuery("only screen and (min-width: 1281px) and (max-width : 1440px)")
export const useDesktop = () => useMediaQuery("only screen and (min-width : 1920px)")

export enum ScreenType {
    PHONE,
    TABLET,
    LAPTOP,
    LAPTOP_BIG,
    DESKTOP
}

export const useScreenType = (): ScreenType => {
    const isPhone = usePhone()
    const isTablet = useTablet()
    const isLaptop = useLaptop()
    const isBigLaptop = useLaptopBig()
    const isDesktop = useDesktop()

    let screenType: ScreenType;
    if (isDesktop) screenType = ScreenType.DESKTOP
    else if (isBigLaptop) screenType = ScreenType.LAPTOP_BIG
    else if (isLaptop) screenType = ScreenType.LAPTOP
    else if (isTablet) screenType = ScreenType.TABLET
    else if (isPhone) screenType = ScreenType.PHONE
    else screenType = ScreenType.LAPTOP
    return screenType;
}
