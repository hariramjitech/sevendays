import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import confetti from 'canvas-confetti';

const days = [
    { id: 1, date: '2026-02-07', title: 'Rose Day', icon: '🌹', color: 'from-red-400 to-rose-500', message: "A rose for the most beautiful flower in my life." },
    { id: 2, date: '2026-02-08', title: 'Propose Day', icon: '💍', color: 'from-orange-400 to-amber-500', message: "Assuming I could propose a thousand times, I'd say yes to you every time." },
    { id: 3, date: '2026-02-09', title: 'Chocolate Day', icon: '🍫', color: 'from-amber-700 to-orange-800', message: "Example Message for Day 3" },
    { id: 4, date: '2026-02-10', title: 'Teddy Day', icon: '🧸', color: 'from-pink-400 to-rose-400', message: "Example Message for Day 4" },
    { id: 5, date: '2026-02-11', title: 'Promise Day', icon: '🤝', color: 'from-blue-400 to-indigo-500', message: "Example Message for Day 5" },
    { id: 6, date: '2026-02-12', title: 'Hug Day', icon: '🤗', color: 'from-teal-400 to-emerald-500', message: "Example Message for Day 6" },
    { id: 7, date: '2026-02-13', title: 'Kiss Day', icon: '💋', color: 'from-fuchsia-400 to-purple-500', message: "Example Message for Day 7" },
    // Optional: { id: 8, date: '2026-02-14', title: 'Valentine\'s Day', icon: '❤️', color: 'from-red-600 to-rose-700' }
];

const Journey = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(null);
    const [unlockedDays, setUnlockedDays] = useState([]);

    // Check dates on mount
    useEffect(() => {
        const today = new Date(); // Use real date
        // const today = new Date('2026-02-14'); // Uncomment for debugging/testing

        const unlocked = days.filter(day => {
            const unlockDate = new Date(day.date);
            // Allow unlocking if today is same or after unlockDate
            return today >= unlockDate;
        }).map(d => d.id);

        setUnlockedDays(unlocked);
    }, []);

    const handleCardClick = (day) => {
        if (unlockedDays.includes(day.id)) {
            setSelectedDay(day);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#fb7185', '#f43f5e', '#ffffff'] // Rose colors
            });
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-rose-50/50 relative overflow-hidden">
            <FloatingHearts />

            <div className="relative z-10 max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center text-rose-700 hover:text-rose-900 transition-colors font-serif italic"
                >
                    <ArrowLeft className="w-5 h-5 mr-1" /> Back to Home
                </button>

                <h2 className="text-4xl md:text-5xl font-serif text-center text-rose-800 mb-12 drop-shadow-sm">
                    7 Days of Love
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {days.map((day, index) => {
                        const isUnlocked = unlockedDays.includes(day.id);
                        return (
                            <motion.div
                                key={day.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleCardClick(day)}
                                whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                                className={`
                                    relative h-64 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg overflow-hidden border border-white/40
                                    ${isUnlocked ? 'bg-white/80 backdrop-blur-sm' : 'bg-gray-200/50 backdrop-blur-sm opacity-80'}
                                    transition-all duration-300
                                `}
                            >
                                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${day.color}`}></div>

                                {isUnlocked ? (
                                    <>
                                        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{day.icon}</div>
                                        <h3 className="text-2xl font-serif text-gray-800 mb-2">{day.title}</h3>
                                        <p className="text-rose-600 font-medium text-sm mt-auto">Tap to Open</p>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-12 h-12 text-gray-400 mb-4" />
                                        <h3 className="text-xl font-serif text-gray-500 mb-2">{day.title}</h3>
                                        <p className="text-gray-400 text-xs mt-auto">Unlocks on {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Modal for Day Content */}
            <AnimatePresence>
                {selectedDay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedDay(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-3xl p-2 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedDay(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-black/10 flex items-center justify-center backdrop-blur-sm transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-700" />
                            </button>

                            <div className="flex flex-col h-full bg-rose-50 rounded-2xl overflow-hidden">
                                {/* Image Placeholder -  User will add posters here */}
                                <div className="h-64 sm:h-80 bg-rose-200 relative group overflow-hidden">
                                    <img
                                        src={`/posters/day${selectedDay.id}.jpg`}
                                        alt={selectedDay.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/600x800/pink/white?text=Poster+" + selectedDay.id;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                                        <h2 className="text-3xl font-serif text-white font-bold">{selectedDay.title}</h2>
                                    </div>
                                </div>

                                <div className="p-8 text-center space-y-6">
                                    <div className="w-16 h-1 mx-auto bg-rose-300 rounded-full"></div>
                                    <p className="text-lg text-gray-700 leading-relaxed font-light italic">
                                        "{selectedDay.message}"
                                    </p>
                                    <div className="text-sm text-gray-400">
                                        {new Date(selectedDay.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </div>
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
