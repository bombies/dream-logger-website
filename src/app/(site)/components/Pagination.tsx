import {FC, useMemo} from "react";
import {Pagination as NextPagination, PaginationProps} from "@nextui-org/react"
import clsx from "clsx";

type Props = PaginationProps

const Pagination: FC<Props> = ({classNames, ...paginationProps}) => {
    const buttonClassName = useMemo(() => "dark:bg-dark hover:!bg-primary/30 text-dark dark:text-light border border-primary dark:border-none", [])

    return (
        <NextPagination
            {...paginationProps}
            classNames={{
                ...classNames,
                item: clsx(buttonClassName, classNames?.item),
                prev: clsx(buttonClassName, classNames?.prev),
                next: clsx(buttonClassName, classNames?.next)
            }}
        />
    )
}

export default Pagination