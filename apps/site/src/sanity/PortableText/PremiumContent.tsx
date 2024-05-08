import {SignUpForm} from '@/components/ContentGate/SignUpForm'
import {PortableText} from '@portabletext/react'
import {customBlockComponents} from './customComponents'

type Props = React.ComponentProps<typeof PortableText> & {
  isMember: boolean
  value: {
    title: string
    subHeadline: string
    content: any
  }
}

export const PremiumContentBlock = ({isMember, value}: Props) => {
  if (isMember) {
    return <PortableText value={value.content} components={customBlockComponents} />
  }

  const {title, subHeadline} = value

  return (
    <div className="px-5 pt-5 pb-6 bg-brand text-white text-center flex justify-center flex-col gap-2">
      <h2 className="text-white m-0 text-3xl font-title leading-none mb-2">
        {title ?? 'Sign up to access exclusive content'}
      </h2>

      <p className="text-white text-lg leading-tight px-2">
        {subHeadline ??
          'Sign up for unlimited access to all articles, premium content, and other exclusive perks.'}
      </p>

      <SignUpForm />
    </div>
  )
}
