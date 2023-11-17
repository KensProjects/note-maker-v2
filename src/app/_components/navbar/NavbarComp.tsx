"use client"

import type { ReactNode } from "react"

export default function NavbarComp({ children }: { children?: ReactNode }) {
    return <nav className='h-20 w-full flex justify-center sm:justify-between items-center px-4 border-b border-black  bg-slate-200/75 z-50'>{children}</nav>
}

