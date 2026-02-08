import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, ChevronLeft, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Fireflies from '../components/Fireflies';
import confetti from 'canvas-confetti';
import ZoomableImage from '../components/ZoomableImage';

const days = [
    {
        id: 1, date: '2026-02-07', title: 'Rose Day', icon: '🌹', desc: 'The bloom of our beginning.',
        quote: "Like a rose in a castle garden, my love for you grows wild and beautiful, protected by the walls of my devotion."
    },
    {
        id: 2, date: '2026-02-08', title: 'Propose Day', icon: '💍', desc: 'A question asked to the stars.',
        quote: "If I had a lifetime of choices, I would choose you in every single one. Will you be mine, today and forever?"
    },
    {
        id: 3, date: '2026-02-09', title: 'Chocolate Day', icon: '🍫', desc: 'Sweetness amidst distance.',
        quote: "Life can be bitter without you close, but the memory of your smile is sweeter than any confection."
    },
    {
        id: 4, date: '2026-02-10', title: 'Teddy Day', icon: '🧸', desc: 'A guardian for your dreams.',
        quote: "Sending you a hug in spirit, soft and warm, to hold you when I cannot."
    },
    {
        id: 5, date: '2026-02-11', title: 'Promise Day', icon: '🤝', desc: 'Vows etched in eternity.',
        quote: "I promise to be your knight, your safe harbor, and your biggest fan, no matter how many miles lie between us."
    },
    {
        id: 6, date: '2026-02-12', title: 'Hug Day', icon: '🤗', desc: 'The warmth I yearn to give.',
        quote: "Close your eyes and feel my arms around you. The distance is only physical; our souls are already embracing."
    },
    {
        id: 7, date: '2026-02-13', title: 'Kiss Day', icon: '💋', desc: 'A seal upon our love.',
        quote: "A kiss is a secret told to the mouth instead of the ear; kisses are the messengers of love and tenderness."
    },
    {
        id: 8, date: '2026-02-14', title: 'Valentine\'s Day', icon: '❤️', desc: 'The Grand Celebration.',
        quote: "My Wife, My Life, My Valentine. You are the queen of my heart, today and for all the ages to come. I love you."
    }
];

