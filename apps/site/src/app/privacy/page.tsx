import {Header} from '@/components/Header'
import { SubNav } from '@/components/SubNav'
import { Metadata } from 'next'
import { PrivacyPolicy } from '@/components/PrivacyPolicy'
import { loadPrivacyPolicy } from '@/sanity/loader/loadQuery'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy",
    alternates: {
      canonical: `/privacy`,
    },
  }
}

export default async function PrivacyPageRoute() {
  const {data} = await loadPrivacyPolicy()

  if (!data) {
    return null
  }

  return (
    <>
      <Header compact />
      <SubNav />
      <PrivacyPolicy data={data} />
    </>
  );
};
