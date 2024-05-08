'use client'
import {clearUserSession} from '@/libs/auth'
import {clearStats} from '@/libs/contentGate'
import {useState} from 'react'

type Props = {
  readCount: number
  articleStats: Record<string, number>
}

export const UserAccount = ({readCount, articleStats}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsOpen((prev) => !prev)
          }}
        >
          Account
        </button>
      </div>

      <dialog open={isOpen} className="w-screen h-screen inset-0 z-10 fixed bg-transparent">
        <div className="fixed inset-0 bg-black/55" onClick={() => setIsOpen(false)} />
        <div className="fixed flex flex-col justify-between right-0 inset-y-0 w-80 p-8 bg-white z-20 shadow-md overflow-auto">
          <div>
            <div className="flex gap-4 justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                }}
                className="hover:underline"
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  clearUserSession()
                  setIsOpen(false)
                }}
                className="bg-black text-white px-2 py-1 "
              >
                Sign out
              </button>
            </div>

            <h2 className="mt-4 font-bold font-title text-xl">Reading Statistics</h2>
            <h3>
              Articles read:{' '}
              {process.env.NODE_ENV === 'development' ? Math.round(readCount / 2) : readCount}
            </h3>

            <hr className="my-2" />

            <h2 className="mt-4 font-bold font-title text-xl">Topics of interest</h2>
            <ul>
              {Object.entries(articleStats)
                .sort(([, a], [, b]) => b - a)
                .map(([tag, count]) => (
                  <li key={tag}>
                    {tag} ({process.env.NODE_ENV === 'development' ? Math.round(count / 2) : count})
                  </li>
                ))}
            </ul>
          </div>

          <div className="self-end mt-4">
            <button
              onClick={(e) => {
                e.preventDefault()
                clearStats()
              }}
              className="border hover:bg-brand hover:text-white text-black px-2 py-1 "
            >
              Clear reading stats
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
