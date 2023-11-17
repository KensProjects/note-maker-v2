import { useSession } from "next-auth/react"

export default  function User() {

   const {data:session} = useSession()

    const userImage = session?.user.image

    if (!session || !session.user || !session.user.name) return null

    return (
        <div className="flex justify-between items-center w-fit h-full border border-black rounded-full overflow-hidden text-sm">
            {userImage && <img src={userImage} alt={session.user.name} height={42} width={42} />}
            <span className="truncate px-6">{session.user.name}</span>
        </div>
    )
}
