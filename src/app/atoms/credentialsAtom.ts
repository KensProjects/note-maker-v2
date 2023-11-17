import { atom } from "jotai"

export const initialCredentials = { name: "", password: "",email:"" }

export const credentialsAtom = atom(initialCredentials)

export const toggleShellViewAtom = atom(false)