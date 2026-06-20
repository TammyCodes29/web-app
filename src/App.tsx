import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Memes from './pages/Memes'
import Comments from './pages/Comments'

function App() {
  return (
    <div className="min-h-screen bg-paper font-body text-ink">
      <Sidebar />
      <main className="md:ml-60 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memes" element={<Memes />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
