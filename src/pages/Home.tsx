import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation()

  // If we arrive at "/#about" from another page, scroll to the About section
  useEffect(() => {
    if (location.hash === '#about') {
      const el = document.getElementById('about')
      if (el) {
        const id = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
        return () => clearTimeout(id)
      }
    }
  }, [location])

  return (
    <div>
      {/* Hero */}
      <section className="px-6 md:px-16 pt-16 md:pt-24 pb-20 md:pb-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral mb-5">
          Celebrating 13 years
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl">
          Thirteen years of love, growth, and a formidable oneness.
        </h1>
        <p className="mt-6 text-ink/60 max-w-xl text-lg leading-relaxed">
          This is a space dedicated to a thirteen years of shared moments, 
          laughter, tears, and building a life together—brick by brick, dream by dream.
        </p>
        
        {/* Suggestion: Place a beautiful hero image here, like "WhatsApp Image 2026-06-17 at 9.39.57 AM.jpg" */}
        <div className="max-w-3xl rounded-2xl overflow-hidden border border-ink/10 shadow-sm">
          <img 
            src="/images/pgpo.jpg" 
            alt="Celebrating 13 Years" 
            className="w-full h-[400px] object-cover"
            onError={(e) => {
              // Fallback placeholder if image path isn't set up yet
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 md:px-16 pb-24 scroll-mt-8">
        <div className="max-w-2xl border-t border-ink/10 pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint mb-4">
            Their Love Story
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-5">
            How It All Began
          </h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            It all just kinda happened🌚..😂nahh but apparently our Pastor's have been around each other for the longest time. They attended the same degree programme, yet they never spoke to themselves😭; we lived one street away from each other yet never met once(Pastor wanted to fumble the bag😪); they attended the same Church and were in several meetings jointly, yet it didn't occur to them that they were each other's partner that prophecy incessantly spoke about(omooo,God abeg😖).
          </p>
          <p className="text-ink/70 leading-relaxed mb-6">
           They were in the same outreach group, they shared a similar circle of friends, yet never connected until it was time for their Love Story to begin purely on divine leading and strategic destiny connections(kabaye😩). They met themselves in love at the mercy of love's strong hand🥺.
          </p>
          <h3 className="font-display text-xl font-bold mb-3 mt-8 text-charcoal">
            Evolving Together
          </h3>
          <p className="text-ink/70 leading-relaxed mb-6">
            They started as two completely separate individuals, each with their own backgrounds, training, and world; but over the past thirteen years, they have grown into a formidable oneness. Through each challenge, they've learned to communicate better, empathize more deeply, and support one another unconditionally. And we can see that evidently in you sir and ma 
          </p>
          <p className="text-ink/70 leading-relaxed">
            As they stand at this thirteen-year mark, the future stretches out before them filled with endless possibilities. Here's to our Pastors, to the thirteen years they've shared, and to the many more years to come!
          </p>
        </div>
      </section>
    </div>
  )
}
