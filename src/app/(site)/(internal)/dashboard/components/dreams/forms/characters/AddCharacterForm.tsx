"use client"

import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {PostDreamCharacterDto} from "@/app/api/me/dreams/dreams.dto";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/components/dreams/DreamsProvider";
import {DreamCharacter} from "@prisma/client";
import {handleAxiosError} from "@/utils/client/client-utils";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import Input from "@/app/(site)/components/Input";
import {Button} from "@nextui-org/button";

type FormProps = PostDreamCharacterDto

type CreateTagsArgs = {
    arg: {
        dto: PostDreamCharacterDto
    }
}

const CreateCharacter = () => {
    const mutator = (url: string, {arg}: CreateTagsArgs) => axios.post<DreamCharacter | null>(url, arg.dto)
    return useSWRMutation('/api/me/dreams/characters', mutator)
}

type Props = {
    onSuccess?: (tag: DreamCharacter) => void
}

const AddCharacterForm: FC<Props> = ({onSuccess}) => {
    const {data: session} = useSession()
    const {register, handleSubmit} = useForm<FormProps>()
    const {trigger: createCharacter, isMutating: isCreating} = CreateCharacter()
    const {characters} = useDreamsData()

    const handleCreation = async (dto: PostDreamCharacterDto) => (
        createCharacter({dto})
            .then(res => {
                const character = res.data!!
                if (onSuccess)
                    onSuccess(character)
                return character
            })
            .catch(handleAxiosError)
    )

    const onSubmit: SubmitHandler<FormProps> = async (data) => {
        if (!session?.user)
            return;

        await toast.promise(characters.optimisticData
                .addOptimisticData(() => handleCreation(data), {
                    id: '',
                    ...data,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: session.user.id
                }),
            {
                loading: "Adding new character...",
                success: "Successfully added that character!",
                error: "Could not add that character!"
            }
        )

    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            name="add_dream_character_form"
            id="add_dream_character_form"
        >
            <div className="space-y-6">
                <Input
                    isRequired
                    id="name"
                    label="Character Name"
                    register={register}
                    labelPlacement="outside"
                    placeholder="Enter the name of the character..."
                    isDisabled={isCreating}
                    maxLength={256}
                />
                <Button
                    isLoading={isCreating}
                    isDisabled={isCreating}
                    type="submit"
                    form="add_dream_character_form"
                    color="primary"
                    variant="shadow"
                >Create Character</Button>
            </div>
        </form>
    )
}

export default AddCharacterForm