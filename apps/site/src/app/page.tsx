import {Header} from '@/components/Header'
import {HomePage} from '@/components/Home/HomePage'
import HomePagePreview from '@/components/Home/HomePagePreview'
import {SubNav} from '@/components/SubNav'
import {loadHomePage} from '@/sanity/loader/loadQuery'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

export default async function Home() {
  const initial = await loadHomePage()

  if (!initial.data) {
    notFound()
  }

  return (
    <>
      <Header />

      <SubNav />

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
