'use client'
import { useSession } from "next-auth/react";
import CreatedNoteList from "../notes/CreatedNoteList";
import CreateNote from "../notes/NoteFunctions/create-note";

export default function AppShell() {
    
    const {data:session} = useSession()

    if (!session) return null

    return (
        <div className="flex w-full h-full justify-start items-start">
            <CreatedNoteList />
            <CreateNote />
        </div>
    )
}
