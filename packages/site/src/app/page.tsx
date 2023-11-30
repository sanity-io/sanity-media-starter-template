import Link from 'next/link'

const ArticlePlaceholder = ({className}: {className?: string}) => (
  <section className={className}>
    <Link href="/article-slug" className="flex flex-col gap-2">
      <div className="w-full aspect-video bg-current opacity-30" />
      <h2 className="font-sans text-2xl tracking-wide">Title placeholder</h2>
      <p className="font-serif font-normal">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo ipsa architecto iste
        atque quod. Nisi doloribus tenetur temporibus corporis rem, nobis corrupti delectus optio
        repellendus esse accusamus ipsum, repudiandae sint!
      </p>
    </Link>
  </section>
)

export default function Home() {
  return (
    <>
      <div className="mt-4 px-4 md:px-16 lg:px-32">
        <ul className="flex gap-4 justify-center py-2 border-y text-sm font-light tracking-wider">
          <li>Category</li>
          <li>Category</li>
          <li>Category</li>
          <li>Category</li>
        </ul>
      </div>
      <main className="px-4 md:px-16 lg:px-32 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <ArticlePlaceholder className="md:col-span-2" />
        <ArticlePlaceholder />
        <ArticlePlaceholder />
        <ArticlePlaceholder />
        <ArticlePlaceholder className="md:col-span-2" />
        <ArticlePlaceholder />
        <ArticlePlaceholder />
        <ArticlePlaceholder />
      </main>
    </>
  )
}
