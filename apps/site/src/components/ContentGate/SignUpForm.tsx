'use client'

import {setUserSession} from '@/libs/auth'
import {useRouter} from 'next/navigation'

export const SignUpForm = () => {
  const router = useRouter()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await setUserSession()
    router.refresh()
  }

  return (
    <form className="flex mx-auto" onSubmit={handleFormSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        className="px-2 py-1 outline-none text-black"
        required
      />
      <button
        type="submit"
        className="py-2 px-4 border border-white hover:text-brand hover:bg-white transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
