import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
     './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {
      colors:{
        primary:"#0EA37E",
        "primary-dark":"#0B8168",
        "primary-light":"#E4F7F1",
        dark:"#F4F7F8",
        darkBlack:"#12181B",
        secondary:"#EE4A62",
        orange:"#F8B81F",
        ink: "#0F172A",
        muted: "#64748B",
        surface: "#FFFFFF",
        line: "#E6EBEE",
      },
      borderColor: {
        DEFAULT: "#E6EBEE",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        card: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)",
        pop: "0 12px 32px rgba(14,163,126,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        'bounce-up-down': 'bounce-up-down 5s infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
      keyframes: {
        'bounce-up-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [daisyui,require('tailwind-scrollbar'), require('preline/plugin')],
  daisyui: {
    themes: ["light"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  safelist : [
    'bg-gray-100',
    'bg-slate-100',
    'bg-neutral-100',
    'bg-stone-100',
    'bg-red-100',
    'bg-orange-100',
    'bg-amber-100',
    'bg-yellow-100',
    'bg-lime-100',
    'bg-green-100',
    'bg-emerald-100',
    'bg-teal-100',
    'bg-cyan-100',
    'bg-sky-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-violet-100',
    'bg-purple-100',
    'bg-fuchsia-100',
    'bg-pink-100',
    'bg-rose-100'
  ]
};
export default config;
