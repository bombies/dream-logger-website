"use client"

import {useEffect, useState} from "react";

const useComponentDidMount = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted
}

export default useComponentDidMount