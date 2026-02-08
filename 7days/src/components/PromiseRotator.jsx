import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const promises = [
    "I promise to listen to you, even when the silence speaks louder than words.",
    "I promise to be your biggest cheerleader in every victory and your safe haven in every storm.",
    "I promise to love you more each day, even when miles keep us apart.",
    "I promise to keep our memories safe and build a future worthy of us.",
    "I promise that no matter where life takes us, my heart will always return to you.",
    "I promise to make you laugh when you want to cry, and hold you until you feel safe."
];

const PromiseRotator = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % promises.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden relative max-w-2xl mx-auto mt-8 px-4">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="font-handwritten text-xl md:text-3xl text-gold-300 text-center text-glow"
                >
                    &ldquo;{promises[index]}&rdquo;
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default PromiseRotator;
