import { useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  material: string
  occasion: string
  price?: number
  badge?: string
  position: string
}

const products: Product[] = [
  { id: 1, name: 'Serein Diamond Hoops', category: 'Earrings', material: 'Diamond', occasion: 'Party', price: 1280, badge: 'New arrival', position: '18% 22%' },
  { id: 2, name: 'Aurelia Signet Ring', category: 'Rings', material: 'Gold', occasion: 'Daily Wear', price: 740, badge: 'Bestseller', position: '72% 22%' },
  { id: 3, name: 'Solstice Tennis Bracelet', category: 'Bracelets', material: 'Diamond', occasion: 'Festive', price: 2450, position: '18% 78%' },
  { id: 4, name: 'Clair de Lune Pendant', category: 'Necklaces', material: 'Gold', occasion: 'Daily Wear', price: 980, position: '74% 75%' },
  { id: 5, name: 'Nura Polki Bangle', category: 'Bangles', material: 'Gold', occasion: 'Wedding', badge: 'Atelier piece', position: '48% 52%' },
  { id: 6, name: 'Élan Platinum Band', category: 'Rings', material: 'Platinum', occasion: 'Wedding', price: 1120, position: '42% 22%' },
]

const collections = [
  { name: 'Rings', copy: 'Sculpted forms for every chapter.', image: '/images/still-life.png', cls: 'collection-tall', position: '70% center' },
  { name: 'Bridal', copy: 'Heirlooms, considered anew.', image: '/images/hero.png', cls: 'collection-wide', position: 'center 35%' },
  { name: 'Necklaces', copy: 'Quiet statements in precious metal.', image: '/images/still-life.png', cls: 'collection-small', position: '15% center' },
  { name: 'Everyday', copy: 'Pieces to live beautifully in.', image: '/images/hero.png', cls: 'collection-small', position: 'center 18%' },
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    grid: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="5" cy="6" r=".8" fill="currentColor"/><circle cx="5" cy="12" r=".8" fill="currentColor"/><circle cx="5" cy="18" r=".8" fill="currentColor"/></>,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.2 7.7c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.3.4 0 .8.8 1.3 1.8 2.2 3.2 2.8.4.2.6.1.8-.1l.8-1c.2-.3.5-.3.7-.2l1.8.8c.3.1.5.2.5.4 0 .2-.2 1.4-.9 2-.7.6-1.6.8-2.5.5"/></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Header({ onCatalog }: { onCatalog: () => void }) {
  const [open, setOpen] = useState(false)
  return <>
    <div className="announcement">Complimentary insured delivery on all fine jewelry <span>Discover the atelier</span></div>
    <header>
      <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      <nav className={open ? 'nav-open' : ''}>
        <a href="#story">Our story</a><a href="#collections">Collections</a><button onClick={onCatalog}>All jewelry</button>
      </nav>
      <a className="logo" href="#" aria-label="Elara home">ELARA</a>
      <nav className="nav-right">
        <a href="#journal">Journal</a><a href="#contact">Contact</a>
        <button aria-label="Search"><Icon name="search" /></button>
        <button aria-label="Wishlist"><Icon name="heart" /></button>
      </nav>
    </header>
  </>
}

