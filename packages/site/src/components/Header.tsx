import Link from 'next/link'
import {Logo} from './Logo'

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center px-4 md:px-16 lg:px-32 pt-6 pb-5">
      <Link href="/" className="inline-block">
        <Logo className="block h-24 max-w-[90vw] w-auto" />
      </Link>
    </header>
  )
}
