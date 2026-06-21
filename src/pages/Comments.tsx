import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { db, storage } from '../firebase'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

type Comment = {
  id: string
  name: string
  body: string
  avatarUrl?: string
  createdAt: any
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null)

  // 📡 LIVE STREAM: Listen to Firestore collection updates in real-time
  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[]
      
      setComments(fetchedComments)
    })

    return () => unsubscribe() // Clean up listener on unmount
  }, [])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !body.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      let finalAvatarUrl = ''

      // 1. If an image file exists, upload it directly to Firebase Storage
      if (imageFile) {
        const storageRef = ref(storage, `avatars/${Date.now()}_${imageFile.name}`)
        await uploadBytes(storageRef, imageFile)
        finalAvatarUrl = await getDownloadURL(storageRef)
      }

      // 2. Save the complete comment data block to Firestore
      await addDoc(collection(db, 'comments'), {
        name: name.trim(),
        body: body.trim(),
        avatarUrl: finalAvatarUrl || null,
        createdAt: new Date()
      })

      // Clear Form Fields on Success
      setName('')
      setBody('')
      setImageFile(null)
      const fileInput = document.getElementById('avatar-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error) {
      console.error('Error saving comment:', error)
      alert('Something went wrong saving your comment. Check your browser console.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="px-6 md:px-16 pt-12 md:pt-16 pb-24 relative">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral mb-4">
        Guestbook & Wishes
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Leave a Message</h1>
      <p className="text-ink/60 max-w-md mb-12">
        Send your congratulations, advice, or favorite memories to our Pastors
      </p>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="max-w-xl border-b border-ink/10 pb-12 mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint mb-4">
          Add a comment
        </p>
        <input
          value={name}
          disabled={isSubmitting}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full mb-3 px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 disabled:opacity-50"
        />
        <textarea
          value={body}
          disabled={isSubmitting}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Say something nice..."
          rows={4}
          required
          className="w-full mb-3 px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-coral/40 disabled:opacity-50"
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
            disabled={isSubmitting}
            onChange={handleImageChange}
            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-paper file:text-ink/70 hover:file:bg-ink/5 cursor-pointer disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-charcoal text-paper font-medium text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-ink transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post comment'}
        </button>
      </form>

      {/* Live Cloud Comments List */}
      <div className="max-w-xl flex flex-col gap-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 items-start animate-fade-in">
            {comment.avatarUrl ? (
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
              {/* whitespace-pre-line beautifully layouts paragraphs written into the textarea */}
              <div className="text-ink/70 text-sm leading-relaxed whitespace-pre-line">
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