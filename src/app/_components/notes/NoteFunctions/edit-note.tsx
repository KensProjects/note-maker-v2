"use client"

import { useAtom } from 'jotai'
import React, { type ChangeEvent, type FormEvent, useEffect } from 'react'
import { noteAtom } from '../../../atoms/noteAtoms'
import { api } from '~/trpc/react'
import NoteTextEditor from '../NoteTextEditor'
import toast from 'react-hot-toast';

export default function NoteEditor({ params }: { params: { noteId: string } }) {

    const [noteToEdit, setNoteToEdit] = useAtom(noteAtom)

    const utils = api.useUtils()

    const { data:fetchedNote, isLoading:noteLoading } = api.note.findNote.useQuery({ noteId: params.noteId })

    const { mutate: editNote, isLoading:editedNoteLoading} = api.note.editNote.useMutation({
        onSuccess: () => {
            utils.note.invalidate().catch(() =>toast.error("Error!"))
        }
    })

    function handleNoteEditChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setNoteToEdit({
            ...noteToEdit,
            [e.target.name]: e.target.value
        })
    }

    function handleNoteEditSubmit(e: FormEvent) {
        e.preventDefault()
        editNote({ id: params.noteId, ...noteToEdit })

    }


    useEffect(() => {
        setNoteToEdit({label:fetchedNote!.label, body:fetchedNote!.body})
    },[fetchedNote, setNoteToEdit])

    if (noteLoading) return "Loading"

    return (
        <>
            <NoteTextEditor onSubmit={handleNoteEditSubmit} onChange={handleNoteEditChange} label={noteToEdit.label} body={noteToEdit.body} isLoading={editedNoteLoading} type={'Edit'} />
        </>


    )
}
