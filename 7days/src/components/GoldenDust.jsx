import { useRef, useEffect } from 'react';

const GoldenDust = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Varying sizes for depth
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * -0.5 - 0.2; // Move upwards mostly
                // Gold colors
                this.color = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`;
                this.angle = Math.random() * 360;
                this.spinSpeed = Math.random() * 2 - 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.angle += this.spinSpeed;

                if (this.size > 0.2) this.size -= 0.005; // Fade out slowly

                // Reset particle if it goes off screen or becomes too small
                if (this.y < 0 || this.x < 0 || this.x > canvas.width || this.size <= 0.2) {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + 10;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.speedY = Math.random() * -0.5 - 0.2;
                    this.color = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.angle * Math.PI) / 180);

                // Draw a diamond shape for "sparkle" effect
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(this.size, 0);
                ctx.lineTo(0, this.size);
                ctx.lineTo(-this.size, 0);
                ctx.closePath();
                ctx.fill();

                // Add a glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#f3e5ab";

                ctx.restore();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 70; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default GoldenDust;
