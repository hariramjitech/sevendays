import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Journey from './pages/Journey';
import MusicPlayer from './components/MusicPlayer';
import GoldenDust from './components/GoldenDust';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full relative overflow-hidden bg-midnight-900 text-parchment-100">
        {/* Global Music Player */}
        <MusicPlayer />

        {/* Golden Dust Effects */}
        <GoldenDust />

        {/* Background Image Container */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
          style={{
            backgroundImage: "url('/bg.png')",
            filter: "sepia(0.5) contrast(1.2)"
          }}
        ></div>

        {/* Overlay for Texture */}
        <div className="fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        {/* Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<Journey />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
