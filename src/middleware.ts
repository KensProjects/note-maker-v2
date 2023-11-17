import { getToken } from "next-auth/jwt";
import  { type NextRequest, NextResponse } from "next/server";
import { baseUrl } from "./utils/baseUrl";

export async function middleware(req: NextRequest) {

    function setPath(path:string) {
        return req.nextUrl.pathname.startsWith(path)
    }

    const activeSession = await getToken({ req: req, secret: process.env.SECRET })

    const goingToNotes = setPath("/notes") 
    const goingToIndivNote = setPath("/notes/:noteId") 
    const goingToNotePages = (goingToIndivNote || goingToNotes)

    const goingToLogin = setPath(`/api/auth/signin`)

    if (activeSession && goingToLogin) {
        return NextResponse.redirect(`${baseUrl}/`)
    }

    if (!activeSession && ( goingToNotePages)) {
        return NextResponse.redirect(`${baseUrl}/api/auth/signin`)
    }
    
    return NextResponse.next()
}