import type { ChangeEvent, FormEvent } from "react"

export default function NoteTextEditor({ onSubmit, onChange, label, body, isLoading, type }: { onSubmit: (e: FormEvent<Element>) => void, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, label: string, body: string, isLoading: boolean, type: "Edit" | "Create" }) {
    return (
        <div className="flex flex-col justify-start items-center border-black bg-slate-300 w-full lg:w-3/4 h-full">

            <form onSubmit={onSubmit} className="flex flex-col w-full h-fit justify-center items-center shadow-xl p-2 gap-8">

                <div className="flex flex-col justify-center items-center gap-2 w-7/12">
                    <label htmlFor="note-label">Label</label>
                    <input type="text" name="label" id="note-label" value={label} onChange={onChange} required placeholder="Add label..." minLength={1} className="w-full bg-slate-100 outline-none ring-1 rounded-md p-1" autoComplete="no" maxLength={255}/>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <label htmlFor="note-body">Body</label>
                    <textarea name="body" id="note-body" value={body} onChange={onChange} required placeholder="Add note body..." rows={10} cols={50} minLength={1} className="bg-slate-100 outline-none ring-1 rounded-md p-1" autoComplete="no" maxLength={255}/>
                </div>


                <button type="submit" className="w-60 h-10 bg-blue-500 hover:bg-blue-400 duration-75 ease-in-out rounded-md flex justify-center items-center text-white" disabled={isLoading}>{type === "Create" && "Create Note"}{type == "Edit" && "Edit Note"}</button>
            </form>
        </div>
    )
}
