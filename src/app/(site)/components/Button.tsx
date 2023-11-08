import {extendVariants, Button as NextUIButton} from "@nextui-org/react";
import {motion} from "framer-motion";

const Button = extendVariants(NextUIButton, {
    variants: {
        color: {
            cta: 'bg-gradient-to-r from-[#8F00FF] to-[#270079] font-semibold text-light',
            secondary: 'bg-white text-dark font-semibold'
        },
        size: {
            xl: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium",
            "2xl": "px-unit-12 min-w-unit-32 h-unit-20 text-2xl gap-unit-4 rounded-3xl",
            "3xl": "px-unit-16 min-w-unit-36 h-unit-24 text-3xl gap-unit-4 rounded-3xl"
        }
    }
})
export default Button