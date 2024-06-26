import {PortableText, PortableTextReactComponents} from '@portabletext/react'
import {PremiumContentBlock} from './PremiumContent'
import {customBlockComponents} from './customComponents'

const customComponents = (isMember: boolean): Partial<PortableTextReactComponents> => ({
  types: {
    ...customBlockComponents.types,
    premiumContent: (props) => <PremiumContentBlock isMember={isMember} {...props} />,
  },
})

type Props = React.ComponentProps<typeof PortableText> & {
  isMember?: boolean
}

export const CustomPortableText = ({isMember = false, ...props}: Props) => {
  return <PortableText {...props} components={customComponents(isMember)} />
}
