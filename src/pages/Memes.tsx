const sampleMemes = [
  { 
    id: 1, 
    caption: '10 years later and he still looks at her like it is day one 😍', 
    imageUrl: '/images/new1.png', // Studio look
    rotate: '-rotate-2' 
  },
   { 
    id: 2, 
    caption: 'Two completely separate worlds perfectly blending into a formidable oneness.', 
    imageUrl: '/images/new1 (1).png', // Leaning on his chest in the white lace dress
    rotate: '-rotate-2' 
  },
  { 
    id: 3, 
    caption: 'When you realize you found the person you can be completely unhinged and loud with forever.', 
    imageUrl: '/images/new1 (2).png', // B&W wild laughing/back-hug
    rotate: 'rotate-2' 
  },
  { 
    id: 4, 
    caption: 'Riding through life’s unexpected storms and turns like an absolute power couple.', 
    imageUrl: '/images/new1 (3).png', // Wedding dress on the superbike
    rotate: '-rotate-1' 
  },
  { 
    id: 5, 
    caption: 'Brick by brick, dream by dream, and dynamic dimples all the way!', 
    imageUrl: '/images/new1 (4).png', // Posing in front of balloons
    rotate: 'rotate-1' 
  },
  { 
    id: 6, 
    caption: 'Two completely separate worlds perfectly blending into a formidable oneness.', 
    imageUrl: '/images/new1 (5).png', // Leaning on his chest in the white lace dress
    rotate: '-rotate-2' 
  },
  { 
    id: 7, 
    caption: 'Two completely separate worlds perfectly blending into a formidable oneness.', 
    imageUrl: '/images/new1 (6).png', // Leaning on his chest in the white lace dress
    rotate: '-rotate-1  ' 
  },
  { 
    id: 8, 
    caption: 'Two completely separate worlds perfectly blending into a formidable oneness.', 
    imageUrl: '/images/new1 (7).png', // Leaning on his chest in the white lace dress
    rotate: '-rotate-2' 
  },
   { 
    id: 9, 
    caption: 'Two completely separate worlds perfectly blending into a formidable oneness.', 
    imageUrl: '/images/WhatsApp Image 2026-06-15 at 8.30.48 AM.jpeg', // Leaning on his chest in the white lace dress
    rotate: '-rotate-2' 
  },
]

export default function Memes() {
  return (
    <div className="px-6 md:px-16 pt-12 md:pt-16 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral mb-4">
        Memes & Memories
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">The Relationship Board</h1>
      <p className="text-ink/60 max-w-md mb-12">
       Please note that the memes here might be slightly exagerrataed and I do not wish to chop regiment😭. They are not meant to be taken too seriously, but rather to celebrate with joy and humor in our Pastor's relationship. 
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleMemes.map((meme) => (
          <div
            key={meme.id}
            className={`${meme.rotate} bg-white border border-ink/10 rounded-2xl p-4 shadow-sm hover:rotate-0 hover:shadow-md transition-all flex flex-col`}
          >
            {/* Swapped placeholder box with a real img tag */}
            <div className="aspect-square w-full rounded-xl bg-paper border border-ink/5 overflow-hidden mb-4">
              <img 
                src={meme.imageUrl} 
                alt={meme.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if the image hasn't been placed in the public folder yet
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback indicator text if image doesn't load */}
              <div className="w-full h-full flex items-center justify-center bg-paper text-ink/30 font-mono text-xs p-4 text-center">
                [Image: Map to public folder]
              </div>
            </div>
            <p className="text-sm font-medium text-ink/80 leading-relaxed mt-auto">{meme.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}