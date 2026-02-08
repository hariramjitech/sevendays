import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';

const ZoomableImage = ({ src, alt, className }) => {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const MIN_SCALE = 1;
    const MAX_SCALE = 4;

    const handleWheel = (e) => {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const delta = -e.deltaY * 0.001;
        const newScale = Math.min(Math.max(MIN_SCALE, scale + delta), MAX_SCALE);

        if (newScale === scale) return;

        // Calculate new position to keep the mouse point stable
        // Formula: newPos = mousePos - (mousePos - oldPos) * (newScale / oldScale)
        const scaleRatio = newScale / scale;
        const newX = x - (x - position.x) * scaleRatio;
        const newY = y - (y - position.y) * scaleRatio;

        setScale(newScale);
        setPosition({ x: newX, y: newY });

        // Reset position if zoomed out completely
        if (newScale === 1) {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseDown = (e) => {
        if (scale > 1) {
            setIsDragging(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && scale > 1) {
            e.preventDefault();
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = (e) => {
        if (scale > 1) {
            // Reset
            setScale(1);
            setPosition({ x: 0, y: 0 });
        } else {
            // Zoom to 2x at cursor
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newScale = 2;
            // Center the click point
            // We want the point (x,y) to stay at (x,y)
            // But actually standard double tap often just zooms in. 
            // Let's use the same logic: newPos = cursor - (cursor - oldPos) * ratio
            // oldPos is 0,0 since scale is 1
            const newX = x - (x - 0) * newScale;
            const newY = y - (y - 0) * newScale;

            setScale(newScale);
            setPosition({ x: newX, y: newY });
        }
    };

    // Keep image within bounds
    useEffect(() => {
        if (scale === 1) {
            setPosition({ x: 0, y: 0 });
            return;
        }
        // Logic to constrain dragging could go here, 
        // but for free-panning (infinite canvas feel), we can leave it or just loose constrain.
        // Let's stick to free pan for smoothness unless user complains.
    }, [scale]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className} touch-none select-none`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            style={{
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
            }}
        >
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    width: '100%',
                    height: '100%'
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain pointer-events-none"
                />
            </div>

            {/* Controls Overlay */}
            <div className="absolute top-4 left-4 flex gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 text-gold-300 text-xs px-2 py-1 rounded backdrop-blur-sm border border-gold-500/20">
                    Scroll to Zoom • Drag to Pan
                </div>
            </div>

            {/* Zoom Indicator */}
            {scale > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/50 text-gold-300 text-xs px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                    {Math.round(scale * 100)}%
                </div>
            )}
        </div>
    );
};

export default ZoomableImage;
