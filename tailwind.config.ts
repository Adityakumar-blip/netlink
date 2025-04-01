import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1380px",
      },
    },
    extend: {
      fontFamily: {
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#014D84",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#0277B5",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        white: "#ffffff",
        black: "#000000",
        offwhite: "#ECF2FF",
        lightwhite: "#d0d3db",
        lightblack: "#1B1D21",
        darkblack: "#232529",
        red: "#FF0000",
        selected: "#E6F0F8",
        darkselected: "#01406D",
        darkbox: "#313337",
        green: "#50741D",
        orange: "#E68600",
        softWhite: "#F5F5F5",
        lightDarkWhite: "#D8D8D8",
        eggWhite: "#E0E0E0",
        creamyIvory: "#FFFBEB",
        ivory: "#F4EFEF",
        gray: "#6C849E",
        charcoalGray: "#3E5061",
        slateGray: "#556A80",
        lightGray: "#F5F7F9",
        mediumGray: "#A1B5C7",
        semiDarkGray: "#556A80",
        darkgray: "#273643",
        graphiteGray: "#3E5061",
        gunmetalGray: "#273643",
        coolGray: "#8AA3BA",
        lightBlueGray: "#D0D9E2",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #014D84 0%, #013456 108.93%)",
        "custom-gradient-2":
          "linear-gradient(138.48deg, #F5F5F5 23.48%, #C5DCEE 350.85%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-out",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        soft: "0px 2px 10px rgba(0, 0, 0, 0.05)",
        card: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        glass: "5px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
