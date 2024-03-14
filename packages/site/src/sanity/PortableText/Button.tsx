import {SanityReference} from '@sanity/image-url/lib/types/types'
import {urlForAsset} from '../lib/assetBuilder'

type FileButtonProps = {
  _type: 'buttonFile'
  file: {
    asset: SanityReference
    _type: 'file'
  }
}

type LinkButtonProps = {
  _type: 'buttonLink'
  url: string
}

type Props = {
  title: string
} & (FileButtonProps | LinkButtonProps)

export const Button = ({title, ...props}: Props) => {
  return (
    <div className="text-center not-prose">
      <a
        href={props._type === 'buttonLink' ? props.url : urlForAsset(props.file.asset)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg py-2 px-4 text-white bg-brand border border-brand hover:text-brand hover:bg-white transition-colors hover:border-brand outline-none no-underline"
      >
        {title}
      </a>
    </div>
  )
}
