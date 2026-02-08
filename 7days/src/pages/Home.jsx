import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Heart, Stars, Mail } from 'lucide-react';
import Fireflies from '../components/Fireflies';
import TypewriterEffect from '../components/TypewriterEffect';
import PromiseRotator from '../components/PromiseRotator';
import LoveLetterModal from '../components/LoveLetterModal';

const Home = () => {
    const navigate = useNavigate();
    const [isLetterOpen, setIsLetterOpen] = useState(false);

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-y-auto overflow-x-hidden text-center bg-transparent">
            <Fireflies />

            <LoveLetterModal isOpen={isLetterOpen} onClose={() => setIsLetterOpen(false)} />

            {/* Decorative Border/Frame */}
            <div className="fixed inset-4 border-2 border-gold-500/30 rounded-lg pointer-events-none md:inset-8 z-20"></div>
            <div className="fixed inset-6 border border-gold-500/10 rounded-lg pointer-events-none z-20"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="z-10 max-w-4xl mx-auto flex flex-col items-center w-full justify-center gap-3 md:gap-5 py-8 md:py-0"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="space-y-2 mt-4 md:mt-0"
                >
                    <motion.h1
                        animate={{
                            textShadow: [
                                "0 0 10px rgba(212,175,55,0.3)",
                                "0 0 20px rgba(212,175,55,0.6)",
                                "0 0 10px rgba(212,175,55,0.3)"
                            ],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-5xl md:text-7xl font-medieval bg-clip-text text-transparent bg-gradient-to-b from-alt-gold via-gold-500 to-blood-700 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-widest uppercase mb-1"
                        style={{ backgroundImage: 'linear-gradient(to bottom, #f3e5ab, #d4af37, #8a1c1c)' }}
                    >
                        Harsha
                    </motion.h1>
                    <p className="text-lg md:text-xl font-handwritten text-gold-300 tracking-wide">
                        My Eternal Valentine
                    </p>
                </motion.div>

                <motion.div
                    className="glass-panel-medieval p-5 md:p-6 rounded-xl max-w-3xl mx-auto relative overflow-hidden group w-full border-2 border-gold-500/30 shadow-[0_0_50px_rgba(138,28,28,0.2)] flex flex-col justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.5 }}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>

                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-blood-500 mx-auto mb-4 animate-pulse" fill="currentColor" />

                    <div className="text-lg md:text-2xl font-scroll text-parchment-100 leading-relaxed italic relative z-10 min-h-[100px] flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        <TypewriterEffect
                            text="&quot;Even with miles between our hands, our hearts beat together. In this little digital world, I’ve made a place just for you—a space filled with my love, where every detail carries my promise and every moment waits for the day distance fades and I finally hold you.&quot;"
                            speed={20}
                            delay={200}
                        />
                    </div>

                    {/* Promises Section */}
                    <div className="mt-4 pt-4 border-t border-gold-500/20">
                        <PromiseRotator />
                    </div>

                    {/* Open Letter Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsLetterOpen(true)}
                        className="mt-4 flex items-center gap-2 mx-auto text-gold-400 hover:text-gold-200 font-medieval text-sm uppercase tracking-widest transition-colors"
                    >
                        <Mail size={16} /> Read My Full Letter
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mb-4"
                >
                    <button
                        onClick={() => navigate('/journey')}
                        className="group relative px-8 py-3 bg-blood-900 border-2 border-gold-500 text-gold-100 font-medieval text-lg md:text-xl tracking-widest uppercase rounded-lg cursor-pointer overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(138,28,28,0.6)]"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                        <span className="relative z-10 flex items-center gap-4">
                            <Stars className="w-5 h-5 text-gold-300 animate-spin-slow" />
                            Enter Our Realm
                            <Stars className="w-5 h-5 text-gold-300 animate-spin-slow" />
                        </span>

                        <div className="absolute inset-0 bg-gold-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
                    </button>
                    <p className="mt-2 text-parchment-400 font-mono text-[10px] tracking-widest uppercase opacity-60">
                        A Journey from Feb 7 to Feb 14
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;
