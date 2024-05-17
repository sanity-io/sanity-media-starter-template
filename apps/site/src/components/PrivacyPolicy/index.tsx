import { PrivacyPolicyPayload } from '@/sanity/types'
import {CustomPortableText} from '@/sanity/PortableText'

export const PrivacyPolicy = ({data}: {data: PrivacyPolicyPayload}) => {
  const {content, effectiveDate} = data
  return (
    <div className='max-w-4xl mx-auto px-6 md:px-0 my-10'>
      <div className='flex flex-col gap-4 mb-4 border-b pb-4'>
        <div className='text-4xl font-bold'>Privacy Policy</div>
        <div className='text-md'>Effective {effectiveDate}</div>
      </div>
      <CustomPortableText isMember={false} value={content ?? []} />
    </div>
  )
}