const Journey = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(null);
    const [unlockedDays, setUnlockedDays] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isAccepted, setIsAccepted] = useState(false);
    const [showFinalLetter, setShowFinalLetter] = useState(false);

    useEffect(() => {
        const checkUnlock = () => {
            const today = new Date(); // Normal Mode
            // FOR DEBUGGING ONLY: Uncomment to test all unlocked
            // const today = new Date('2026-02-15'); // Debug Mode: Unlock All 

            const unlocked = [];
            const timers = {};

            days.forEach(day => {
                // Parse date string (YYYY-MM-DD) to ensure local midnight unlock
                const [year, month, dayDate] = day.date.split('-').map(Number);
                const unlockDate = new Date(year, month - 1, dayDate, 0, 0, 0); // Local Midnight

                if (today >= unlockDate) {
                    unlocked.push(day.id);
                } else {
                    const diff = unlockDate - today;
                    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
                    const secondsLeft = Math.floor((diff / 1000) % 60);
                    timers[day.id] = { days: daysLeft, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft };
                }
            });
            setUnlockedDays(unlocked);
            setTimeLeft(timers);
        };

        checkUnlock();
        const interval = setInterval(checkUnlock, 1000); // Check every second for live effect
        return () => {
            clearInterval(interval);
            if (window.confettiInterval) clearInterval(window.confettiInterval);
            confetti.reset();
        };
    }, []);

    const handleCardClick = (day) => {
        if (unlockedDays.includes(day.id)) {
            setSelectedDay(day);
            if (day.id === 8) { // Valentine's Special - Initial "Small Blast"
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };
                const randomInRange = (min, max) => Math.random() * (max - min) + min;

                const interval = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) return clearInterval(interval);

                    const particleCount = 50 * (timeLeft / duration);
                    // Gold and Red mixture for the card opening
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#d4af37', '#8a1c1c'] });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#d4af37', '#8a1c1c'] });
                }, 250);
            } else {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    colors: ['#d4af37', '#f3e5ab', '#8a1c1c'],
                    origin: { y: 0.6 }
                });
            }
        }
    };

    return (
        <div className="min-h-screen p-6 relative overflow-y-auto overflow-x-hidden flex flex-col items-center bg-midnight-900">
            <Fireflies />

            {/* Background Overlay */}
            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-10 pointer-events-none mix-blend-overlay z-0"></div>

            <button
                onClick={() => navigate('/')}
                className="self-start mb-8 text-gold-500 hover:text-gold-300 flex items-center gap-2 font-medieval transition-colors z-20 group"
            >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="border-b border-transparent group-hover:border-gold-300">Return to Castle</span>
            </button>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-5xl md:text-7xl font-medieval text-gold-500 mb-4 text-glow">
                    The Seven Realms
                </h2>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-blood-500 to-transparent"></div>
                <p className="mt-4 text-parchment-400 font-scroll italic">
                    Open one scroll each day to reveal my heart.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full pb-20 z-10">
                {days.map((day, index) => {
                    const isUnlocked = unlockedDays.includes(day.id);
                    const isValentine = day.id === 8;
                    return (
                        <motion.div
                            key={day.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleCardClick(day)}
                            className={`
                                relative aspect-[3/4] rounded-lg group cursor-pointer perspective-1000
                                ${isUnlocked ? 'hover:-translate-y-2' : ''}
                                transition-all duration-500
                                ${isValentine ? 'col-span-1 sm:col-span-2 lg:col-span-4 aspect-auto h-64 lg:h-80' : ''}
                            `}
                        >
                            {/* Card Content */}
                            <div className={`
                                absolute inset-0 border-2 
                                ${isUnlocked
                                    ? isValentine ? 'border-blood-500 bg-blood-900/40' : 'border-gold-500/50 bg-black/60'
                                    : 'border-slate-800 bg-slate-900/80'}
                                backdrop-blur-md flex flex-col items-center justify-center p-6 text-center
                                shadow-[0_0_30px_rgba(0,0,0,0.5)]
                                ${isUnlocked ? 'group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] group-hover:border-gold-400' : ''}
                                transition-all duration-300
                            `}>
                                {/* Corner Fancy Bits */}
                                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold-700/50"></div>
                                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold-700/50"></div>
                                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-700/50"></div>
                                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-700/50"></div>

                                {isUnlocked ? (
                                    <>
                                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                                            {isValentine ? <Heart className="w-20 h-20 text-blood-500 fill-blood-500 animate-pulse" /> : <div className="text-6xl">{day.icon}</div>}
                                        </div>
                                        <h3 className={`font-medieval text-gold-300 mb-2 ${isValentine ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>{day.title}</h3>
                                        <div className="h-px w-12 bg-gold-700/50 my-3"></div>
                                        <p className="text-parchment-300 font-scroll text-sm md:text-base italic max-w-xs">{day.desc}</p>
                                        <span className="mt-4 text-xs font-medieval text-gold-600 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                            Click to Reveal
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-10 h-10 text-slate-700 mb-4 opacity-70" />
                                        <h3 className="text-xl font-medieval text-slate-500 mb-4">Awaiting the Stars</h3>
                                        <div className="text-gold-500/80 font-mono text-sm tracking-widest flex flex-col gap-1">
                                            {timeLeft[day.id] ? (
                                                <>
                                                    <span className="text-xs uppercase text-slate-600">Unlocks In</span>
                                                    <span className="font-bold text-lg">
                                                        {timeLeft[day.id].days}d {String(timeLeft[day.id].hours).padStart(2, '0')}h {String(timeLeft[day.id].minutes).padStart(2, '0')}m <span className="text-blood-500">{String(timeLeft[day.id].seconds).padStart(2, '0')}s</span>
                                                    </span>
                                                </>
                                            ) : (
                                                `Opens ${new Date(day.date).toLocaleDateString()}`
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded Modal View */}
            <AnimatePresence>
                {selectedDay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                        onClick={() => {
                            setSelectedDay(null);
                            setIsAccepted(false);
                            setShowFinalLetter(false);
                            confetti.reset();
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            className="relative w-full max-w-[95vw] h-[85vh] md:h-[95vh] flex flex-col md:flex-row bg-parchment-200 rounded-lg shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden border-4 border-double border-gold-700"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => {
                                    setSelectedDay(null);
                                    setIsAccepted(false);
                                    setShowFinalLetter(false);
                                    confetti.reset();
                                }}
                                className="absolute top-4 right-4 z-50 text-blood-900 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-2 transition-colors shadow-lg"
                            >
                                <X size={32} />
                            </button>

                            {/* Image Section - Advanced Zoom */}
                            <div className="w-full md:w-[60%] h-[40vh] md:h-full bg-black/90 relative group border-b-4 md:border-b-0 md:border-r-4 border-gold-700 overflow-hidden flex-shrink-0">
                                <ZoomableImage
                                    src={`/posters/${String(new Date(selectedDay.date).getDate()).padStart(2, '0')}.jpg`}
                                    alt={selectedDay.title}
                                    className="w-full h-full"
                                />

                                {/* Overlay Gradient - Fades out on interaction via ZoomableImage logic mostly, but keep simple overlay if needed or remove if ZoomableImage has its own. 
                                    Actually ZoomableImage covers the image. Let's place UI elements on top manually. 
                                */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0"></div>

                                {/* Premium Download Button */}
                                <a
                                    href={`/posters/${String(new Date(selectedDay.date).getDate()).padStart(2, '0')}.jpg`}
                                    download={`${selectedDay.title}-Poster.jpg`}
                                    className="absolute bottom-6 right-6 z-50 group/btn"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="relative flex items-center justify-center w-14 h-14 bg-blood-600 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] border-2 border-gold-500 transition-transform group-hover/btn:scale-110">
                                        <div className="absolute inset-0 rounded-full border border-dashed border-gold-300 opacity-50 animate-spin-slow"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-200"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                    </div>
                                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-gold-300 text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap border border-gold-500/30">
                                        Keep Forever
                                    </span>
                                </a>

                                {selectedDay.id === 8 && null}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-[40%] p-6 md:p-10 flex flex-col justify-center items-center text-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] overflow-y-auto relative">
                                <span className="font-medieval text-gold-700 text-lg uppercase tracking-widest mb-4">
                                    {new Date(selectedDay.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </span>

                                <h3 className="text-4xl md:text-5xl font-medieval text-blood-900 mb-8 drop-shadow-sm">
                                    {selectedDay.title}
                                </h3>

                                <div className="mb-8 relative px-4">
                                    <div className="absolute -top-8 -left-2 text-7xl text-gold-500/20 font-serif">"</div>
                                    <p className="font-scroll text-2xl md:text-4xl text-slate-800 leading-relaxed z-10 relative italic drop-shadow-md">
                                        {selectedDay.quote}
                                    </p>
                                    <div className="absolute -bottom-12 -right-2 text-7xl text-gold-500/20 font-serif rotate-180">"</div>
                                </div>

                                {selectedDay.id === 8 ? (
                                    <div className="mt-8 pt-8 border-t border-gold-700/30 w-full animate-in fade-in zoom-in duration-1000">
                                        {!isAccepted ? (
                                            <>
                                                <p className="font-medieval text-3xl text-blood-800 mb-6 drop-shadow-md">Will you be my Valentine?</p>
                                                <div className="flex gap-4 justify-center">
                                                    <button
                                                        className="bg-blood-600 text-gold-100 px-10 py-4 rounded-full font-medieval text-2xl hover:bg-blood-700 transition shadow-[0_0_15px_rgba(138,28,28,0.5)] transform hover:scale-110 active:scale-95"
                                                        onClick={() => {
                                                            setIsAccepted(true);

                                                            // Immediate Heart Burst
                                                            const heartBurst = () => {
                                                                confetti({
                                                                    particleCount: 30,
                                                                    spread: 70,
                                                                    origin: { y: 0.6 },
                                                                    colors: ['#ff0000', '#d4af37', '#e91e63'],
                                                                    shapes: ['heart'],
                                                                    zIndex: 200
                                                                });
                                                            };
                                                            heartBurst();
                                                            setTimeout(heartBurst, 300);
                                                            setTimeout(heartBurst, 600);

                                                            // Start Continuous Celebration (Gold Ribbons & Stars)
                                                            const duration = 60 * 60 * 1000; // Run for an hour (effectively forever until closed)
                                                            const animationEnd = Date.now() + duration;
                                                            const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 200 };
                                                            const randomInRange = (min, max) => Math.random() * (max - min) + min;

                                                            // Store interval ID on window to clear it later if needed, 
                                                            // though confetti.reset() usually kills the canvas, the interval keeps firing.
                                                            // Better: Check a global flag or rely on component unmount? 
                                                            // Since we clear confetti.reset() on close, the canvas clears, but new confetti might spawn.
                                                            // We need to stop the interval.

                                                            if (window.confettiInterval) clearInterval(window.confettiInterval);

                                                            window.confettiInterval = setInterval(function () {
                                                                const timeLeft = animationEnd - Date.now();
                                                                if (timeLeft <= 0) return clearInterval(window.confettiInterval);

                                                                const particleCount = 40;
                                                                // Left blasting
                                                                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.2), y: Math.random() - 0.2 }, colors: ['#ffd700', '#ff0000', '#ffffff'] });
                                                                // Right blasting
                                                                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.8, 0.9), y: Math.random() - 0.2 }, colors: ['#ffd700', '#ff0000', '#ffffff'] });
                                                            }, 400);

                                                            setTimeout(() => setShowFinalLetter(true), 3000);
                                                        }}
                                                    >
                                                        YES! ❤️
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            !showFinalLetter && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    className="flex flex-col items-center p-6"
                                                >
                                                    {/* Creative Heart Stroke Loader */}
                                                    <div className="relative w-32 h-32 mb-6">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                                            <motion.path
                                                                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                                                                stroke="#dc2626"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                initial={{ pathLength: 0, fill: "rgba(220, 38, 38, 0)" }}
                                                                animate={{
                                                                    pathLength: 1,
                                                                    fill: "rgba(220, 38, 38, 1)"
                                                                }}
                                                                transition={{
                                                                    pathLength: { duration: 2, ease: "easeInOut" },
                                                                    fill: { delay: 2, duration: 0.5 }
                                                                }}
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-4xl font-medieval text-blood-800 mb-2 drop-shadow-sm animate-pulse">Unlocking Forever...</h4>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="mt-8 pt-8 border-t border-gold-700/30 w-full">
                                        <p className="font-handwritten text-4xl text-blood-700 transform -rotate-2">
                                            Yours Forever, Hari
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final Vintage Letter Modal - Clean Textured Paper */}
            <AnimatePresence>
                {showFinalLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative h-[85vh] aspect-[210/297] bg-[#eaddcf] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
                            style={{
                                backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
                            }}
                        >
                            {/* Inner Border for elegance */}
                            <div className="absolute inset-3 border-2 border-stone-800/20 rounded-sm pointer-events-none"></div>

                            {/* Paper Texture Overlay for depth */}
                            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

                            {/* Content Section */}
                            <div className="relative z-10 p-8 md:p-12 text-center h-full flex flex-col justify-between items-center">
                                <div className="mt-4 md:mt-8">
                                    <h2 className="font-medieval text-4xl md:text-5xl text-stone-900 mb-8 drop-shadow-sm inline-block border-b-2 border-stone-800/20 pb-4">
                                        My Dearest Harsha
                                    </h2>

                                    <div className="font-handwritten text-xl md:text-2xl text-stone-950 leading-loose space-y-6 text-left font-medium px-4 md:px-8">
                                        <p>
                                            You are the deepest love I have ever known. I love you the most—more than the stars love the night sky, more than words could ever hold.
                                        </p>
                                        <p className="font-bold text-stone-800 text-center text-2xl md:text-3xl py-4">
                                            You are my first and my last.
                                        </p>
                                        <p>
                                            There is no one else I could ever love this much. You are my beginning, my forever, and my every moment in between. Thank you for being mine.
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8 md:mb-12 flex flex-col items-center justify-center gap-4 w-full">
                                    <div className="text-right w-full pr-8 md:pr-12">
                                        <p className="font-handwritten text-3xl md:text-4xl text-stone-900 opacity-90 transform -rotate-1">
                                            Yours Eternally,
                                        </p>
                                        <p className="font-handwritten text-5xl md:text-6xl text-stone-950 mt-2 transform -rotate-2 inline-block font-bold">Hari <span className="text-3xl md:text-4xl ml-2">(bubu)</span></p>
                                    </div>

                                    {/* Return Home Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            if (window.confettiInterval) clearInterval(window.confettiInterval);
                                            confetti.reset();
                                            navigate('/');
                                        }}
                                        className="mt-2 text-blood-800/80 hover:text-blood-900 transition-colors"
                                        title="Return Home"
                                    >
                                        <Heart className="w-10 h-10 fill-current animate-pulse drop-shadow-sm" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Journey;
