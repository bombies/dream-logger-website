"use client"

import {FC, Fragment, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {PostDreamDto} from "@/app/api/me/dreams/dreams.dto";
import Input from "@/app/(site)/components/inputs/Input";
import TextArea from "@/app/(site)/components/inputs/TextArea";
import Button from "@/app/(site)/components/Button";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/components/dreams/DreamsProvider";
import DreamCharacterSelect from "@/app/(site)/(internal)/dashboard/components/dreams/forms/log/DreamCharacterSelect";
import DreamTagSelect from "@/app/(site)/(internal)/dashboard/components/dreams/forms/log/DreamTagSelect";
import {Divider} from "@nextui-org/divider";
import PencilIcon from "@/app/(site)/components/icons/PencilIcon";
import CloseIcon from "@/app/(site)/components/icons/CloseIcon";
import useSWRMutation from "swr/mutation";
import {Dream} from "@prisma/client";
import {handleAxiosError, postMutator} from "@/utils/client/client-utils";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import AddTagModal from "@/app/(site)/(internal)/dashboard/components/dreams/forms/tags/AddTagModal";
import AddCharacterModal from "@/app/(site)/(internal)/dashboard/components/dreams/forms/characters/AddCharacterModal";

type FormProps = Omit<PostDreamDto, 'tags' | 'characters'> & {
    tags?: string[] | string
    characters?: string[] | string
}

type Props = {
    onForget?: () => void;
    onCreate?: (dream: Dream) => void;
}

const CreateDream = () => {
    return useSWRMutation('/api/me/dreams', postMutator<PostDreamDto, Dream | null>())
}

const LogDreamForm: FC<Props> = ({onCreate, onForget}) => {
    const {data: session} = useSession()
    const [addTagModalOpen, setAddTagModalOpen] = useState(false)
    const [addCharacterModalOpen, setAddCharacterModalOpen] = useState(false)
    const {characters, tags, dreams} = useDreamsData()
    const {register, handleSubmit} = useForm<FormProps>()
    const {trigger: createDream, isMutating: dreamIsCreating} = CreateDream()

    const handleDreamCreation = useCallback(async (dto: PostDreamDto) => (
        createDream({body: dto})
            .then(res => {
                const dream = res.data!!
                if (onCreate)
                    onCreate(dream)
                return dream
            })
            .catch(handleAxiosError)
    ), [createDream, onCreate])

    const onSubmit: SubmitHandler<FormProps> = useCallback(async ({
                                                                      tags: dataTags,
                                                                      characters: dataCharacters,
                                                                      ...data
                                                                  }) => {
        if (!session?.user)
            return

        const mutableData: PostDreamDto = {...data}
        if (typeof dataTags === "string")
            mutableData.tags = dataTags.split(",")
        if (typeof dataCharacters === "string")
            mutableData.characters = dataCharacters.split(",")

        const {tags: tagIds, characters: characterIds, comments, ...dreamData} = mutableData
        // In case there's ever a need to include the tags and such in the optimistic data
        // const tagObjects = tagIds && tags.data.filter(tag => tagIds.some(id => id === tag.id))
        // const characterObjects = characterIds && characters.data.filter(character => characterIds.some(id => id === character.id))

        if (dreams.optimisticData.addOptimisticData)
            await toast.promise(dreams.optimisticData
                    .addOptimisticData(
                        () => handleDreamCreation(mutableData),
                        {
                            id: '',
                            userId: session.user.id,
                            ...dreamData,
                            comments: comments ?? null,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    ), {
                    loading: "Creating new dream log...",
                    success: "Successfully logged your dream!",
                    error: "Could not log your dream!"
                }
            )
    }, [dreams.optimisticData, handleDreamCreation, session?.user])

    return (
        <Fragment>
            <AddTagModal
                isOpen={addTagModalOpen}
                onClose={() => setAddTagModalOpen(false)}
            />
            <AddCharacterModal
                isOpen={addCharacterModalOpen}
                onClose={() => setAddCharacterModalOpen(false)}
            />
            <form
                name="dream_log_form"
                id="dream_log_form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-6">
                    <Input
                        isRequired
                        register={register}
                        id="title"
                        label="Dream Title"
                        labelPlacement="outside"
                        placeholder="Enter a fancy title for your special dream!"
                        maxLength={500}
                        isDisabled={dreamIsCreating}
                    />
                    <TextArea
                        isRequired
                        register={register}
                        id="description"
                        label="Your Dream"
                        labelPlacement="outside"
                        placeholder="Tell your tale..."
                        maxLength={5000}
                        isDisabled={dreamIsCreating}
                    />
                    <DreamTagSelect
                        register={register}
                        tags={tags}
                        isDisabled={dreamIsCreating}
                        onModalOpen={() => setAddTagModalOpen(true)}
                    />
                    <DreamCharacterSelect
                        register={register}
                        characters={characters}
                        isDisabled={dreamIsCreating}
                        onModalOpen={() => setAddCharacterModalOpen(true)}
                    />
                    <Input
                        register={register}
                        id="comments"
                        label="Dream Comments"
                        labelPlacement="outside"
                        placeholder="Anything you'd like to add?"
                        maxLength={100}
                        isDisabled={dreamIsCreating}
                    />
                    <Divider/>
                    <div className="flex justify-end pr-6 phone:p-0 phone:justify-center gap-4">
                        <Button
                            type="submit"
                            form="dream_log_form"
                            color="cta"
                            startContent={<PencilIcon width={20}/>}
                            isLoading={dreamIsCreating}
                            isDisabled={dreamIsCreating}
                        >Log Dream</Button>
                        <Button
                            variant="bordered"
                            color="danger"
                            startContent={<CloseIcon width={20}/>}
                            onPress={() => {
                                if (onForget)
                                    onForget()
                            }}
                            isDisabled={dreamIsCreating}
                        >
                            Forget It
                        </Button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default LogDreamForm