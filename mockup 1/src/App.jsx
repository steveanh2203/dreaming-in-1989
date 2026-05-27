import { useMemo, useState } from 'react'
import {
  ChevronRight,
  Clock,
  CreditCard,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Star,
  Trash2,
} from 'lucide-react'
import aisleIconSheet from './assets/aisle-icon-sheet.png'
import productSheet from './assets/retro-product-sheet.png'
import storySheet from './assets/nostalgia-story-sheet.png'
import supermarketHero from './assets/supermarket-hero-v2.png'
import './App.css'

const aisleTabs = [
  { id: 'newsstand', number: '01', label: 'Newsstand', iconClass: 'icon-newsstand' },
  { id: 'kitchen', number: '02', label: 'Kitchen', iconClass: 'icon-kitchen' },
  { id: 'music', number: '03', label: 'Music & Movies', iconClass: 'icon-music' },
  { id: 'apparel', number: '04', label: 'Apparel', iconClass: 'icon-apparel' },
  { id: 'wall-art', number: '05', label: 'Wall Art', iconClass: 'icon-wall-art' },
  { id: 'memory-wall', number: '06', label: 'Memory Wall', iconClass: 'icon-memory-wall' },
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
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
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
            <div className="checkout-sign">
              <span>Checkout Lane</span>
              <strong>1</strong>
            </div>
            <div className="thanks-sign">Thanks for shopping. See you next week!</div>
          </div>
        </section>

        <section className="aisle-directory" id="aisles" aria-label="Aisle directory">
          <div className="directory-title">Aisle Directory</div>
          <div className="aisle-grid">
            {aisleTabs.map(({ id, number, label, iconClass }) => (
              <button
                className={activeAisle === id ? 'active' : ''}
                key={id}
                type="button"
                onClick={() => setActiveAisle(id)}
              >
                <strong>{number}</strong>
                <span>{label}</span>
                <span
                  className={`aisle-icon ${iconClass}`}
                  style={{ backgroundImage: `url(${aisleIconSheet})` }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </section>

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

export default App
