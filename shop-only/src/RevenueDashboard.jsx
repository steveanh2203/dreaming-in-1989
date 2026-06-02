import {
  ArrowUpRight,
  BadgeDollarSign,
  CalendarDays,
  DollarSign,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react'
import './RevenueDashboard.css'

const stats = [
  {
    label: 'Gross revenue',
    value: '$12,480',
    change: '+38.4%',
    note: 'vs. last period',
    icon: DollarSign,
  },
  {
    label: 'Orders',
    value: '312',
    change: '+71',
    note: 'paid checkouts',
    icon: ShoppingBag,
  },
  {
    label: 'Avg. order value',
    value: '$40.00',
    change: '+$6.80',
    note: 'per cart',
    icon: ReceiptText,
  },
  {
    label: 'Conversion',
    value: '4.8%',
    change: '+1.2 pts',
    note: 'store visitors',
    icon: TrendingUp,
  },
]

const dailyRevenue = [
  { day: 'Mon', value: 1280 },
  { day: 'Tue', value: 1640 },
  { day: 'Wed', value: 1480 },
  { day: 'Thu', value: 1920 },
  { day: 'Fri', value: 2380 },
  { day: 'Sat', value: 3120 },
  { day: 'Sun', value: 2660 },
]

const topProducts = [
  { name: 'Soft Rock Cassette Set', category: 'Audio', revenue: '$2,240', units: 80 },
  { name: 'Arcade Lights Poster', category: 'Wall Art', revenue: '$1,984', units: 62 },
  { name: 'Mall Weekend Tote', category: 'Apparel', revenue: '$1,728', units: 72 },
  { name: 'Diner Counter Mug', category: 'Kitchen', revenue: '$1,314', units: 73 },
]

const channels = [
  { name: 'Facebook Reels', value: 68 },
  { name: 'Direct store', value: 18 },
  { name: 'Email drops', value: 9 },
  { name: 'Organic search', value: 5 },
]

const maxDailyRevenue = Math.max(...dailyRevenue.map((item) => item.value))

function RevenueDashboard() {
  return (
    <main className="revenue-dashboard" aria-label="Revenue dashboard">
      <section className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-kicker">1989 Supply Co. / Launch Snapshot</p>
            <h1>Revenue dashboard</h1>
            <p>Retro goods are moving. Good times, paid carts, clean momentum.</p>
          </div>
          <div className="dashboard-date-card" aria-label="Dashboard reporting period">
            <CalendarDays size={22} />
            <span>June 2026</span>
            <strong>Month to date</strong>
          </div>
        </header>

        <section className="dashboard-hero-grid" aria-label="Revenue summary">
          <article className="revenue-total-card">
            <div>
              <p className="dashboard-kicker">Total sales</p>
              <strong>$12,480</strong>
              <span>
                <ArrowUpRight size={18} />
                38.4% growth this period
              </span>
            </div>
            <div className="receipt-stack" aria-hidden="true">
              <span>RCPT-1989</span>
              <strong>PAID</strong>
              <small>312 orders</small>
            </div>
          </article>

          <div className="metric-grid">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <article className="metric-card" key={stat.label}>
                  <Icon size={20} />
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <small>{stat.change} {stat.note}</small>
                </article>
              )
            })}
          </div>
        </section>

        <section className="dashboard-content-grid">
          <article className="dashboard-panel revenue-chart-panel">
            <div className="panel-heading">
              <div>
                <p className="dashboard-kicker">Daily sales</p>
                <h2>7-day revenue tape</h2>
              </div>
              <BadgeDollarSign size={24} />
            </div>
            <div className="bar-chart" aria-label="Seven day revenue chart">
              {dailyRevenue.map((item) => (
                <div className="bar-column" key={item.day}>
                  <div>
                    <span style={{ height: `${Math.round((item.value / maxDailyRevenue) * 100)}%` }} />
                  </div>
                  <strong>${(item.value / 1000).toFixed(1)}k</strong>
                  <small>{item.day}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel channel-panel">
            <div className="panel-heading">
              <div>
                <p className="dashboard-kicker">Traffic source</p>
                <h2>Where sales came from</h2>
              </div>
              <Users size={24} />
            </div>
            <div className="channel-list">
              {channels.map((channel) => (
                <div className="channel-row" key={channel.name}>
                  <div>
                    <span>{channel.name}</span>
                    <strong>{channel.value}%</strong>
                  </div>
                  <div className="channel-meter">
                    <span style={{ width: `${channel.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel top-products-panel">
            <div className="panel-heading">
              <div>
                <p className="dashboard-kicker">Best sellers</p>
                <h2>Products pulling revenue</h2>
              </div>
              <PackageCheck size={24} />
            </div>
            <div className="product-table">
              {topProducts.map((product, index) => (
                <div className="product-row" key={product.name}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{product.name}</strong>
                    <small>{product.category} / {product.units} units</small>
                  </div>
                  <em>{product.revenue}</em>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel milestone-panel">
            <p className="dashboard-kicker">Milestone</p>
            <h2>$12k in launch-window sales</h2>
            <p>
              First revenue push for the retro store. Strongest channel: Facebook Reels.
              Strongest offer: nostalgic shelf goods and small bundles.
            </p>
            <div className="milestone-stamp">REWIND & RISE</div>
            <small>Draft snapshot. Replace demo values with verified sales before public posting.</small>
          </article>
        </section>
      </section>
    </main>
  )
}

export default RevenueDashboard
