import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Fireflies = () => {
    const [fireflies, setFireflies] = useState([]);

    useEffect(() => {
        const count = 30; // Number of fireflies
        const newFireflies = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            animationDuration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
            scale: Math.random() * 0.5 + 0.5,
        }));
        setFireflies(newFireflies);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {fireflies.map((firefly) => (
                <motion.div
                    key={firefly.id}
                    className="absolute bg-gold-300 rounded-full blur-[1px] opacity-60"
                    style={{
                        left: `${firefly.left}%`,
                        top: `${firefly.top}%`,
                        width: `${firefly.scale * 4}px`,
                        height: `${firefly.scale * 4}px`,
                        boxShadow: `0 0 ${firefly.scale * 10}px 2px rgba(212, 175, 55, 0.6)`
                    }}
                    animate={{
                        y: [0, -20, 0, 20, 0],
                        x: [0, 15, 0, -15, 0],
                        opacity: [0, 0.8, 0.4, 0.9, 0],
                    }}
                    transition={{
                        duration: firefly.animationDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: firefly.delay
                    }}
                />
            ))}
        </div>
    );
};

export default Fireflies;
