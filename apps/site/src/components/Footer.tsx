import Link from 'next/link'
import { FaGithub, FaTwitter, FaSlack } from 'react-icons/fa'
import Image from 'next/image'

const SocialLinks = () => (
  <>
    <Link className="text-gray-600 hover:text-gray-800" href="https://github.com/sanity-io" aria-label="Github" target="_blank">
      <FaGithub size={22} />
    </Link>
    <Link className="text-gray-600 hover:text-gray-800" href="https://twitter.com/sanity_io" aria-label="Twitter" target="_blank">
      <FaTwitter size={22} />
    </Link>
    <Link className="text-gray-600 hover:text-gray-800" href="https://slack.sanity.io" aria-label="Slack" target="_blank">
      <FaSlack size={22} />
    </Link>
  </>
)

export const Footer = () => {
  return (
    <footer className="bg-white py-10 px-4 md:px-16 lg:px-32 bg-white dark:bg-slate-950 border-t-2 border-gray-200 dark:border-slate-800 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="grid grid-cols-1 md:flex md:justify-between md:space-x-10">
            <div>
              <h5 className="text-lg font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-800">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-800">Privacy Policy</Link></li>
                <li><Link href={`mailto:sales@sanity.io`} className="text-sm text-gray-600 hover:text-gray-800">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-4 items-end hidden md:block">
            <div className="text-gray-600">
              <Link href="/">
                <Image src="/square-logo.png" alt="Sanity Logo" width={48} height={48} />
              </Link>
            </div>
            <div className="flex space-x-4">
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} The Sanity Times. All rights reserved.</p>
          <p className="text-sm text-gray-600">Powered by <a href='https://sanity.io' className="underline">Sanity</a></p>
          <div className="flex space-x-4 justify-center my-6 block md:hidden">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  )
}
