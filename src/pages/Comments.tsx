import { useState, FormEvent, ChangeEvent } from 'react'

type Comment = {
  id: number
  name: string
  body: any // Keeps your custom HTML layout for pre-written comments intact
  avatarUrl?: string 
}

const initialComments: Comment[] = [
  { 
    id: 1, 
    name: 'Uche Okolo', 
    body: <div>
      <p>Happy wedding anniversary P.Pally.</p>
      <p>I am grateful to God for the gift you are to my family. You have exemplified a true father to me, your union has taught me that you can get it right in your marriage. Thank you so much Dad for being a great template for us. We see and mummy, we see possibilities of a blessed and sweet union. Thank you Sir and Ma. God bless you. </p>
    </div>, 
    avatarUrl: '/images/uche.jpg' 
  },
  { 
    id: 2, 
    name: 'Marvellous', 
    body: <div>
      <p>Dear Pastors,</p>
      <p>Happy Happy Anniversary,</p>
      <p>Aside my parents marriage, you were the first Christian marriage I saw, I saw how mummy honoured Pastor and how Pastor adore his wife.</p>
      <p>I saw a marriage worthy of emulation. I saw how you raised the Stella Grace and David Noel, so beautiful...</p>
      <p>I have learnt lessons and wisdom that I have applied and still applying in my own home.</p>
      <p>Happy Anniversary Pst Gbolagbo and Pst Opeyemi Olarewaju</p>
    </div>, 
    avatarUrl: '/images/marvy.jpg' 
  },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Keeps track of which image URL is currently popped open
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !body.trim()) return

    let previewUrl = ''
    if (imageFile) {
      previewUrl = URL.createObjectURL(imageFile)
    }

    const newComment: Comment = {
      id: Date.now(), 
      name: name.trim(),
      body: body.trim(),
      avatarUrl: previewUrl || undefined
    }

    setComments((prev) => [newComment, ...prev])
    
    setName('')
    setBody('')
    setImageFile(null)
    
    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  return (
    <div className="px-6 md:px-16 pt-12 md:pt-16 pb-24 relative">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral mb-4">
        Guestbook & Wishes
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Leave a Message</h1>
      <p className="text-ink/60 max-w-md mb-12">
        Send your congratulations, advice, or favorite memories to the beautiful couple!
      </p>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="max-w-xl border-b border-ink/10 pb-12 mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint mb-4">
          Add a comment
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full mb-3 px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/40"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Say something nice..."
          rows={3}
          required
          className="w-full mb-3 px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-coral/40"
        />

        {/* Local Picture Selector */}
        <div className="mb-5">
          <label className="block text-xs font-mono uppercase text-ink/50 mb-2">
            Upload Profile Picture (Optional)
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-paper file:text-ink/70 hover:file:bg-ink/5 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-charcoal text-paper font-medium text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-ink transition-colors"
        >
          Post comment
        </button>
      </form>

      {/* Live Comments List */}
      <div className="max-w-xl flex flex-col gap-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 items-start">
            {comment.avatarUrl ? (
              // 💡 FIXED: Added onClick listener and cursor pointer classes here
              <img 
                src={comment.avatarUrl} 
                alt={comment.name} 
                onClick={() => setActiveModalImage(comment.avatarUrl || null)}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-ink/10 cursor-zoom-in hover:opacity-85 transition-opacity"
                title="Click to view picture"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-coral text-charcoal font-bold text-xs flex items-center justify-center flex-shrink-0">
                {initials(comment.name)}
              </div>
            )}
            
            <div className="bg-white border border-ink/10 rounded-2xl rounded-tl-sm px-4 py-3 flex-1 shadow-sm">
              <p className="font-medium text-sm mb-1">{comment.name}</p>
              {/* 💡 FIXED: Changed this container from <p> to <div> so your multi-paragraph comments display safely without breaking layout code */}
              <div className="text-ink/70 text-sm leading-relaxed space-y-2">
                {comment.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay Modal */}
      {activeModalImage && (
        <div 
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 cursor-zoom-out"
        >
          <div className="relative max-w-xl max-h-[80vh] bg-white p-2 rounded-2xl shadow-2xl overflow-hidden">
            <img 
              src={activeModalImage} 
              alt="Enlarged profile view" 
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            <button 
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white font-sans text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}