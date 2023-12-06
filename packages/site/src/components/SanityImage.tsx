import {urlForImage} from '@/sanity/lib/imageBuilder'
import Image from 'next/image'

interface ImageBoxProps {
  image?: {asset?: any}
  alt?: string
  width?: number
  height?: number
  size?: string
  className?: string
  'data-sanity'?: string
}

export const SanityImage = ({
  image,
  alt = '',
  width = 3500,
  height = 2000,
  size = '(max-width: 768px) 100vw, 50vw',
  className,
  ...props
}: ImageBoxProps) => {
  const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url()

  return (
    <figure className={className} data-sanity={props['data-sanity']}>
      {imageUrl && <Image alt={alt} width={width} height={height} sizes={size} src={imageUrl} />}
    </figure>
  )
}
