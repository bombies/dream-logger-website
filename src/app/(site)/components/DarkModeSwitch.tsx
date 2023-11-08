"use client"

import {FC} from "react";
import {useDarkMode} from "@/app/(site)/components/providers/DarkModeProvider";
import {Switch, SwitchProps} from "@nextui-org/react";
import {MoonIcon, SunIcon} from "@nextui-org/shared-icons";

type Props = {
    showLabel?: boolean,
} & Pick<SwitchProps, "size">

const DarkModeSwitch: FC<Props> = ({showLabel, size}) => {
    const [darkMode, setDarkMode] = useDarkMode()

    return (
        <Switch
            size={size ?? "sm"}
            isSelected={darkMode}
            onValueChange={setDarkMode}
            endContent={<SunIcon/>}
            startContent={<MoonIcon/>}
        >
            {showLabel && `${darkMode ? "Dark" : "Light"} Mode`}
        </Switch>
    )
}

export default DarkModeSwitch