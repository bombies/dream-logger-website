import {FC, PropsWithChildren} from "react";

const Title: FC<PropsWithChildren> = ({children}) => {
    return (
        <h1 className="font-bold text-7xl phone:text-4xl mb-20 phone:mb-10">{children}</h1>
    )
}

export default Title