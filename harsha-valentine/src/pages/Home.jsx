import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden bg-rose-50/50">
            <FloatingHearts />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="z-10 text-center space-y-8 glass-panel p-12 rounded-3xl"
            >
                <motion.h1
                    className="text-5xl md:text-7xl font-serif text-rose-800 tracking-wide drop-shadow-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    For My Love, <span className="text-rose-600 font-bold">Harsha</span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-rose-700 font-light max-w-2xl mx-auto leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    "Every day with you is a celebration, but this week belongs entirely to us.
                    A journey of love, surprises, and memories waiting for you."
                </motion.p>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                >
                    <button
                        onClick={() => navigate('/journey')}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 bg-rose-600 rounded-full hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <Heart className="w-6 h-6 mr-2 fill-current animate-pulse group-hover:scale-110 transition-transform" />
                        Begin Our Journey
                    </button>
                </motion.div>
            </motion.div>

            <div className="absolute bottom-4 text-rose-400 text-sm opacity-60">
                Created with infinite love by Hari
            </div>
        </div>
    );
};

export default Home;
