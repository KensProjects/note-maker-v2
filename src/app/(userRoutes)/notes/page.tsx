import NoteSearchList from '~/app/_components/notes/NoteSearchList'
import { getServerAuthSession } from '~/server/auth'

export default async function Notes() {
    const session = await getServerAuthSession()

    if (!session) return null

    return (
        <main className='w-full h-full flex justify-center items-center flex-col mt-4'>
            <NoteSearchList />
        </main>

    )
}
