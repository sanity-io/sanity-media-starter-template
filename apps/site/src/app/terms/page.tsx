import {Header} from '@/components/Header'
import { SubNav } from '@/components/SubNav'
import { Metadata } from 'next'
import { TermsAndConditions } from '@/components/TermsAndConditions'
import { loadTermsAndConditions } from '@/sanity/loader/loadQuery'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms & Conditions",
    alternates: {
      canonical: `/terms`,
    },
  }
}

export default async function TermsPageRoute() {
  const {data} = await loadTermsAndConditions()

  if (!data) {
    return null
  }
  
  return (
    <>
      <Header compact />
      <SubNav />
      <TermsAndConditions data={data} />
    </>
  );
};
