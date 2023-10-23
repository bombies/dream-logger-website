import {FC} from "react";
import NextImage, {ImageProps} from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

type Props = ImageProps

const Image: FC<Props> = ({className, width, height, ...props}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            viewport={{ once: true }}
            className={clsx("relative", className)
        }
            style={{
                width: width && `${width}rem`,
                height: width && `${height ?? width}rem`,
            }}
        >
            <NextImage {...props} />
        </motion.div>
    )
}

export default Image