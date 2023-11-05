"use client"

import {FC, MutableRefObject, useState} from "react";
import {Editor as DraftEditor, EditorState} from 'draft-js';

type EditorProps = {
    state: EditorState,
    onChange: (state: EditorState) => void;
}

const Editor: FC<EditorProps> = ({state, onChange}) => {

    return (
        <DraftEditor editorState={state} onChange={onChange}/>
    )
}

export default Editor