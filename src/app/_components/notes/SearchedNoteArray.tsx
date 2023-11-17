import type { NoteArr } from "./CreatedNoteList"

export default function SearchNotesArray({ noteArray }: { noteArray: NoteArr[] }) {
    return <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-4 h-full w-3/4 md:w-full justify-center items-center">
        {noteArray.map((note: NoteArr) => {
            return <li key={note.id} className="border border-black p-1 flex flex-col w-auto h-48 overflow-auto text-center gap-1">
                <span className="w-full bg-yellow-300 p-1 border-b border-black">{note.label}</span>
                <span className="w-full ">{note.body}</span>
            </li>
        })}
    </ul>
}
