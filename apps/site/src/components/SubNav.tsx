import {getReadingStats} from '@/libs/contentGate'
import {UserNav} from './User/UserNav'
import {cn} from '@/libs/utils'
import {isSubscribed} from '@/libs/auth'
import {TopTagsPayload} from '@/sanity/types'
import {loadTopTags} from '@/sanity/loader/loadQuery'

export const SubNav = async () => {
  const user = await isSubscribed()
  let categories: TopTagsPayload = (await loadTopTags()).data ?? []

  if (user) {
    /**
     * If we have a user account, show user specific categories in the navigation,
     */
    const readingStats = await getReadingStats()
    Object.entries(readingStats)
      .sort(([, a], [, b]) => b - a)
      .map(([tag]) => categories.unshift({_id: tag, name: tag, referenceCount: 0}))
  }

  return (
    <div className="mt-4 px-4 md:px-16 lg:px-32">
      <div className="flex gap-4 justify-between items-center py-2 border-y text-sm font-light tracking-wider">
        <div />

        <ul className="flex gap-4 justify-center items-center">
          {categories.slice(0, 5).map(({name}, idx) => (
            <li key={name} className={cn('text-center leading-none', idx > 5 && 'sr-only')}>
              {name}
            </li>
          ))}
        </ul>

        <UserNav />
      </div>
    </div>
  )
}
