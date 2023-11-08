import {nextui} from "@nextui-org/react";
import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            desktop: {"max": "1920px"},
            "laptop-big": {"max": "1440px"},
            laptop: {"max": "1280px"},
            tablet: {"max": "1025px"},
            phone: {"max": "615px"},
            "laptop-min": {"min": "1280px"},
            "tablet-min": {"min": "1025px"},
            "phone-min": {"min": "615px"}
        },
        extend: {
            colors: {
                primary: "#9E23FF",
                subtext: "#828282",
                secondary: "#1A002F",
                dark: "#0C0015",
                danger: "#FF4A4A",
                "cta-start": "#8F00FF",
                "cta-end": "#270079"
            }
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    background: "#0C0015",
                    foreground: "#EAE0FF",
                    primary: {
                        DEFAULT: "#9E23FF"
                    },
                    secondary: {
                        DEFAULT: "#1A002F"
                    },
                    default: {
                        DEFAULT: "#9E23FF"
                    },
                    danger: {
                        DEFAULT: "#FF4A4A"
                    }
                }
            },
            dark: {
                colors: {
                    background: "#0C0015",
                    foreground: "#EAE0FF",
                    primary: {
                        DEFAULT: "#9E23FF"
                    },
                    secondary: {
                        DEFAULT: "#1A002F"
                    },
                    default: {
                        DEFAULT: "#9E23FF"
                    },
                    danger: {
                        DEFAULT: "#FF4A4A"
                    }
                }
            }
        }
    })]
}

export default config
