import { useMemo, useState } from 'react'
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Headphones,
  Minus,
  Music,
  Package,
  Play,
  Plus,
  Radio,
  Search,
  ShoppingCart,
  Star,
  Trash2,
  Tv,
  X,
} from 'lucide-react'
import assetSheet from './assets/retro-asset-sheet-v2.png'
import contentSheet from './assets/retro-content-sheet-v2.png'
import heroImage from './assets/memory-lane-hero-v2.png'
import arenaDunkImage from './assets/news/arena-dunk.png'
import movieMarqueeImage from './assets/news/movie-marquee.png'
import musicStudioImage from './assets/news/music-studio.png'
import sidewalkPlayerImage from './assets/news/sidewalk-player.png'
import mallFoodCourtImage from './assets/collections/mall-food-court-run.png'
import saturdayMorningImage from './assets/collections/saturday-morning-shelf.png'
import videoStoreImage from './assets/collections/video-store-night.png'
import './App.css'

const navItems = [
  { number: '01', label: 'Home', asset: 'crt' },
  { number: '02', label: 'Era', asset: 'news' },
  { number: '03', label: 'News', asset: 'news' },
  { number: '04', label: 'Games', asset: 'handheld' },
  { number: '05', label: 'Shop', asset: 'bag' },
  { number: '06', label: 'Photos', asset: 'photos' },
  { number: '07', label: 'Community', asset: 'community' },
]

const tabs = [
  { label: 'New & Trends', icon: Star },
  { label: 'Time Capsule', icon: Clock },
  { label: "What's Hot", icon: Radio },
  { label: 'My Shelf', icon: Package },
]

const memoryCards = [
  { label: 'Event', title: 'Saturday Cartoon First Episode', date: 'May 12, 1989', scene: 'cartoon-night' },
  { label: 'Trend', title: 'Acid Wash Jeans Hit Every Mall', date: 'Spring 1989', scene: 'denim-display' },
  { label: 'Toy', title: 'Pocket Game Arrives in Stores', date: 'May 1989', scene: 'handheld-pack' },
  { label: 'Music', title: 'Soft Rock Cassette Single Tops Radio', date: 'Friday Night', scene: 'cassette-single' },
]

const categories = ['All', 'Pop Culture', 'Music', 'Tech', 'TV & Movies', 'Lifestyle']

const newsItems = [
  { category: 'Pop Culture', title: 'Air Jump Sneakers Take Over the Playoffs', date: 'May 11, 1989', likes: 128, comments: 97, image: arenaDunkImage },
  { category: 'Music', title: 'Cable Music Channel Unplugs a New Era', date: 'May 9, 1990', likes: 86, comments: 41, image: musicStudioImage },
  { category: 'Tech', title: 'Portable Player Becomes the Walk Home Soundtrack', date: 'April 24, 1988', likes: 74, comments: 35, image: sidewalkPlayerImage },
  { category: 'TV & Movies', title: 'Time-Travel Sequel Packs Weekend Theaters', date: 'July 3, 1990', likes: 69, comments: 28, image: movieMarqueeImage },
]

const years = [1985, 1987, 1989, 1991, 1993]

const eras = [
  { year: 1985, title: 'Arcade After School', copy: 'Coin slots, neon carpet, and a pocket full of quarters.', scene: 'arcade-fighter' },
  { year: 1989, title: 'Mall Weekend', copy: 'Food court runs, photo booths, high-tops, and a new tape in the bag.', scene: 'strip-mall' },
  { year: 1991, title: 'Video Rental Night', copy: 'One new release, one backup pick, and snacks for the whole couch.', scene: 'movie-marquee' },
  { year: 1993, title: 'Bedroom Radio Era', copy: 'Late-night dedications, stickered boom boxes, and mixtapes by request.', scene: 'album-shelf' },
]

const products = [
  { id: 1, name: 'Pocket Game', detail: 'DMG-style handheld', price: 49.99, tag: 'Just added', art: 'handheld' },
  { id: 2, name: 'Tape Player', detail: 'Belt clip stereo', price: 59.99, tag: 'Mall pick', art: 'player' },
  { id: 3, name: 'Button Pin Set', detail: 'Denim-jacket flair', price: 24.99, tag: 'New drop', art: 'pins' },
  { id: 4, name: 'Cereal Box', detail: 'Saturday shelf art', price: 18.99, tag: 'Collector', art: 'cereal' },
  { id: 5, name: 'VHS Tape', detail: 'Classic movie case', price: 14.99, tag: 'Staff fav', art: 'vhs' },
]

