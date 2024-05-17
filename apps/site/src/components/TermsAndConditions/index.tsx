import { TermsAndConditionsPayload } from '@/sanity/types'
import {CustomPortableText} from '@/sanity/PortableText'

export const TermsAndConditions = ({data}: {data: TermsAndConditionsPayload}) => {
  const {content, effectiveDate} = data
  return (
    <div className='max-w-4xl mx-auto px-6 md:px-0 my-10'>
      <div className='flex flex-col gap-4 mb-4 border-b pb-4'>
        <div className='text-4xl font-bold'>Terms and Conditions</div>
        <div className='text-md'>Effective {effectiveDate}</div>
      </div>
      <main className='prose'>
        <CustomPortableText value={content ?? []} />
      </main>
    </div>
  )
}
