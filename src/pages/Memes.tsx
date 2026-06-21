const sampleMemes = [
  { 
    id: 1, 
    caption: 'Day 1 of x, x= infinity', 
    imageUrl: '/images/pgpo1.png', // Studio look
    rotate: '-rotate-2' 
  },
   { 
    id: 2, 
    caption: 'It is not a picture of Pastor without the thumbs up 😂', 
    imageUrl: '/images/pgpo2.png', // Leaning on his chest in the white lace dress
    rotate: '-rotate-2' 
  },
  { 
    id: 3, 
    caption: 'God whennnnnn😂', 
    imageUrl: '/images/pgpo3.png', // B&W wild laughing/back-hug
    rotate: 'rotate-2' 
  },
  { 
    id: 4, 
    caption: 'Hot boyy with his babe😍', 
    imageUrl: '/images/pgpo4.png', // Wedding dress on the superbike
    rotate: '-rotate-1' 
  },
  { 
    id: 5, 
    caption: '🥰🥰', 
    imageUrl: '/images/pgpo5.png', // Posing in front of balloons
    rotate: 'rotate-1' 
  },
  { 
    id: 6, 
    caption: 'Humble beginnings🙃', 
    imageUrl: '/images/pgpo6.png', // Leaning on his chest in the white lace dress
    rotate: '-rotate-2' 
  },
  { 
    id: 7, 
    caption: 'I will not let you go unless you bless me?😭', 
    imageUrl: '/images/pgpo7.jpeg', // Leaning on his chest in the white lace dress
    rotate: '-rotate-1  ' 
  },
  { 
    id: 8, 
    caption: 'Look into my eyes and tell me what you see?🥺😂', 
    imageUrl: '/images/pgpo8.jpeg', // Leaning on his chest in the white lace dress
    rotate: '-rotate-2' 
  },
   { 
    id: 9, 
    caption: 'No thumbs up here ke😭😂', 
    imageUrl: '/images/pgpo9.jpeg', // Leaning on his chest in the white lace dress
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
       Please note that the captions here might be slightly exagerrataed and I do not wish to chop regiment😭. They are not meant to be taken too seriously, but rather to celebrate with joy and humor in our Pastor's relationship. 
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