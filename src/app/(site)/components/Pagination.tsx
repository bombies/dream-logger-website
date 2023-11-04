import {FC} from "react";
import {Pagination as NextPagination, PaginationProps} from "@nextui-org/react"
import clsx from "clsx";

type Props = PaginationProps

const Pagination: FC<Props> = ({classNames, ...paginationProps}) => {
    return (
        <NextPagination
            {...paginationProps}
            classNames={{
                ...classNames,
                item: clsx("bg-secondary hover:!bg-primary/30", classNames?.item),
                prev: clsx("bg-secondary hover:!bg-primary/30", classNames?.prev),
                next: clsx("bg-secondary hover:!bg-primary/30", classNames?.next)
            }}
        />
    )
}

export default Pagination