import {Dropdown as NextDropdown} from "@nextui-org/dropdown";
import {extendVariants} from "@nextui-org/react";

const Dropdown = extendVariants(NextDropdown, {
    variants: {
        color: {
            gradient: {
                base: "border font-semibold border-primary/30 px-4 py-6 bg-gradient-to-b from-[#8F00FF30] to-[#27007940] backdrop-blur-md"
            }
        }
    }
})

export default Dropdown