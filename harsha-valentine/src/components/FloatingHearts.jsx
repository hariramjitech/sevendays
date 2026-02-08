import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: Math.random(),
                left: Math.random() * 100,
                scale: Math.random() * 0.5 + 0.5,
                duration: Math.random() * 5 + 5,
            };
            setHearts((prev) => [...prev.slice(-15), newHeart]); // Limit number of hearts
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '100vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: heart.duration, ease: "easeInOut" }}
                    className="absolute text-rose-300"
                    style={{ left: `${heart.left}%`, fontSize: `${heart.scale * 2}rem` }}
                >
                    ♥
                </motion.div>
            ))}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
    );
};

export default FloatingHearts;
