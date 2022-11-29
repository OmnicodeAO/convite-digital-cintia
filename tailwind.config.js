module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "37":"9.5rem"
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      spacing:{
        "119":"19px",
        "115":"15px",
        "100":"100vh",
        "113":"113px",
        "451":"451px",
        "555":"22px"
      },
      backgroundImage: {
        'bg' : "url('/bg.png')",
        "bgsm":"url('/bg.png')"
      },
      
      backgroundSize: {
        '100': '1px',
        '16': '4rem',
      }

    },
    screens: {
      'sm': '342px',
      // => @media (min-width: 576px) { ... }

      'md': '462px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
   
    fontFamily: {
      lucida_calligraphy: ["Lucida Calligraphy Regular"],
      lucida_bright: ["Lucida Bright", "serif"],
      garamond: ["Garamond"]
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
