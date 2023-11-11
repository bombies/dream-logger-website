"use client"

import {FC, Fragment, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {PostDreamDto} from "@/app/api/me/dreams/dreams.dto";
import Input from "@/app/(site)/components/inputs/Input";
import TextArea from "@/app/(site)/components/inputs/TextArea";
import Button from "@/app/(site)/components/Button";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import DreamCharacterSelect
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/DreamCharacterSelect";
import DreamTagSelect from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/DreamTagSelect";
import {Divider} from "@nextui-org/divider";
import PencilIcon from "@/app/(site)/components/icons/PencilIcon";
import CloseIcon from "@/app/(site)/components/icons/CloseIcon";
import useSWRMutation from "swr/mutation";
import {Dream} from "@prisma/client";
import {deleteMutator, handleAxiosError, postMutator} from "@/utils/client/client-utils";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import AddTagModal from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/tags/AddTagModal";
import AddCharacterModal
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/characters/AddCharacterModal";
import {Spacer} from "@nextui-org/react";
import {
    useDreamLogForm
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/DreamLogFormProvider";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";

type FormProps = Omit<PostDreamDto, 'tags' | 'characters' | 'id'> & {
    tags?: string[] | string
    characters?: string[] | string
}

type Props = {
    draftDream?: Dream,
    onDelete?: () => void;
    onCreate?: (dream: Dream) => void;
}

const CreateDream = () => {
    return useSWRMutation('/api/me/dreams', postMutator<PostDreamDto, Dream | null>())
}

const DeleteDraft = (draftId?: string) => (
    useSWRMutation(draftId && `/api/me/dreams/drafts/${draftId}`, deleteMutator<Dream | null>())
)

const LogDreamForm: FC<Props> = ({draftDream, onCreate, onDelete}) => {
    const {data: session} = useSession()
    const [addTagModalOpen, setAddTagModalOpen] = useState(false)
    const [addCharacterModalOpen, setAddCharacterModalOpen] = useState(false)
    const {characters, tags, dreams} = useDreamsData()
    const {register, handleSubmit} = useForm<FormProps>()
    const [formData, setFormData] = useDreamLogForm()
    const {trigger: createDream, isMutating: dreamIsCreating} = CreateDream()
    const {trigger: deleteDraft} = DeleteDraft(draftDream?.id)
    const [deletionModalOpen, setDeletionModalOpen] = useState(false)

    const handleDreamCreation = useCallback(async (dto: PostDreamDto) => (
        createDream({body: dto})
            .then(res => {
                const dream = res.data!
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
        if (!session?.user || !draftDream)
            return

        const mutableData: PostDreamDto = {id: draftDream.id, ...data}
        mutableData.tags = formData.draftTags ?? (typeof dataTags === "string" ? dataTags.split(",") : dataTags)
        mutableData.characters = formData.draftCharacters ?? (typeof dataCharacters === "string" ? dataCharacters.split(",") : dataCharacters)

        const {tags: tagIds, characters: characterIds, comments, ...dreamData} = mutableData
        // In case there's ever a need to include the tags and such in the optimistic data
        // const tagObjects = tagIds && tags.data.filter(tag => tagIds.some(id => id === tag.id))
        // const characterObjects = characterIds && characters.data.filter(character => characterIds.some(id => id === character.id))

        if (dreams.optimisticData.editOptimisticData && draftDream) {
            await toast.promise(dreams.optimisticData
                    .editOptimisticData(
                        () => handleDreamCreation(mutableData),
                        {
                            ...dreamData,
                            comments: comments ?? null,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            userId: session.user.id,
                            isDraft: false,
                            draftTags: [],
                            draftCharacters: []
                        }
                    ), {
                    loading: "Creating new dream log...",
                    success: "Successfully logged your dream!",
                    error: "Could not log your dream!"
                }
            )
        }
    }, [draftDream, dreams.optimisticData, formData.draftCharacters, formData.draftTags, handleDreamCreation, session?.user])

    const doDraftDeletion = useCallback(async () => {
        if (!draftDream)
            return

        const doDelete = () => (
            deleteDraft()
                .then(res => res.data!)
                .catch(handleAxiosError)
        )

        if (dreams.optimisticData.removeOptimisticData)
            await dreams.optimisticData.removeOptimisticData(doDelete, draftDream)
    }, [deleteDraft, draftDream, dreams.optimisticData])

    return (
        <Fragment>
            <ConfirmationModal
                isOpen={deletionModalOpen}
                title="Delete Draft"
                onAccept={() => {
                    doDraftDeletion()
                    if (onDelete)
                        onDelete()
                }}
                onReject={() => setDeletionModalOpen(false)}
            >
                Are you sure you want to delete this draft?
            </ConfirmationModal>
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
                        value={formData.title ?? draftDream?.title}
                        onValueChange={(value) => {
                            setFormData(prev => ({
                                    ...prev,
                                    title: value
                                })
                            )
                        }}
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
                        value={formData.description ?? draftDream?.description}
                        onValueChange={(value) => {
                            setFormData(prev => ({
                                    ...prev,
                                    description: value
                                })
                            )
                        }}
                    />
                    <DreamTagSelect
                        register={register}
                        tags={tags}
                        isDisabled={dreamIsCreating}
                        onModalOpen={() => setAddTagModalOpen(true)}
                        value={formData.draftTags ?? draftDream?.draftTags ?? []}
                        onTagSelect={(ids) => setFormData(prev => ({
                                ...prev,
                                draftTags: ids
                            })
                        )}
                    />
                    <DreamCharacterSelect
                        register={register}
                        characters={characters}
                        isDisabled={dreamIsCreating}
                        onModalOpen={() => setAddCharacterModalOpen(true)}
                        value={formData.draftCharacters ?? draftDream?.draftCharacters ?? []}
                        onCharacterSelect={(ids) => setFormData(prev => ({
                                ...prev,
                                draftCharacters: ids
                            })
                        )}
                    />
                    <Spacer y={6}/>
                    <Input
                        register={register}
                        id="comments"
                        label="Dream Comments"
                        labelPlacement="outside"
                        placeholder="Anything you'd like to add?"
                        maxLength={100}
                        isDisabled={dreamIsCreating}
                        value={formData.comments ?? draftDream?.comments ?? undefined}
                        onValueChange={(value) => {
                            setFormData(prev => ({
                                    ...prev,
                                    comments: value
                                })
                            )
                        }}
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
                            onPress={() => setDeletionModalOpen(true)}
                            isDisabled={dreamIsCreating || !draftDream?.id}
                        >
                            Delete Draft
                        </Button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default LogDreamForm