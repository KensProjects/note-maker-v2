import { atom } from "jotai";
export interface INote {
     label: string, body: string 
}

export const initialNote  = { label: "", body: "" }

export const noteAtom = atom(initialNote)