function ProductCard({ product, list, onView }: { product: Product; list: boolean; onView: (p: Product) => void }) {
  const [liked, setLiked] = useState(false)
  return <article className={`product-card ${list ? 'product-list' : ''}`}>
    <div className="product-image" style={{ backgroundPosition: product.position }}>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button className={`heart ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)} aria-label="Add to wishlist"><Icon name="heart" /></button>
      <button className="quick" onClick={() => onView(product)}>Quick view</button>
    </div>
    <div className="product-info">
      <p>{product.category} · {product.material}</p>
      <h3>{product.name}</h3>
      <strong>{product.price ? `$${product.price.toLocaleString()}` : 'Price on request'}</strong>
      <button className="text-link" onClick={() => onView(product)}>View details <Icon name="arrow" size={16}/></button>
    </div>
  </article>
}

function ProductModal({ product, close }: { product: Product; close: () => void }) {
  return <div className="modal-backdrop" onMouseDown={close}>
    <div className="modal" onMouseDown={e => e.stopPropagation()}>
      <button className="modal-close" onClick={close} aria-label="Close"><Icon name="close"/></button>
      <div className="modal-gallery">
        <div className="modal-main" style={{ backgroundPosition: product.position }} />
        <div className="modal-thumbs"><span/><span/><span/></div>
      </div>
      <div className="modal-copy">
        <p className="eyebrow">{product.category} · ME-{String(product.id).padStart(4, '0')}</p>
        <h2>{product.name}</h2>
        <div className="modal-price">{product.price ? `$${product.price.toLocaleString()}` : 'Price on request'}</div>
        <p className="description">A study in light and proportion, handcrafted by our atelier to become part of your everyday ritual.</p>
        <dl>
          <div><dt>Material</dt><dd>{product.material}, ethically sourced</dd></div>
          <div><dt>Craft</dt><dd>Hand-finished in our atelier</dd></div>
          <div><dt>Size</dt><dd>Made to order · 5–9</dd></div>
          <div><dt>Delivery</dt><dd>2–3 weeks</dd></div>
        </dl>
        <button className="primary full"><Icon name="whatsapp"/> Enquire on WhatsApp</button>
        <button className="secondary full">Request more details</button>
        <details><summary>Care & provenance <span>+</span></summary><p>Store separately in the provided soft pouch. Clean gently with a lint-free cloth.</p></details>
      </div>
    </div>
  </div>
}

export default function App() {
  const [category, setCategory] = useState('All')
  const [material, setMaterial] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Newest')
  const [list, setList] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    const result = products.filter(p =>
      (category === 'All' || p.category === category) &&
      (material === 'All' || p.material === material) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    if (sort.includes('Low')) return [...result].sort((a, b) => (a.price ?? 99999) - (b.price ?? 99999))
    if (sort.includes('High')) return [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    return result
  }, [category, material, search, sort])

  const clear = () => { setCategory('All'); setMaterial('All'); setSearch('') }
  const scrollCatalog = () => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })

  return <main>
    <Header onCatalog={scrollCatalog}/>

    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Modern heirlooms · Made by hand</p>
        <h1>Jewelry that tells <em>your story.</em></h1>
        <p className="hero-intro">Quietly expressive pieces, shaped by hand and made to hold the moments that matter.</p>
        <div className="hero-actions"><button className="primary" onClick={scrollCatalog}>Explore the collection</button><a className="text-link" href="#story">Discover our story <Icon name="arrow" size={17}/></a></div>
      </div>
      <div className="hero-visual">
        <div className="hero-frame"><img src="/images/hero.png" alt="Woman wearing a handcrafted gold necklace"/></div>
        <div className="hero-detail"><img src="/images/still-life.png" alt="Fine jewelry arranged on stone and silk"/><span>01 / The signature edit</span></div>
        <p className="vertical-note">EST. MMXXIV · ATELIER COLLECTION</p>
      </div>
    </section>

    <section className="intro-strip">
      <p>Born from a respect for material and meaning, each piece is made slowly—designed to be worn often, loved deeply, and passed on.</p>
      <span>Responsibly sourced</span><span>Made by master artisans</span>
    </section>

    <section className="collections" id="collections">
      <div className="section-heading"><div><p className="eyebrow">Curated worlds</p><h2>Find your signature</h2></div><p>Explore pieces created for every expression—from the beautifully everyday to the once-in-a-lifetime.</p></div>
      <div className="collection-grid">
        {collections.map(c => <a href="#catalog" className={`collection-card ${c.cls}`} key={c.name}>
          <img src={c.image} style={{ objectPosition: c.position }} alt={`${c.name} jewelry collection`}/>
          <div><span>{c.name}</span><p>{c.copy}</p><b>Explore <Icon name="arrow" size={15}/></b></div>
        </a>)}
      </div>
    </section>

    <section className="catalog" id="catalog">
      <div className="catalog-title"><p className="eyebrow">The jewelry edit</p><h2>Objects of lasting beauty</h2><p>Designed in small editions. Made to remain relevant beyond seasons.</p></div>
      <div className="catalog-tools">
        <button className="filter-trigger" onClick={() => setFiltersOpen(!filtersOpen)}>Filters <span>{category !== 'All' || material !== 'All' ? '2' : '+'}</span></button>
        <label className="search-box"><Icon name="search" size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pieces"/></label>
        <div className="tool-right">
          <label>Sort <select value={sort} onChange={e => setSort(e.target.value)}><option>Newest</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Popularity</option></select></label>
          <button className={!list ? 'active' : ''} onClick={() => setList(false)} aria-label="Grid view"><Icon name="grid"/></button>
          <button className={list ? 'active' : ''} onClick={() => setList(true)} aria-label="List view"><Icon name="list"/></button>
        </div>
      </div>
      <div className="catalog-body">
        <aside className={filtersOpen ? 'filters-open' : ''}>
          <div className="filter-head"><b>Refine by</b><button onClick={clear}>Clear all</button></div>
          <Filter title="Category" value={category} set={setCategory} options={['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Bangles']}/>
          <Filter title="Material" value={material} set={setMaterial} options={['All', 'Gold', 'Diamond', 'Platinum', 'Silver']}/>
          <div className="filter-group"><b>Price range</b><input type="range" aria-label="Maximum price" min="500" max="5000" defaultValue="3500"/><div className="range-label"><span>$500</span><span>$5,000+</span></div></div>
          <div className="filter-group"><b>Occasion</b>{['Daily Wear', 'Wedding', 'Festive', 'Party'].map(x => <label className="check" key={x}><input type="checkbox"/><span/>{x}</label>)}</div>
        </aside>
        <div className="products-wrap">
          <div className="results-count"><span>{filtered.length} pieces</span>{(category !== 'All' || material !== 'All') && <button onClick={clear}>{category !== 'All' ? category : material} ×</button>}</div>
          <div className={`product-grid ${list ? 'list-view' : ''}`}>
            {filtered.map(p => <ProductCard key={p.id} product={p} list={list} onView={setSelected}/>)}
          </div>
          {filtered.length === 0 && <div className="empty"><h3>No pieces found</h3><p>Try adjusting your search or filters.</p><button className="secondary" onClick={clear}>Clear filters</button></div>}
        </div>
      </div>
    </section>

    <section className="story" id="story">
      <div className="story-image"><img src="/images/craft.png" alt="Jeweler setting a stone by hand"/><span>Made slowly. Made to last.</span></div>
      <div className="story-copy"><p className="eyebrow">Inside the atelier</p><h2>The hand is present in every piece.</h2><p>Our work begins at the bench, where precise technique meets an instinct for proportion. We partner with a small circle of master artisans and source every material with care.</p><blockquote>“We believe true luxury is something you can feel—in the weight, the finish, and the story behind it.”</blockquote><a className="text-link" href="#">Discover our story <Icon name="arrow" size={17}/></a></div>
    </section>

    <section className="principles">
      <p className="eyebrow">Our promise</p>
      <div className="principle-grid">
        {[
          ['01', 'Assured authenticity', 'Every stone is carefully selected, documented, and traceable.'],
          ['02', 'Expert craftsmanship', 'Finished by hand in small editions by specialist makers.'],
          ['03', 'Personal guidance', 'Thoughtful, one-to-one assistance from selection to sizing.'],
          ['04', 'Made for you', 'Personalize select pieces with stones, sizing, and engraving.'],
        ].map(x => <div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}
      </div>
    </section>

    <section className="testimonial">
      <p className="eyebrow">Notes from our clients</p>
      <div className="quote-mark">“</div>
      <blockquote>The ring feels deeply personal—modern, but with the presence of something I could have inherited. The guidance throughout was exceptional.</blockquote>
      <p className="client">Mira S. <span>· Aurelia Signet Ring</span></p>
      <div className="slider-nav"><button aria-label="Previous">←</button><span><i/> 01 / 03</span><button aria-label="Next">→</button></div>
    </section>

    <section className="social" id="journal">
      <div className="social-head"><div><p className="eyebrow">From the journal</p><h2>@elara</h2></div><a className="text-link" href="#">Follow on Instagram <Icon name="arrow" size={17}/></a></div>
      <div className="social-grid">
        {['still-life.png','hero.png','craft.png','still-life.png'].map((x, i) => <a href="#" key={i}><img src={`/images/${x}`} alt="Elara journal"/><span>View post ↗</span></a>)}
      </div>
    </section>

    <footer id="contact">
      <div className="footer-top">
        <div className="footer-brand"><a className="logo" href="#">ELARA</a><p>Modern heirlooms, made by hand and chosen with intention.</p><div className="social-links"><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">YouTube</a></div></div>
        <div><h3>Explore</h3><a href="#">Home</a><a href="#collections">Collections</a><a href="#catalog">All jewelry</a><a href="#story">Our story</a><a href="#contact">Contact</a></div>
        <div><h3>Client care</h3><a href="#">WhatsApp</a><a href="#">+00 000 000 0000</a><a href="#">hello@elara.com</a><p>Mon–Sat, 10am–6pm<br/>[Studio address placeholder]</p></div>
        <div className="newsletter"><h3>The private list</h3><p>New editions, atelier stories, and private appointments.</p><form onSubmit={e => e.preventDefault()}><input type="email" placeholder="Email address" aria-label="Email address"/><button aria-label="Subscribe"><Icon name="arrow"/></button></form></div>
      </div>
      <div className="footer-bottom"><span>© 2025 Elara</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Shipping & returns</a></div><a href="https://yourportfolio.com" target="_blank" rel="noreferrer">Designed & Developed by [YOUR WEB DESIGN BRAND]</a></div>
    </footer>
    <a className="whatsapp-float" href="#contact" aria-label="Enquire on WhatsApp"><Icon name="whatsapp"/><span>Inquire</span></a>
    {selected && <ProductModal product={selected} close={() => setSelected(null)}/>}
  </main>
}

function Filter({ title, options, value, set }: { title: string; options: string[]; value: string; set: (x: string) => void }) {
  return <div className="filter-group"><b>{title}</b>{options.map(x => <label className="check" key={x}><input type="radio" name={title} checked={value === x} onChange={() => set(x)}/><span/>{x}</label>)}</div>
}
