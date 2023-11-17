"use client"

import { useSession } from "next-auth/react"
import CreatedNoteList from "~/app/_components/notes/CreatedNoteList"
import EditNote from "~/app/_components/notes/NoteFunctions/edit-note"
import { api } from "~/trpc/react"

export default function FetchedNote({ params }: { params: { noteId: string } }) {

  const { data: session } = useSession()

  const {  isLoading } = api.note.findNote.useQuery({ noteId: params.noteId })

  if (!session) return <div>Oops</div>
  if (isLoading) return <div>Loading...</div>

  return (<>
    <div className="flex">
      <CreatedNoteList />
      <EditNote params={{
        noteId: params.noteId
      }} />
    </div>
  </>)
}
