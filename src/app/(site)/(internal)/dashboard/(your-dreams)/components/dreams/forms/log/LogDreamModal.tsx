import {FC, useCallback} from "react";
import Modal from "@/app/(site)/components/Modal";
import LogDreamForm from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/LogDreamForm";
import {Dream} from "@prisma/client";
import useSWRMutation from "swr/mutation";
import {handleAxiosError, patchMutator} from "@/utils/client/client-utils";
import {
    useDreamLogForm
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/DreamLogFormProvider";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import {PatchDraftDreamDto} from "@/app/api/me/dreams/drafts/dream-drafts.dto";

type Props = {
    draftDream?: Dream,
    isOpen: boolean,
    onClose: () => void,
}

const UpdateDraft = (dreamId?: string) => (
    useSWRMutation(dreamId && `/api/me/dreams/drafts/${dreamId}`, patchMutator<PatchDraftDreamDto, Dream | null>())
)

const LogDreamModal: FC<Props> = ({draftDream, isOpen, onClose}) => {
    const {dreams: {optimisticData: {editOptimisticData: editOptimisticDream}}} = useDreamsData()
    const [formData, setFormData] = useDreamLogForm()
    const {trigger: updateDream} = UpdateDraft(draftDream?.id)

    const saveDraft = useCallback(async () => {
        if (!draftDream)
            return;

        const update = () => (
            updateDream({body: formData})
                .then(res => res.data!)
                .catch((e) => {
                    if (e instanceof Error && e.message.includes("missing key"))
                        return undefined;
                    handleAxiosError(e)
                })
        )

        if (editOptimisticDream) {
            await editOptimisticDream(update, {
                ...draftDream,
                ...formData,
            })
            setFormData({})
        }


    }, [draftDream, editOptimisticDream, formData, setFormData, updateDream])

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                saveDraft()
                onClose()
            }}
            title="Log A New Dream"
            subtitle="Had a new dream huh?"
            size="3xl"
        >
            <LogDreamForm
                draftDream={draftDream}
                onDelete={onClose}
                onCreate={onClose}
            />
        </Modal>
    )
}

export default LogDreamModal