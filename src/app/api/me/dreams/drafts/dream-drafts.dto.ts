import {zfd} from "zod-form-data";

export const DeleteDraftDreamSchema = zfd.formData({
    id: zfd.text()
})