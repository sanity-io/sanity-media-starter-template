import {PortableTextReactComponents} from '@portabletext/react'
import {Button} from './Button'

export const customBlockComponents: Partial<PortableTextReactComponents> = {
  types: {
    buttonFile: (props) => <Button {...props.value} />,
  },
}