const trends = [
  'Mutant cartoon heroes',
  'New kid pop groups',
  'Console war previews',
  'High-top flight sneakers',
  'Acid wash denim',
  'Transforming robot toys',
]

const quizOptions = [
  { id: 'mall', label: 'Mall crawl', result: 'Mall Regular', detail: 'You know every store, snack counter, and photo booth shortcut.' },
  { id: 'arcade', label: 'Arcade run', result: 'Quarter Keeper', detail: 'You save your best reflexes for blinking cabinets and crowded scoreboards.' },
  { id: 'radio', label: 'Radio night', result: 'Mixtape Maker', detail: 'You remember the songs by the exact second you hit record.' },
  { id: 'video', label: 'VHS weekend', result: 'Rental Counter Pro', detail: 'You never returned the tape without rewinding it first.' },
]

const collections = [
  { title: 'Video Store Night', tag: 'Weekend kit', copy: 'VHS case, tape player, and pins for the jacket.', productIds: [2, 3, 5], image: videoStoreImage },
  { title: 'Saturday Morning Shelf', tag: 'Cartoon pack', copy: 'Cereal-box art, handheld fun, and button-pin color.', productIds: [1, 3, 4], image: saturdayMorningImage },
  { title: 'Mall Food Court Run', tag: 'Staff pick', copy: 'A small bundle for neon halls, music stops, and arcade breaks.', productIds: [1, 2, 4], image: mallFoodCourtImage },
]

