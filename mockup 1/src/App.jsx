import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Camera,
  ChevronRight,
  Clock,
  CreditCard,
  Gamepad2,
  Headphones,
  Home,
  Mail,
  MessageSquare,
  Minus,
  Newspaper,
  Package,
  Play,
  Plus,
  Radio,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  Truck,
  Tv,
} from 'lucide-react'
import productSheet from './assets/retro-product-sheet.png'
import storySheet from './assets/nostalgia-story-sheet.png'
import widgetSheet from './assets/retro-widget-sheet.png'
import supermarketHero from './assets/supermarket-hero-v2.png'
import './App.css'

const aisleTabs = [
  { id: 'newsstand', number: '01', label: 'Newsstand', Icon: Newspaper },
  { id: 'kitchen', number: '02', label: 'Kitchen', Icon: Package },
  { id: 'music', number: '03', label: 'Music & Movies', Icon: Headphones },
  { id: 'apparel', number: '04', label: 'Apparel', Icon: Star },
  { id: 'wall-art', number: '05', label: 'Wall Art', Icon: Camera },
  { id: 'memory-wall', number: '06', label: 'Memory Wall', Icon: MessageSquare },
]

const stories = [
  {
    title: 'The Sound of a Mixtape',
    category: 'On the mix',
    copy: 'The songs, the artists, and the memories we pressed record on.',
    art: 'Summer 89',
    image: 'mixtape',
    size: 'feature',
  },
  { title: 'Mall Food Court Memories', category: 'Nostalgic bites', art: 'Mall', image: 'mall' },
  { title: 'Saturday Morning TV', category: 'Saturday favorites', art: 'TV', image: 'tv' },
  { title: 'Road Trip Summer', category: 'Summer roads', art: 'Van', image: 'road' },
  { title: 'Local Video Store', category: 'Friday night', art: 'VHS', image: 'video' },
]

const products = [
  {
    id: 'cassette-decor',
    name: 'Cassette Tape Decor',
    price: 19.99,
    aisle: 'music',
    note: 'Retro wall art',
    color: 'red',
    image: 'cassette',
  },
  {
    id: 'vhs-poster',
    name: 'VHS-Style Poster',
    price: 16.99,
    aisle: 'wall-art',
    note: 'Vintage movie vibes',
    color: 'navy',
    image: 'poster',
  },
  {
    id: 'diner-mug',
    name: 'Diner Coffee Mug',
    price: 14.99,
    aisle: 'kitchen',
    note: 'Classic diner style',
    color: 'cream',
    image: 'mug',
  },
  {
    id: 'crew-sweatshirt',
    name: 'Retro Sweatshirt',
    price: 34.99,
    aisle: 'apparel',
    note: '80s crew vibes',
    color: 'green',
    image: 'sweatshirt',
  },
  {
    id: 'photo-album',
    name: 'Photo Album',
    price: 24.99,
    aisle: 'memory-wall',
    note: 'Save the memories',
    color: 'olive',
    image: 'album',
  },
  {
    id: 'pin-set',
    name: 'Enamel Pin Set',
    price: 12.99,
    aisle: 'wall-art',
    note: 'Collect them all',
    color: 'mustard',
    image: 'pins',
  },
]

const comparisons = [
  ['Mixtape', 'Playlist'],
  ['Paper Map', 'GPS'],
  ['Video Store', 'Streaming'],
  ['Printed Photos', 'Phone Gallery'],
]

const initialMemories = [
  'Riding bikes until the streetlights came on.',
  'Friday nights at the mall.',
  'Renting VHS tapes was the highlight of the weekend.',
  'The best cereal always had the best prizes.',
]

const memoryEvents = [
  { date: 'May 12, 1989', title: 'Cartoons take over Friday night TV.', art: 'tv' },
  { date: 'Summer 1989', title: 'Mall photo booths become the weekend ritual.', art: 'photos' },
]

const flyerItems = [
  { name: 'Cereal Box', price: '$18.99', art: 'cereal' },
  { name: 'Cassette Tape', price: '$9.99', art: 'cassette' },
  { name: 'Lunchbox', price: '$19.99', art: 'lunchbox' },
]

const trendItems = [
  'Acid wash jeans',
  'New kids on the block',
  'Time travel sequels',
  'Pocket games',
  'High-top sneakers',
]

const mixtapeTracks = [
  "Livin' on a Prayer",
  'Straight Up',
  'Every Rose Has Its Thorn',
  "Don't Dream It's Over",
]

const hotItems = [
  { title: 'Miami Vice Nights', art: 'magazine' },
  { title: 'Ghost Movie Posters', art: 'vhs' },
  { title: 'Backyard Radio Shows', art: 'boombox' },
]

function formatMoney(value) {
  return `$${value.toFixed(2)}`
}

