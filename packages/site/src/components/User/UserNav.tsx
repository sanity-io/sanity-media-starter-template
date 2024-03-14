import { isSubscribed } from '@/libs/auth'
import { getArticleReadCount, getReadingStats } from '@/libs/contentGate'
import { UserSignIn } from './Nav/SignIn'
import { UserAccount } from './Nav/UserAccount'

export const UserNav = async () => {
  const user = await isSubscribed()
  const readCount = await getArticleReadCount()
  const readingStats = await getReadingStats()

  if (user) {
    return <UserAccount articleStats={readingStats} readCount={readCount} />
  }

  return <UserSignIn />
}
