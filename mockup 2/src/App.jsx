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
import './App.css'

const navItems = [
  { label: 'Home', asset: 'crt' },
  { label: 'News', asset: 'news' },
  { label: 'Games', asset: 'handheld' },
  { label: 'Shop', asset: 'bag' },
  { label: 'Photos', asset: 'photos' },
  { label: 'Community', asset: 'community' },
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

const memories = [
  { title: 'My first summer 87', icon: Camera },
  { title: 'Video rental weekend', icon: Tv },
  { title: 'Concert ticket stub', icon: Music },
  { title: 'School dance 89', icon: Radio },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeYear, setActiveYear] = useState(1989)
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
          {navItems.map(({ label, asset }) => (
            <a key={label} href={`#${label.toLowerCase()}`} className="drawer-link">
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
          <article className="poll-card paper" id="community">
            <h2>What was your favorite Saturday morning cartoon?</h2>
            {['Hero Squad', 'Storm Cats', 'Joe Force', 'Teen Turtle Team', 'Other'].map((option) => (
              <label key={option}><input type="radio" name="poll" />{option}</label>
            ))}
            <button className="red-button">Vote</button>
          </article>
        </section>

        <section className="street-footer" id="photos">
          <p>Good Times. Great Memories. Always in Stock.</p>
          <div className="storefronts"><span>Video Rental</span><span>Toy Galaxy</span><span>Radio Hut</span><span>Pizza Plaza</span></div>
        </section>
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
