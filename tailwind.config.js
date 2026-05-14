/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate"

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/scripts/**/*.js"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Existing custom colors
                brand: {
                    500: '#6C4CF0',
                    600: '#4B3BD6',
                    active: '#651FFF',
                },
                text: {
                    900: '#0b1220',
                },
                nav: '#5f6368',
                "fuschia-100": "var(--fuschia-100)",
                "fuschia-60": "var(--fuschia-60)",
                "fuschia-80": "var(--fuschia-80)",
                "iris-100": "var(--iris-100)",
                "iris-60": "var(--iris-60)",
                "iris-80": "var(--iris-80)",
            },
            borderRadius: {
                'DEFAULT': '12px',
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            maxWidth: {
                'container': '1200px',
            },
            transitionTimingFunction: {
                'DEFAULT': 'ease',
            },
            transitionDuration: {
                'DEFAULT': '200ms',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                body: "var(--body-font-family)",
                "header-1": "var(--header-1-font-family)",
                "header-2": "var(--header-2-font-family)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                slowFloat: {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(40px)" },
                    "100%": { transform: "translateY(0px)" },
                },
                slowFloat2: {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-40px)" },
                    "100%": { transform: "translateY(0px)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                move: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(1000%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                slowFloat: "slowFloat 12s ease-in-out infinite",
                slowFloat2: "slowFloat2 16s ease-in-out infinite",
                float: "float 4s ease-in-out infinite",
                move: "move 5s linear infinite",
            },
        },
    },
    plugins: [animate],
}
