import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterEffect = ({ text, delay = 0, speed = 50, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay * 0.001 }} // Convert ms to s roughly for start
            className={className}
        >
            {displayedText}
            <span className="animate-pulse">|</span>
        </motion.span>
    );
};

export default TypewriterEffect;
