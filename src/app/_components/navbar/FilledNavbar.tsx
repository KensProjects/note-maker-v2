import NavbarComp from "./NavbarComp"
import Link from "next/link"
import User from "../auth/User"
import { useSession } from "next-auth/react"

export default function FilledNavbar() {

    const { data: session } = useSession()

    return <>
        <NavbarComp>
            <Link href="/" className="text-2xl hidden sm:flex">Note Maker</Link>
            <div className="flex justify-center gap-4 items-center h-2/4 w-fit">
                {!session ? (
                    <>
                        <Link href="/api/auth/signin" className="bg-slate-400 hover:bg-slate-300 duration-25 ease-in-out h-full w-24 flex justify-center items-center rounded-md">Login</Link>
                    </>
                ) :
                    <>
                        <User />
                        <Link href="/" className="h-full flex justify-center items-center bg-yellow-300 hover:bg-yellow-200 rounded-md w-24 text-black border border-black">
                            Home
                        </Link>

                        <Link className="h-full flex justify-center items-center bg-orange-800 hover:bg-orange-700 rounded-md w-24 text-white" href={"/notes"}>Notes</Link>
                        <Link href="/api/auth/signout" className="h-full flex justify-center items-center bg-slate-800 hover:bg-slate-700 rounded-md w-24 text-white">Sign Out</Link>
                    </>
                }
            </div>
        </NavbarComp>
    </>
}