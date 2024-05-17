'use client'
import {setUserSession} from '@/libs/auth'
import {useRouter} from 'next/navigation'

export const UserSignIn = () => {
  const router = useRouter()

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await setUserSession()
    router.refresh()
  }

  return (
    <div>
      <button onClick={handleFormSubmit} className="font-bold underline hover:no-underline">
        Login
      </button>
    </div>
  )
}
