import { motion } from 'framer-motion';
import { X, Scroll } from 'lucide-react';

const LoveLetterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                className="relative bg-parchment-200 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.2)] border-4 border-double border-gold-700 p-8 md:p-12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-blood-900 hover:bg-black/5 rounded-full p-2 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center space-y-6">
                    <Scroll className="w-12 h-12 text-gold-700" />
                    <h2 className="text-3xl md:text-4xl font-medieval text-blood-900 border-b-2 border-gold-500/30 pb-4 w-full">
                        My Dearest Harsha
                    </h2>

                    <div className="font-scroll text-lg md:text-xl text-slate-800 leading-loose text-justify space-y-4">
                        <p>
                            From the moment you walked into my life, the world shifted. It wasn't loud or chaotic; it was a quiet realization that I had found the piece of my soul I didn't know was missing.
                        </p>
                        <p>
                            Distance is just a test to see how far love can travel. And my love for you? It has no bounds. It crosses oceans, ignores time zones, and beats in rhythm with yours, no matter where we are.
                        </p>
                        <p>
                            You are my wife, my partner, and my best friend. Every sacrifice, every long night, every moment of waiting—it's all worth it because it leads me back to you.
                        </p>
                        <p>
                            This Valentine's week is my way of showing you that even though I'm not there to hold your hand, I am holding your heart. Today, tomorrow, and forever.
                        </p>
                    </div>

                    <div className="pt-8 w-full text-right">
                        <p className="font-handwritten text-3xl text-blood-700 transform -rotate-2">
                            Forever Yours,<br />Hari
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LoveLetterModal;
