'use client'

import { type FormEvent, useState, type ChangeEvent } from "react"
import NoteSearcher from "./NoteSearcher"
import { api } from "~/trpc/react"
import SearchNotesArray from "./SearchedNoteArray"

export default function NoteSearchList() {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchType, setSearchType] = useState<"label" | "body">("label")


    const { data: initialNotes, isLoading } = api.note.getNotes.useQuery()

    const { data: filteredNoteFetch, refetch: getFiltleredNotes } = api.note.getFilteredNotes.useQuery({
        searchTerm: searchTerm, searchType: searchType
    }, { enabled: false })

    function handleChangeSearchType(e: ChangeEvent<HTMLSelectElement>) {
        setSearchType(e.target.value as "label" | "body")
    }

    function handleChangeSearchTerm(e: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value)
    }

    function handleFilteredSearchSubmit(e: FormEvent) {
        e.preventDefault()
        getFiltleredNotes().catch(err => console.error(err))
    }


    if (isLoading || !initialNotes) return null

    return (
        <>
            <NoteSearcher onSubmit={handleFilteredSearchSubmit} searchType={searchType} searchTerm={searchTerm} selectOnChange={handleChangeSearchType} textOnChange={handleChangeSearchTerm} />

            {filteredNoteFetch ? <SearchNotesArray noteArray={filteredNoteFetch} /> : <SearchNotesArray noteArray={initialNotes} />}

        </>
    )
}