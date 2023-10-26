"use client"

import {FC, useCallback} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {PostDreamDto} from "@/app/api/me/dreams/dreams.dto";
import Input from "@/app/(site)/components/Input";
import TextArea from "@/app/(site)/components/TextArea";
import Button from "@/app/(site)/components/Button";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/components/dreams/DreamsProvider";
import DreamCharacterSelect from "@/app/(site)/(internal)/dashboard/components/dreams/forms/log/DreamCharacterSelect";
import DreamTagSelect from "@/app/(site)/(internal)/dashboard/components/dreams/forms/log/DreamTagSelect";
import {Divider} from "@nextui-org/divider";

type FormProps = Omit<PostDreamDto, 'tags' | 'characters'> & {
    tags?: string[] | string
    characters?: string[] | string
}

type Props = {
    onForget?: () => void;
}

const LogDreamForm: FC<Props> = ({onForget}) => {
    const {characters, tags} = useDreamsData()
    const {register, handleSubmit} = useForm<FormProps>()

    const onSubmit: SubmitHandler<FormProps> = useCallback(({tags, characters, ...data}) => {
        const mutableData: PostDreamDto = {...data}
        if (typeof tags === "string")
            mutableData.tags = tags.split(",")
        if (typeof characters === "string")
            mutableData.characters = characters.split(",")
        console.log(mutableData)
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
                <Input
                    isRequired
                    register={register}
                    id="title"
                    label="Dream Title"
                    labelPlacement="outside"
                    placeholder="Enter a fancy title for your special dream!"
                    maxLength={500}
                />
                <TextArea
                    isRequired
                    register={register}
                    id="description"
                    label="Your Dream"
                    labelPlacement="outside"
                    placeholder="Tell your tale..."
                    maxLength={5000}
                />
                <DreamTagSelect
                    register={register}
                    tags={tags}
                />
                <DreamCharacterSelect
                    register={register}
                    characters={characters}
                />
                <Input
                    register={register}
                    id="comments"
                    label="Dream Comments"
                    labelPlacement="outside"
                    placeholder="Anything you'd like to add?"
                    maxLength={100}
                />
                <Divider/>
                <div className="flex justify-end pr-6 phone:p-0 phone:justify-center gap-4">
                    <Button
                        type="submit"
                        color="cta"
                    >Log Dream</Button>
                    <Button
                        variant="bordered"
                        color="danger"
                        onPress={() => {
                            if (onForget)
                                onForget()
                        }}
                    >
                        Forget It
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default LogDreamForm