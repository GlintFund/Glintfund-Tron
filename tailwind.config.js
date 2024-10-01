const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0',
      },
      height: {
        DEFAULT: "100vh"
      }
    },
    extend: {

      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Replace 'Poppins' with your font
        serif: ['Merriweather', 'serif'],
        mono: ['Menlo', 'monospace'],
      },

      colors: {
        primary: "#341A41",
        primary50: "#341A41",
        primary100: "#EBD3F7",
        primary200: "#E2E8F0",
        bgGradient: "linear(to-br, #0A0315, #2C014D)",

        secondary50:"#FDF2F8",
        secondary100:"#FCE7F3",
        secondary200:"#FBCFE8",

        customPurple: '#341A41', // Add your custom color here
        gray: {
          DEFAULT: '#E0E0E0',
        },
        violet: '#2B076E',
        white: '#ffffff',
      },
      darkblue: {
        DEFAULT: '#0D0D2B',
        secondary: '#252540',
      },
      blue: {
        DEFAULT: '#3671E9',
        tertiary: '#51d0de',
        hover: '#2766E6',
      },
      boxShadow: {
        primary: '0px 20px 200px rgba(57, 23, 119, 0.05)',
      },

      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom right, #0A0315, #2C014D)',
      },
      
      },
    
  },
  plugins: [addVariablesForColors],

  animation: {
    shimmer: "shimmer 2s linear infinite",
  },
  keyframes: {
    shimmer: {
      from: {
        backgroundPosition: "0 0",
      },
      to: {
        backgroundPosition: "-200% 0",
      },
    },
  },
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
