/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                parchment: {
                    100: '#fdfbf7',
                    200: '#f7f1e3', // Light parchment
                    300: '#efe6d0',
                    400: '#e6dcb8',
                    500: '#d4c59a', // Dark parchment
                    900: '#3e3221', // Ink color
                },
                blood: {
                    500: '#8a1c1c', // Deep red
                    700: '#5e0b0b', // Darker red
                    900: '#380404', // Almost black red
                },
                gold: {
                    300: '#f3e5ab',
                    500: '#d4af37', // Metallic gold
                    700: '#aa8c2c',
                },
                midnight: {
                    800: '#1a1a2e',
                    900: '#0f0f1a', // Deep night blue/black
                }
            },
            fontFamily: {
                medieval: ['"Cinzel"', 'serif'],
                scroll: ['"Playfair Display"', 'serif'],
                handwritten: ['"Dancing Script"', 'cursive'],
            },
            backgroundImage: {
                'paper-texture': "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
                // 'medieval-bg': "url('/bg.jpg')", // Placeholder for user's BG
            },
            animation: {
                'flicker': 'flicker 3s infinite',
            },
            keyframes: {
                flicker: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                }
            }
        },
    },
    plugins: [],
}
