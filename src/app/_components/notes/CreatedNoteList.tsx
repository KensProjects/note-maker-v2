import Link from "next/link"
import { api } from "~/trpc/react"
import toast from "react-hot-toast";

export interface NoteArr {
  id: string; label: string; body: string; createdAt: string; updatedAt: string; createdById: string
}

export default function CreatedNoteList() {

  const utils = api.useUtils()

  const { data: initialNoteFetch, isLoading } = api.note.getNotes.useQuery()

  const { mutate: deleteNote } = api.note.deleteNote.useMutation({
    onSuccess: () => {
      utils.note.invalidate().catch(() => toast.error("Error"))
    }
  })

  if (isLoading) return (<div className="w-1/4 h-auto overflow-scroll border-r border-black text-black text flex flex-col justify-start items-center">Loading</div>
  )

  return (
    <>
      {initialNoteFetch && <ul className="hidden md:flex w-1/4 h-auto overflow-auto border-r border-black text-black flex-col justify-start items-center">

        {initialNoteFetch.map((note: NoteArr) => {
          return (
            <div key={note.id} className="border-b border-black h-14 w-full hover:bg-slate-200 bg-slate-100 duration-75 ease-in-out flex justify-center items-center p-1" >
              <div className="flex justify-around items-center h-full w-full">
                <span className="truncate">{note.label}</span>
                <div className="flex flex-row-reverse text-white w-full h-full gap-1">

                  <Link href={"/notes"} className="bg-red-400 hover:bg-red-300 w-12 h-auto flex justify-center items-center" onClick={() => {
                    deleteNote({ id: note.id })
                  }}>
                    <img src="/trash.svg" alt="Delete" />

                  </Link>

                  <Link className="bg-purple-400 hover:bg-purple-300 ease-in-out duration-75 w-12 h-auto flex justify-center items-center" href={`http://localhost:3000/notes/${note.id}`} replace={true}>

                    <img src="/pencil.svg" alt="Edit" />

                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </ul> }
    </>

  )
}
