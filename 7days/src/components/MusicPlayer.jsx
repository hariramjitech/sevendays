import { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        // Attempt autoplay on mount
        const playAudio = async () => {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                setShowPrompt(false);
            } catch (err) {
                console.log("Autoplay blocked, waiting for interaction");
                setShowPrompt(true);
            }
        };
        playAudio();

        // Add specific interaction listener for document to start audio if blocked
        const handleInteraction = () => {
            if (audioRef.current && !isPlaying) { // check if not playing
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setShowPrompt(false);
                }).catch(() => { });
            }
        };

        document.addEventListener('click', handleInteraction, { once: true });
        return () => document.removeEventListener('click', handleInteraction);
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
        }
        setIsPlaying(!isPlaying);
        setShowPrompt(false);
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-4">
            <audio ref={audioRef} loop>
                <source src="/love-theme.mp3" type="audio/mpeg" />
                {/* Fallback to online source if local missing */}
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            </audio>

            <AnimatePresence>
                {showPrompt && !isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-blood-900/90 text-gold-300 text-xs px-3 py-1.5 rounded-full border border-gold-500/30 whitespace-nowrap hidden md:block"
                    >
                        Tap anywhere for music 🎵
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className={`p-3 backdrop-blur-md border border-gold-500 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center group overflow-hidden relative transition-colors duration-300 ${isPlaying ? 'bg-blood-900/80 text-gold-300' : 'bg-slate-900/80 text-slate-400'}`}
            >
                {/* Pulse effect when not playing to attract attention */}
                {!isPlaying && (
                    <div className="absolute inset-0 bg-gold-400/20 rounded-full animate-ping"></div>
                )}

                {isPlaying ? (
                    <div className="flex items-center gap-1">
                        <div className="h-3 w-1 bg-gold-400 animate-[bounce_1s_infinite]"></div>
                        <div className="h-5 w-1 bg-gold-400 animate-[bounce_1.2s_infinite]"></div>
                        <div className="h-3 w-1 bg-gold-400 animate-[bounce_0.8s_infinite]"></div>
                    </div>
                ) : (
                    <Volume2 className="w-5 h-5 fill-current" />
                )}
            </motion.button>
        </div>
    );
};

export default MusicPlayer;
