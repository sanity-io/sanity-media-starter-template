import {PortableTextReactComponents} from '@portabletext/react'
import {Button} from './Button'
import {SanityImage} from '@/components/SanityImage'

export const customBlockComponents: Partial<PortableTextReactComponents> = {
  types: {
    buttonFile: (props) => <Button {...props.value} />,
    image: (props) => <SanityImage image={props.value} {...props.value} />,
  },
}
