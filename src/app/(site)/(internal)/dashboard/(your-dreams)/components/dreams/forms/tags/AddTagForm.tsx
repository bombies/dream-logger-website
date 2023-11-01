"use client"

import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {PostDreamTagDto} from "@/app/api/me/dreams/dreams.dto";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import {DreamTag} from "@prisma/client";
import {handleAxiosError} from "@/utils/client/client-utils";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import Input from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";

type FormProps = PostDreamTagDto

type CreateTagsArgs = {
    arg: {
        dto: PostDreamTagDto
    }
}

const CreateTag = () => {
    const mutator = (url: string, {arg}: CreateTagsArgs) => axios.post<DreamTag | null>(url, arg.dto)
    return useSWRMutation('/api/me/dreams/tags', mutator)
}

type Props = {
    onSuccess?: (tag: DreamTag) => void
}

const AddTagForm: FC<Props> = ({onSuccess}) => {
    const {data: session} = useSession()
    const {register, handleSubmit} = useForm<FormProps>()
    const {trigger: createTag, isMutating: isCreating} = CreateTag()
    const {tags} = useDreamsData()

    const handleCreation = async (dto: PostDreamTagDto) => (
        createTag({dto})
            .then(res => {
                const tag = res.data!!
                if (onSuccess)
                    onSuccess(tag)
                return tag
            })
            .catch(handleAxiosError)
    )

    const onSubmit: SubmitHandler<FormProps> = async (data) => {
        if (!session?.user)
            return;
        if (tags.optimisticData.addOptimisticData)
            await toast.promise(tags.optimisticData
                    .addOptimisticData(() => handleCreation(data), {
                        id: '',
                        ...data,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userId: session.user.id
                    }),
                {
                    loading: "Adding new tag...",
                    success: "Successfully added that tag!",
                    error: "Could not add that tag!"
                }
            )

    }

    return (
        <form
            name="add_dream_tag_form"
            id="add_dream_tag_form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-6">
                <Input
                    isRequired
                    id="tag"
                    label="Tag Name"
                    register={register}
                    labelPlacement="outside"
                    placeholder="Enter a tag name..."
                    isDisabled={isCreating}
                    maxLength={64}
                />
                <Button
                    isLoading={isCreating}
                    isDisabled={isCreating}
                    type="submit"
                    form="add_dream_tag_form"
                    color="primary"
                    variant="shadow"
                >Create Tag</Button>
            </div>
        </form>
    )
}

export default AddTagForm