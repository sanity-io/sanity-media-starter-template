import {ClassNameValue, twMerge} from 'tailwind-merge'

/**
 * A utility function to merge Tailwind CSS classes.
 * Re-exported from `tailwind-merge` to support any future
 * configuration customizations.
 */
export const cn = (...inputs: ClassNameValue[]) => {
  return twMerge(inputs)
}
