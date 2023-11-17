import type { ChangeEvent, FormEvent } from "react"

export default function NoteSearcher({ onSubmit, searchType, searchTerm, selectOnChange, textOnChange }: { onSubmit: (e: FormEvent<Element>) => void, searchType: "label" | "body", searchTerm: string, selectOnChange:  (e: ChangeEvent<HTMLSelectElement>) => void, textOnChange:  (e: ChangeEvent<HTMLInputElement>) => void }) {

    const searchOptions = ["Label", "Body"]

    return (
        <form onSubmit={onSubmit} className='flex justify-between items-center w-full h-fit border border-black gap-0'>
            <select name="searchType" id="search-dropdown" className="flex justify-center items-center w-1/4 outline-none" value={searchType} onChange={selectOnChange}>
                {searchOptions.map((option) => {
                    return <option key={option} value={option.toLowerCase()}>{option}</option>
                })}
            </select>
            <input className="outline-none ring-1 w-full p-1 rounded-md" type="text" name="note-label" id="note-label" value={searchTerm} onChange={textOnChange} required />
            <button type="submit" className="flex justify-center items-center w-1/4">Filter</button>
        </form>
    )
}
