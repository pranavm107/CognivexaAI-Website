export const designTokens = {
    colors: {
        primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
            brand: "#6C4CF0", // From tailwind config
            brandDark: "#4B3BD6",
            brandActive: "#651FFF",
        },
        secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
        },
        background: {
            DEFAULT: "hsl(var(--background))",
            paper: "hsl(var(--card))",
        },
        text: {
            primary: "hsl(var(--foreground))",
            secondary: "hsl(var(--muted-foreground))",
            heading: "#0b1220", // text-900
        },
        accent: {
            DEFAULT: "hsl(var(--accent))",
            iris: "var(--iris-100)",
            fuschia: "var(--fuschia-100)",
        }
    },
    spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        section: "5rem", // 80px
    },
    borderRadius: {
        DEFAULT: "12px",
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        full: "9999px",
    },
    typography: {
        fontFamily: {
            sans: "Inter, system-ui, sans-serif",
        },
        fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
        }
    }
};
