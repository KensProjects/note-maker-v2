"use client";

import { useAtom } from "jotai";
import { type ChangeEvent, type FormEvent } from "react";
import { noteAtom } from "~/app/atoms/noteAtoms";

import { api } from "~/trpc/react";
import { initialNote } from "~/utils/initialNote";
import NoteTextEditor from "../NoteTextEditor";
import toast from "react-hot-toast";

export default function CreateNote() {

    const utils = api.useUtils()

    const [note, setNote] = useAtom(noteAtom)

    const { mutate: createNote, isLoading } = api.note.createNote.useMutation({
        onSuccess: () => {
            utils.note.invalidate().catch(() => toast.error("Error!"))
        }
    })


    function handleNoteCreateSubmit(e: FormEvent) {
        e.preventDefault()
        createNote(note)
        setNote(initialNote)
    }

    function handleOnChangeNote(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    return (

        <NoteTextEditor onSubmit={handleNoteCreateSubmit} onChange={handleOnChangeNote} label={note.label} body={note.body} isLoading={isLoading} type={"Create"} />
    )
}
