import {PortableTextObject} from 'sanity'
import {PortableTextLink} from '../types'

export const isPortableTextLink = (mark: PortableTextObject): mark is PortableTextLink => {
  return Boolean(mark._type === 'link' && 'href' in mark)
}
