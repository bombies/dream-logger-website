import {ColorScale, nextui} from "@nextui-org/react";
import type { Config } from 'tailwindcss'

const primaryColorScale: ColorScale = {
  50: '#F5E9FF',
  100: '#DFB7FF',
  200: '#C986FF',
  300: '#B454FF',
  400: '#9E23FF',
  500: '#8312DD',
  600: '#6A04BB',
  700: '#560099',
  800: '#430077',
  900: '#300055',
  foreground: '#EAE0FF',
  DEFAULT: '#9E23FF'
}

const secondaryColorScale: ColorScale = {
  ...primaryColorScale,
  DEFAULT: '#560099'
}

const dangerColorScale: ColorScale = {
  50: '#FFEDED',
  100: '#FFC4C4',
  200: '#FF9B9B',
  300: '#FF7373',
  400: '#FF4A4A',
  500: '#DD3636',
  600: '#BB2525',
  700: '#991717',
  800: '#770C0C',
  900: '#550505',
  foreground: '#EAE0FF',
  DEFAULT: '#FF4A4A'
}

const backgroundColorScale: ColorScale = {
  ...primaryColorScale,
  900: '#0C0015',
  DEFAULT: '#0C0015'
}

const foregroundColorScale: ColorScale = {
  50: '#FDFCFF',
  100: '#EAE0FF',
  200: '#D2C8E8',
  300: '#BBB1D2',
  400: '#A59ABB',
  500: '#8F85A4',
  600: '#79708E',
  700: '#655C77',
  800: '#504960',
  900: '#3D364A',
  foreground: '#EAE0FF',
  DEFAULT: '#EAE0FF'
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      desktop: { "max": "1920px" },
      "laptop-big": { "max": "1440px" },
      laptop: { "max": "1280px" },
      tablet: { "max": "1025px" },
      phone: { "max": "615px" },
      "laptop-min": { "min": "1280px" },
      "tablet-min": { "min": "1025px" },
      "phone-min": { "min": "615px" }
    },
    extend: {
      colors: {
        primary: "#9E23FF",
        subtext: "#828282",
        secondary: "#1A002F",
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
        colors: {}
      },
      dark: {
        colors: {
          background: backgroundColorScale,
          foreground: foregroundColorScale,
          divider: primaryColorScale,
          focus: primaryColorScale,
          default: primaryColorScale,
          primary: primaryColorScale,
          secondary: secondaryColorScale,
          danger: dangerColorScale
        }
      }
    }
  })]
}

export default config
