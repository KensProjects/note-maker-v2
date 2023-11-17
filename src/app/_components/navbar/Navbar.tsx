"use client"

import {useSession} from "next-auth/react"
import NavbarComp from "./NavbarComp"
import FilledNavbar from "./FilledNavbar"

export default function Navbar() {

    const { status } = useSession()

    switch (status) {
        case "loading": return <NavbarComp />
        case "authenticated": return <FilledNavbar />
        case "unauthenticated": return <FilledNavbar />

    }
}