const memories = [
  { title: 'My first summer 87', icon: Camera },
  { title: 'Video rental weekend', icon: Tv },
  { title: 'Concert ticket stub', icon: Music },
  { title: 'School dance 89', icon: Radio },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeYear, setActiveYear] = useState(1989)
  const [activeEra, setActiveEra] = useState(1989)
  const [quizChoice, setQuizChoice] = useState('mall')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)

  const filteredNews = useMemo(() => {
    const byCategory = activeCategory === 'All' ? newsItems : newsItems.filter((item) => item.category === activeCategory)
    const term = query.trim().toLowerCase()
    if (!term) return byCategory
    return byCategory.filter((item) => item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term))
  }, [activeCategory, query])

  const selectedEra = eras.find((era) => era.year === activeEra) ?? eras[1]
  const quizResult = quizOptions.find((option) => option.id === quizChoice) ?? quizOptions[0]
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 6.99 : 0
  const total = subtotal + shipping

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) return items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      return [...items, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const addCollection = (productIds) => {
    setCart((items) => {
      const nextItems = [...items]
      productIds.forEach((id) => {
        const product = products.find((item) => item.id === id)
        if (!product) return
        const existing = nextItems.find((item) => item.id === product.id)
        if (existing) {
          existing.quantity += 1
          return
        }
        nextItems.push({ ...product, quantity: 1 })
      })
      return nextItems
    })
    setIsCartOpen(true)
  }

  const changeQuantity = (id, delta) => {
    setCart((items) => items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)))
  }

  const beginCheckout = () => {
    if (!cart.length) return
    setCheckoutOpen(true)
    setCheckoutStep(1)
    setOrderComplete(false)
  }

  const advanceCheckout = () => {
    if (checkoutStep < 3) {
      setCheckoutStep((step) => step + 1)
      return
    }
    setOrderComplete(true)
    setCart([])
    setIsCartOpen(false)
  }

  return (
    <div className="memory-app" style={{ '--asset-sheet': `url(${assetSheet})`, '--content-sheet': `url(${contentSheet})` }}>
      <aside className="side-rail" aria-label="Primary navigation">
        <div className="plaque">
          <span>D:1989</span>
          <small>Memory Lane</small>
        </div>
        <div className="date-deck">
          <span>Saturday</span>
          <strong>May 12, 1989</strong>
          <b>08:45 PM</b>
        </div>
        <nav className="drawer-nav">
          {navItems.map(({ number, label, asset }) => (
            <a key={label} href={`#${label.toLowerCase()}`} className="drawer-link">
              <b>{number}</b>
              <span className={`drawer-photo sprite ${asset}`} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="cassette-box">
          <div className="cassette-window"><span /><span /></div>
          <b>Sound On</b>
        </div>
        <div className="rail-basket">
          <div className="basket-wire" />
          <span>{itemCount} shelf items</span>
        </div>
      </aside>

      <main className="main-stage">
        <header className="topbar">
          <div className="paper-tabs">
            {tabs.map(({ label, icon: Icon }) => (
              <button key={label} className="paper-tab"><Icon size={18} />{label}</button>
            ))}
          </div>
          <form className="search-box" onSubmit={(event) => event.preventDefault()}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search memories, news, items..." />
            <button aria-label="Search"><Search size={22} /></button>
          </form>
          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} /> Cart <span>{itemCount}</span>
          </button>
        </header>

        <section className="hero-shelf" id="home">
          <img src={heroImage} alt="Retro 1989 memory lane storefront" />
          <div className="hero-vignette" />
          <div className="neon-title"><span>Dreaming in</span><strong>1989</strong></div>
          <div className="crt-card">
            <div className="crt-screen"><span>PLAY</span><p>Where the good old days are always in stock.</p><small>Hi-Fi</small></div>
            <div className="crt-knobs"><i /><i /></div>
          </div>
          <div className="clock-module"><b>08:45</b><span>PM</span><small>May 12 1989</small></div>
        </section>

        <section className="memory-strip-board">
          <article className="today-card paper">
            <h1>Today<br />in Memory<br />Lane</h1>
            <p>Relive the moments that made generations rewind, replay, and remember.</p>
            <button className="red-button">Explore Now <ChevronRight size={17} /></button>
          </article>
          <div className="polaroid-row">
            {memoryCards.map((card, index) => (
              <article key={card.title} className={`polaroid rotate-${index}`}>
                <span className="clip" />
                <div className={`memory-art scene ${card.scene}`}><span>{card.label}</span></div>
                <h3>{card.title}</h3>
                <p>{card.date}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="era-section" id="era">
          <div className="era-heading">
            <span>Pick Your Era</span>
            <h2>Choose the shelf you want to walk through.</h2>
          </div>
          <div className="era-grid">
            {eras.map((era) => (
              <button key={era.year} className={activeEra === era.year ? 'active' : ''} onClick={() => setActiveEra(era.year)}>
                <strong>{era.year}</strong>
                <span>{era.title}</span>
              </button>
            ))}
          </div>
          <article className="era-feature paper">
            <div className={`era-scene scene ${selectedEra.scene}`} />
            <div>
              <span>{selectedEra.year} rewind</span>
              <h3>{selectedEra.title}</h3>
              <p>{selectedEra.copy}</p>
            </div>
          </article>
        </section>

        <section className="content-grid">
          <article className="news-panel paper" id="news">
            <div className="panel-heading">
              <div><h2>News Feed</h2><p>All the stories, trends, and moments from the 80s & 90s.</p></div>
              <span className="stamp">Follow News</span>
            </div>
            <div className="category-tabs">
              {categories.map((category) => (
                <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
            <div className="news-layout">
              <article className="lead-story">
                <div className="lead-image">
                  {filteredNews[0]?.image && <img src={filteredNews[0].image} alt="" />}
                  <span>{filteredNews[0]?.category ?? 'Archive'}</span>
                </div>
                <h3>{filteredNews[0]?.title ?? 'No memories matched this search'}</h3>
                <p>{filteredNews[0]?.date ?? 'Try another search'}</p>
                <div className="story-stats">
                  <span>{filteredNews[0]?.likes ?? 0} likes</span>
                  <span>{filteredNews[0]?.comments ?? 0} comments</span>
                </div>
              </article>
              <div className="story-list">
                {filteredNews.slice(1).map((item) => (
                  <article key={item.title}>
                    <div className="story-thumb"><img src={item.image} alt="" /></div>
                    <div><h4>{item.title}</h4><p>{item.date}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <div className="side-stack">
            <article className="timeline-card paper">
              <h2>Featured Timeline</h2>
              <p>Choose a year to travel</p>
              <div className="year-dial">
                {years.map((year) => <button key={year} className={activeYear === year ? 'active' : ''} onClick={() => setActiveYear(year)}>{year}</button>)}
              </div>
              <div className="film-strip"><span /><span /><span /><span /></div>
              <b>{activeYear}: a fresh shelf of memories unlocked.</b>
            </article>
            <article className="arcade-card" id="games">
              <h2>Arcade Corner</h2>
              <div className="arcade-screen"><span>STREET HERO II</span><small>High Score 9600</small></div>
              <div className="arcade-controls"><i /><i /><i /></div>
              <button><Play size={16} /> Play classic games</button>
            </article>
          </div>
        </section>

        <section className="memory-week-grid">
          <article className="memory-week paper">
            <div className="panel-heading">
              <div><h2>Memory of the Week</h2><p>A community note pulled from the front of the memory board.</p></div>
              <span className="stamp">Pinned</span>
            </div>
            <div className="memory-week-body">
              <div className="scene film-memories" />
              <blockquote>
                <p>We would split fries at the food court, check the music store wall, then spend the last dollar in the arcade before pickup.</p>
                <cite>Kelly R., summer 1989</cite>
              </blockquote>
            </div>
          </article>

          <article className="quiz-card">
            <span className="quiz-kicker">Quick Quiz</span>
            <h2>What kind of memory-lane kid are you?</h2>
            <div className="quiz-options">
              {quizOptions.map((option) => (
                <button key={option.id} className={quizChoice === option.id ? 'active' : ''} onClick={() => setQuizChoice(option.id)}>
                  {option.label}
                </button>
              ))}
            </div>
            <div className="quiz-result">
              <strong>{quizResult.result}</strong>
              <p>{quizResult.detail}</p>
            </div>
          </article>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-sign">
            <span>TenOverage</span>
            <h2>Shop the Aisles</h2>
            <a href="#shop">View all products <ChevronRight size={16} /></a>
          </div>
          <div className="product-shelf">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <span className="product-tag">{product.tag}</span>
                <div className={`product-art sprite ${product.art}`} />
                <h3>{product.name}</h3>
                <p>{product.detail}</p>
                <div className="product-buy">
                  <strong>${product.price.toFixed(2)}</strong>
                  <button onClick={() => addToCart(product)}><ShoppingCart size={16} />Add</button>
                </div>
              </article>
            ))}
          </div>
          <article className="trend-card shop-trend paper">
            <h2>Trending Now in 89</h2>
            <ol>{trends.map((trend) => <li key={trend}>{trend}</li>)}</ol>
          </article>
        </section>

        <section className="collections-section" id="collections">
          <div className="section-sign">
            <span>Curated Shelves</span>
            <h2>Bundles built like old weekend plans.</h2>
            <a href="#collections">Add a bundle <ChevronRight size={16} /></a>
          </div>
          <div className="collection-grid">
            {collections.map((collection) => (
              <article key={collection.title} className="collection-card paper">
                <img className="collection-scene" src={collection.image} alt="" />
                <span>{collection.tag}</span>
                <h3>{collection.title}</h3>
                <p>{collection.copy}</p>
                <div className="collection-items">
                  {collection.productIds.map((id) => {
                    const product = products.find((item) => item.id === id)
                    return product ? <i key={id} className={`sprite ${product.art}`} aria-label={product.name} /> : null
                  })}
                </div>
                <button className="red-button" onClick={() => addCollection(collection.productIds)}>
                  <ShoppingCart size={16} /> Add Bundle
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="bottom-grid">
          <article className="mini-arcade">
            <h2>Play Some Games</h2>
            <div className="game-screens">
              <span className="scene arcade-trio">Block Drop</span>
              <span className="scene arcade-trio">Maze Run</span>
              <span className="scene arcade-trio">Side Quest</span>
            </div>
            <button>More games <ChevronRight size={16} /></button>
          </article>
          <article className="time-capsule paper">
            <h2>Time Capsule</h2>
            <p>Upload your memories</p>
            <div className="memory-upload-grid">
              {memories.map(({ title, icon: Icon }) => <span key={title}><Icon size={20} />{title}</span>)}
            </div>
            <button className="red-button"><Plus size={16} /> Add Memory</button>
          </article>
          <article className="listen-panel">
            <h2>Listen to the 80s/90s</h2>
            <div className="album-row">
              <span className="scene album-shelf">Power Ballads</span>
              <span className="scene album-shelf">Dance Mix</span>
              <span className="scene album-shelf">Road Tape</span>
            </div>
            <button><Headphones size={16} /> Listen Now</button>
          </article>
          <article className="memory-receipt paper" id="community">
            <span>Memory Receipt</span>
            <h2>Your trip so far</h2>
            <div className="receipt-lines">
              <p><b>Era</b><strong>{activeEra}</strong></p>
              <p><b>Shelf</b><strong>{selectedEra.title}</strong></p>
              <p><b>Persona</b><strong>{quizResult.result}</strong></p>
              <p><b>Cart</b><strong>{itemCount} items</strong></p>
            </div>
            <div className="receipt-total-line">
              <b>Next stop</b>
              <strong>{collections[0].title}</strong>
            </div>
            <a className="red-button" href="#collections">View Curated Shelves <ChevronRight size={16} /></a>
          </article>
        </section>

        <footer className="site-footer-lite" id="photos">
          <strong>Good Times. Great Memories. Always in Stock.</strong>
          <nav aria-label="Footer navigation">
            <a href="#news">News</a>
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <button type="button" onClick={() => setIsCartOpen(true)}>Cart ({itemCount})</button>
          </nav>
        </footer>
      </main>

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <div><span>My Shelf</span><h2>Cart ({itemCount})</h2></div>
          <button onClick={() => setIsCartOpen(false)} aria-label="Close cart"><X size={22} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart"><ShoppingCart size={44} /><p>Your shelf is empty. Add a cassette, handheld, or VHS from the aisles.</p></div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <article key={item.id}>
                  <div className={`cart-art sprite ${item.art}`} />
                  <div><h3>{item.name}</h3><p>${item.price.toFixed(2)}</p><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button></div></div>
                  <button className="trash" onClick={() => setCart((items) => items.filter((cartItem) => cartItem.id !== item.id))}><Trash2 size={18} /></button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <span>Subtotal <b>${subtotal.toFixed(2)}</b></span>
              <span>Demo shipping <b>${shipping.toFixed(2)}</b></span>
              <strong>Total <b>${total.toFixed(2)}</b></strong>
              <button onClick={beginCheckout}><CreditCard size={18} />Checkout demo</button>
            </div>
          </>
        )}
      </aside>

      {checkoutOpen && (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="checkout-modal paper">
            <button className="modal-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X size={22} /></button>
            {orderComplete ? (
              <div className="order-complete">
                <CheckCircle2 size={60} />
                <h2 id="checkout-title">Order saved to your memory shelf.</h2>
                <p>This is a UI/UX checkout demo. No payment was processed.</p>
                <button className="red-button" onClick={() => setCheckoutOpen(false)}>Back to Memory Lane</button>
              </div>
            ) : (
              <>
                <div className="checkout-progress">{[1, 2, 3].map((step) => <span key={step} className={checkoutStep >= step ? 'active' : ''}>{step}</span>)}</div>
                <h2 id="checkout-title">{checkoutStep === 1 ? 'Shipping to the past' : checkoutStep === 2 ? 'Payment demo' : 'Review your shelf'}</h2>
                {checkoutStep === 1 && <div className="checkout-form"><label>Full name<input defaultValue="Marty Lane" /></label><label>Street address<input defaultValue="1989 Memory Ave" /></label><label>City<input defaultValue="Hill Valley" /></label></div>}
                {checkoutStep === 2 && <div className="checkout-form"><label>Card number<input defaultValue="4242 4242 4242 4242" /></label><label>Expiration<input defaultValue="12 / 89" /></label><label>CVV<input defaultValue="089" /></label></div>}
                {checkoutStep === 3 && <div className="review-box">{cart.map((item) => <span key={item.id}>{item.quantity} x {item.name}</span>)}<strong>Total demo charge: ${total.toFixed(2)}</strong></div>}
                <button className="red-button checkout-next" onClick={advanceCheckout}>{checkoutStep === 3 ? 'Place demo order' : 'Continue'} <ChevronRight size={17} /></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
