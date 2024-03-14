const categories = Array.from({length: 5}, (_, index) => `Category ${index}`)

export const Footer = () => {
  return (
    <nav className="px-4 md:px-16 lg:px-32 py-5">
      <div className="flex flex-wrap gap-6 md:justify-between text-xs tracking-wide">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="mb-2 font-light uppercase text-xs tracking-wider">{category}</h3>
            <ul className="flex flex-col gap-2 font-light text-sm">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
              <li>Link 5</li>
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
