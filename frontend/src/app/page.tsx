import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/authOptions"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="w-full max-w-lg">
        {session ? (
          <h1 className="text-5xl">Logged in!</h1>
        ) : (
          <h1 className="text-5xl">You Shall Not Pass!</h1>
        )}
      </div>
    </ div >
  )
}
