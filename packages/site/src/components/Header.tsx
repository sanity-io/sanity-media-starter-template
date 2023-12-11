import Link from 'next/link'
import {Logo} from './Logo'

type Props = {
  compact?: boolean
}

export const Header = ({compact}: Props) => {
  const variantLogoStyles = compact ? 'h-12' : 'h-24'

  return (
    <header className="flex flex-col items-center justify-center px-4 md:px-16 lg:px-32 pt-6 pb-5">
      <Link href="/" className="inline-block">
        <Logo className={`block max-w-[90vw] w-auto ${variantLogoStyles}`} />
      </Link>
    </header>
  )
}
