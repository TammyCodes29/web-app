import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Info, Home as HomeIcon, Image, MessageSquare, Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'About', to: '/#about', icon: Info },
  { label: 'Memes', to: '/memes', icon: Image },
  { label: 'Comments', to: '/comments', icon: MessageSquare },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // Close the mobile drawer whenever the route changes
  useEffect(() => setOpen(false), [location.pathname])

  const isActive = (to: string) => {
    if (to === '/#about') return false // About is a scroll target, not a route
    return location.pathname === to
  }

  const handleClick = (e: React.MouseEvent, to: string) => {
    if (to !== '/#about') return
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#about')
    }
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-charcoal text-paper">
        <Link to="/" className="font-display text-lg tracking-tight">
          PG/PO Anniversary
        </Link>
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className="p-2 -mr-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside
        className={`
          bg-charcoal text-paper w-60 px-5 py-8 flex-col gap-1
          md:fixed md:left-0 md:top-0 md:h-screen md:flex
          ${open ? 'flex' : 'hidden'}
        `}
      >
        <Link to="/" className="font-display text-2xl tracking-tight mb-10 hidden md:block">
          PG/PO Anniversary
        </Link>

        <nav className="flex flex-col gap-1">
          {links.map(({ label, to, icon: Icon }) => {
            const itemClasses = `
              flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-[15px]
              transition-colors
              ${isActive(to) ? 'bg-coral text-charcoal' : 'text-paper/80 hover:bg-white/10 hover:text-paper'}
            `

            if (to === '/#about') {
              return (
                <a key={label} href={to} onClick={(e) => handleClick(e, to)} className={itemClasses}>
                  <Icon size={18} strokeWidth={2} />
                  {label}
                </a>
              )
            }

            return (
              <Link key={label} to={to} className={itemClasses}>
                <Icon size={18} strokeWidth={2} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-8 hidden md:block">
          <p className="font-mono text-xs text-paper/40 leading-relaxed">
            Built with React, TypeScript &amp; Tailwind.
          </p>
        </div>
      </aside>
    </>
  )
}
