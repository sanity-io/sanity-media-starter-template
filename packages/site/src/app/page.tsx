import { Header } from '@/components/Header'
import {HomePage} from '@/components/Home/HomePage'
import HomePagePreview from '@/components/Home/HomePagePreview'
import {loadHomePage} from '@/sanity/loader/loadQuery'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import {notFound} from 'next/navigation'

export default async function Home() {
  const initial = await loadHomePage()

  if (!initial.data) {
    notFound()
  }

  return (
    <>
      <Header />

      <div className="mt-4 px-4 md:px-16 lg:px-32">
        <ul className="flex gap-4 justify-center py-2 border-y text-sm font-light tracking-wider">
          <li>Category</li>
          <li>Category</li>
          <li>Category</li>
          <li>Category</li>
        </ul>
      </div>

      <main className="px-4 md:px-16 lg:px-32 py-5">
        {draftMode().isEnabled ? (
          <HomePagePreview
            params={{
              slug: '/',
            }}
            initial={initial}
          />
        ) : (
          <HomePage data={initial.data} />
        )}
      </main>
    </>
  )
}