function App() {
  const [activeAisle, setActiveAisle] = useState('newsstand')
  const [cart, setCart] = useState([
    { ...products[0], quantity: 1 },
    { ...products[2], quantity: 1 },
    { ...products[3], quantity: 1 },
  ])
  const [memoryText, setMemoryText] = useState('')
  const [memories, setMemories] = useState(initialMemories)

  const visibleProducts = useMemo(() => {
    if (activeAisle === 'newsstand') return products
    if (activeAisle === 'memory-wall') return products.filter((item) => item.id === 'photo-album')
    return products.filter((item) => item.aisle === activeAisle)
  }, [activeAisle])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cart.length ? 5.99 : 0
  const tax = cart.length ? 5.85 : 0
  const total = subtotal + shipping + tax
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (!existing) return [...items, { ...product, quantity: 1 }]
      return items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    })
  }

  function changeQuantity(id, direction) {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + direction) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function shareMemory(event) {
    event.preventDefault()
    const text = memoryText.trim()
    if (!text) return
    setMemories((items) => [text, ...items].slice(0, 6))
    setMemoryText('')
  }

  return (
    <div className="site-shell">
      <header className="store-header">
        <a className="brand" href="#top" aria-label="Dreaming in 1989 home">
          <ShoppingCart size={30} />
          <span>
            <strong>Dreaming in 1989</strong>
            <em>Nostalgia News & Market</em>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#stories">Stories</a>
          <a href="#aisles">Aisles</a>
          <a href="#flyer">Flyer</a>
          <a href="#memory-wall">Memory Wall</a>
        </nav>
        <div className="header-tools">
          <label className="search-field">
            <Search size={18} />
            <input placeholder="Search memories..." />
          </label>
          <a className="cart-pill" href="#checkout-lane">
            <ShoppingCart size={18} />
            Cart ({cartCount})
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-paper">
            <h1>Your Weekly Trip Back</h1>
            <p>Stories, gifts, and everyday things from the America you remember.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#aisles">
                Browse the Aisles
                <ChevronRight size={18} />
              </a>
              <a className="secondary-button" href="#stories">
                Read the Newsstand
              </a>
            </div>
            <div className="receipt-line">Good times. Great memories. Always in stock.</div>
          </div>
          <div className="hero-photo">
            <img src={supermarketHero} alt="Vintage American supermarket aisle and checkout lane" />
            <div className="thanks-sign">Thanks for shopping. See you next week!</div>
          </div>
        </section>

        <section className="aisle-directory" id="aisles" aria-label="Aisle directory">
          <div className="directory-title">Aisle Directory</div>
          <div className="aisle-grid">
            {aisleTabs.map(({ id, number, label, Icon }) => (
              <button
                className={activeAisle === id ? 'active' : ''}
                key={id}
                type="button"
                onClick={() => setActiveAisle(id)}
              >
                <strong>{number}</strong>
                <span>{label}</span>
                <Icon className="aisle-icon" size={34} strokeWidth={2.3} aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <div className="retro-dashboard">
          <aside className="retro-rail left-rail" aria-label="Memory lane side panels">
            <section className="rail-card browse-card">
              <div className="rail-title">
                <Home size={17} />
                <h2>Browse the Aisles</h2>
              </div>
              <ol className="mini-aisle-list">
                {aisleTabs.map(({ number, label }) => (
                  <li key={number}>
                    <span>{number}</span>
                    <strong>{label}</strong>
                    <ChevronRight size={13} />
                  </li>
                ))}
              </ol>
            </section>

            <section className="rail-card badge-card">
              <WidgetArt art="cereal" label="Retro cereal illustration" />
              <div>
                <h2>Memories Taste Better</h2>
                <p>Sweet Saturday mornings, prize boxes, and cartoons before chores.</p>
              </div>
            </section>

            <section className="rail-card signup-card">
              <div className="rail-title">
                <Mail size={17} />
                <h2>Stay in the Loop</h2>
              </div>
              <p>Get stories, sales, and memory-lane finds every week.</p>
              <label>
                <input placeholder="Email" />
                <button type="button">Subscribe</button>
              </label>
            </section>

            <section className="rail-card arcade-card">
              <div className="rail-title">
                <Gamepad2 size={18} />
                <h2>Arcade Corner</h2>
              </div>
              <WidgetArt art="arcade" label="Vintage arcade cabinet" />
              <div className="arcade-screen">
                <span>Galaxy Invaders</span>
                <strong>19890</strong>
              </div>
              <button type="button">Play Free Games</button>
            </section>

            <section className="rail-card mixtape-card">
              <div className="rail-title">
                <Headphones size={18} />
                <h2>Current Mixtape</h2>
              </div>
              <WidgetArt art="cassette" label="Cassette tape" />
              <ol>
                {mixtapeTracks.map((track) => (
                  <li key={track}>{track}</li>
                ))}
              </ol>
              <button type="button">
                <Play size={14} />
                Listen Now
              </button>
            </section>
          </aside>

          <div className="center-feed">
        <section className="stories-section" id="stories">
          <SectionTitle eyebrow="Featured Stories" title="The newsstand at the front of the store." />
          <div className="story-layout">
            {stories.map((story) => (
              <article className={`story-card ${story.size === 'feature' ? 'feature' : ''}`} key={story.title}>
                <div className="story-copy">
                  <span>{story.category}</span>
                  <h2>{story.title}</h2>
                  {story.copy && <p>{story.copy}</p>}
                  <a href="#stories">
                    Read More <ChevronRight size={14} />
                  </a>
                </div>
                <div
                  className={`story-art story-${story.image}`}
                  style={{
                    backgroundImage:
                      story.image === 'mixtape' ? `url(${productSheet})` : `url(${storySheet})`,
                  }}
                  aria-label={`${story.art} story image`}
                  role="img"
                >
                  <strong>{story.art}</strong>
                </div>
              </article>
            ))}
            <aside className="what-new">
              <Clock size={22} />
              <h3>What's New This Week</h3>
              <ul>
                <li>Why mixtapes mattered more than playlists</li>
                <li>Best mall snacks, ranked</li>
                <li>The car games we played for hours</li>
                <li>Video rental recollections</li>
              </ul>
              <a href="#stories">
                View All Stories <ChevronRight size={14} />
              </a>
            </aside>
          </div>
        </section>

        <section className="shop-section">
          <SectionTitle eyebrow="Shop the Shelves" title="Retro-inspired goods arranged like old aisle shelves." />
          <div className="product-shelf">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className={`product-image ${product.color} product-${product.image}`}
                  style={{ backgroundImage: `url(${productSheet})` }}
                  aria-label={`${product.name} product image`}
                  role="img"
                />
                <h3>{product.name}</h3>
                <p>{product.note}</p>
                <div className="buy-row">
                  <strong>{formatMoney(product.price)}</strong>
                  <button type="button" onClick={() => addToCart(product)}>
                    <Plus size={14} />
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-grid">
          <article className="weekly-flyer" id="flyer">
            <SectionTitle eyebrow="Weekly Flyer" title="This week's memory bundle." compact />
            <div className="flyer-spread">
              <div className="bundle">
                <Star size={34} />
                <h3>All your favorites. One low price.</h3>
                <div className="bundle-items">
                  <span>Retro Crew</span>
                  <span>Diner Mug</span>
                  <span>Cassette Decor</span>
                </div>
                <strong>$49.89</strong>
              </div>
              <div className="coupon">
                <span>Extra Savings</span>
                <strong>15% OFF</strong>
                <em>Use code: BACK1989</em>
              </div>
            </div>
            <button className="clip-button" type="button">
              Clip Coupon
            </button>
          </article>

          <article className="then-now">
            <SectionTitle eyebrow="Then & Now" title="Some things change. Some don't." compact />
            <div className="comparison-list">
              {comparisons.map(([then, now]) => (
                <div className="comparison-row" key={then}>
                  <div>
                    <span>Then</span>
                    <strong>{then}</strong>
                  </div>
                  <ChevronRight size={22} />
                  <div>
                    <span>Now</span>
                    <strong>{now}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="memory-checkout-row">
          <article className="memory-wall" id="memory-wall">
            <SectionTitle eyebrow="Memory Wall" title="Stories from our community." compact />
            <div className="pin-board">
              {memories.map((memory, index) => (
                <p className={`note note-${index % 4}`} key={`${memory}-${index}`}>
                  {memory}
                </p>
              ))}
            </div>
            <form className="memory-form" onSubmit={shareMemory}>
              <h3>Remember When?</h3>
              <p>Share your stories, photos, and memories with the community.</p>
              <input
                value={memoryText}
                onChange={(event) => setMemoryText(event.target.value)}
                placeholder="What do you remember?"
              />
              <button type="submit">Share a Memory</button>
            </form>
          </article>

          <article className="checkout-lane" id="checkout-lane">
            <div className="register-screen">Thank you! Please come again.</div>
            <div className="receipt-card">
              <h3>Your Cart</h3>
              {cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <span>{item.name}</span>
                  <div>
                    <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>
                      <Minus size={13} />
                    </button>
                    <em>{item.quantity}</em>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>
                      <Plus size={13} />
                    </button>
                    <button type="button" onClick={() => changeQuantity(item.id, -item.quantity)} aria-label={`Remove ${item.name}`}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="receipt-total">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <div className="receipt-total">
                <span>Shipping</span>
                <strong>{formatMoney(shipping)}</strong>
              </div>
              <div className="receipt-total">
                <span>Tax</span>
                <strong>{formatMoney(tax)}</strong>
              </div>
              <div className="receipt-total final">
                <span>Total</span>
                <strong>{formatMoney(total)}</strong>
              </div>
              <button className="checkout-button" type="button">
                Checkout
                <ChevronRight size={18} />
              </button>
              <div className="secure-note">
                <CreditCard size={18} />
                Fast, easy, and safe demo checkout.
              </div>
            </div>
            <aside className="store-hours">
              <h3>Store Hours</h3>
              <p>Mon - Sat: 8AM - 9PM</p>
              <p>Sunday: 9AM - 7PM</p>
              <small>We appreciate your business.</small>
            </aside>
          </article>
        </section>
          </div>

          <aside className="retro-rail right-rail" aria-label="Today in memory lane panels">
            <section className="rail-card event-card">
              <div className="rail-title">
                <CalendarDays size={17} />
                <h2>Today in Memory Lane</h2>
              </div>
              {memoryEvents.map((event) => (
                <article className="mini-event" key={event.title}>
                  <WidgetArt art={event.art} label={event.title} />
                  <div>
                    <span>{event.date}</span>
                    <strong>{event.title}</strong>
                  </div>
                </article>
              ))}
              <button type="button">View All Events</button>
            </section>

            <section className="rail-card weekly-card">
              <div className="rail-title">
                <Newspaper size={17} />
                <h2>Weekly Flyer</h2>
              </div>
              <div className="flyer-mini-grid">
                {flyerItems.map((item) => (
                  <article key={item.name}>
                    <WidgetArt art={item.art} label={item.name} />
                    <strong>{item.name}</strong>
                    <span>{item.price}</span>
                  </article>
                ))}
              </div>
              <button type="button">View Full Flyer</button>
            </section>

            <section className="rail-card trending-card">
              <div className="rail-title">
                <Radio size={17} />
                <h2>Trending Now in '89</h2>
              </div>
              <ol>
                {trendItems.map((trend, index) => (
                  <li key={trend}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {trend}
                  </li>
                ))}
              </ol>
              <WidgetArt art="jeans" label="Acid wash denim tag" />
            </section>

            <section className="rail-card photo-card">
              <div className="photo-stack">
                <WidgetArt art="photos" label="Instant photo stack" />
                <WidgetArt art="magazine" label="Retro magazine clipping" />
              </div>
              <h2>Photo Gallery</h2>
              <p>Relive the sights, styles, and smiles of a generation.</p>
              <button type="button">
                <Camera size={14} />
                Browse Photos
              </button>
            </section>

            <section className="rail-card hot-card">
              <div className="rail-title">
                <Tv size={17} />
                <h2>What's Hot in '89</h2>
              </div>
              <div className="hot-grid">
                {hotItems.map((item) => (
                  <article key={item.title}>
                    <WidgetArt art={item.art} label={item.title} />
                    <span>{item.title}</span>
                  </article>
                ))}
              </div>
              <button type="button">More Classics</button>
            </section>
          </aside>
        </div>

        <section className="service-strip" aria-label="Store promises">
          <article>
            <Truck size={28} />
            <div>
              <strong>Fast Shipping</strong>
              <span>Just like the good old days, but faster.</span>
            </div>
          </article>
          <article>
            <Package size={28} />
            <div>
              <strong>Retro Packaging</strong>
              <span>Carefully packed with nostalgia.</span>
            </div>
          </article>
          <article>
            <CreditCard size={28} />
            <div>
              <strong>Hassle Free Returns</strong>
              <span>No worries, no stress, just like 1989.</span>
            </div>
          </article>
          <article>
            <ShieldCheck size={28} />
            <div>
              <strong>Safe & Secure</strong>
              <span>Your memories are in good hands.</span>
            </div>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <form>
          <span>Get the Sunday Flyer</span>
          <input placeholder="Enter your email" />
          <button type="button">Subscribe</button>
        </form>
        <nav>
          <a href="#aisles">Shop</a>
          <a href="#stories">Stories</a>
          <a href="#memory-wall">Community</a>
          <a href="#top">Back to top</a>
        </nav>
        <strong>Good times. Great memories. Always in stock.</strong>
      </footer>
    </div>
  )
}

function SectionTitle({ eyebrow, title, compact = false }) {
  return (
    <div className={`section-title ${compact ? 'compact' : ''}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  )
}

function WidgetArt({ art, label }) {
  return (
    <span
      className={`widget-art widget-${art}`}
      style={{ backgroundImage: `url(${widgetSheet})` }}
      aria-label={label}
      role="img"
    />
  )
}

export default App
