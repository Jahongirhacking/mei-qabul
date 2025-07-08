import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
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
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        university: {
          primary: {
            DEFAULT: "#fa6775",
            50: "#f8e6e7",
            100: "#f1cccd",
            200: "#e3a3a6",
            300: "#d57f83",
            400: "#c7585f",
            500: "#fa6775",
            600: "#9b0d3c",
            700: "#750e31",
            800: "#4f0f26",
            900: "#290b1b"
          },
          secondary: {
            DEFAULT: "#B70947",
            50: "#f8e6e7",
            100: "#f1cccd",
            200: "#e3a3a6",
            300: "#d57f83",
            400: "#c7585f",
            500: "#B70947",
            600: "#9b0d3c",
            700: "#750e31",
            800: "#4f0f26",
            900: "#290b1b"
          },
          green: {
            DEFAULT: "#e7e9e7",
            50: "#e7e9e7",
            100: "#d1d4d1",
            200: "#b4b8b4",
            300: "#969a96",
            400: "#797c79",
            500: "#e7e9e7",
            600: "#d1d4d1",
            700: "#b4b8b4",
            800: "#969a96",
            900: "#797c79"
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["SpaceGrotesk", "sans-serif"]
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "pulse-soft": {
          "0%, 100%": {
            opacity: "1"
          },
          "50%": {
            opacity: "0.8"
          }
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.7s ease-out",
        "fade-in-right": "fade-in-right 0.7s ease-out",
        "pulse-soft": "pulse-soft 3s infinite ease-in-out",
        float: "float 6s infinite ease-in-out"
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(to right, #0a3264, #125490)",
        "teal-gradient": "linear-gradient(to right, #0DD9B9, #25EDCE)"
      }
    }
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--color-university-secondary": theme("colors.university.secondary.DEFAULT"),
          "--color-university-primary": theme("colors.university.primary.DEFAULT"),
          "--color-university-green": theme("colors.university.green.DEFAULT")
        }
      })
    }
  ]
} satisfies Config
