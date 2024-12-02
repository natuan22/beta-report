import plugin from "tailwindcss/plugin";

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: { max: "375px" },
      xs: "375px",
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    container: { screens: { xs: "425px", md: "768px", lg: "768px", xl: "1024px", "2xl": "1440px" }},
    extend: {
      colors: {
        gray:   { 50: "#F9FAFB", 100: "#F3F4F6", 200: "#E5E7EB", 300: "#BFC4CD", 400: "#9CA3AF", 500: "#6B7280", 600: "#4B5563", 700: "#374151", 800: "#1F2937", 900: "#111827", 950: "#030712" },
        violet: { 50: "#F1EEFF", 100: "#E6E1FF", 200: "#D2CBFF", 300: "#B7ACFF", 400: "#9C8CFF", 500: "#8470FF", 600: "#755FF8", 700: "#5D47DE", 800: "#4634B1", 900: "#2F227C", 950: "#1C1357" },
        sky:    { 50: "#E3F3FF", 100: "#D1ECFF", 200: "#B6E1FF", 300: "#A0D7FF", 400: "#7BC8FF", 500: "#67BFFF", 600: "#56B1F3", 700: "#3193DA", 800: "#1C71AE", 900: "#124D79", 950: "#0B324F" },
        green:  { 50: "#D2FFE2", 100: "#B1FDCD", 200: "#8BF0B0", 300: "#67E294", 400: "#4BD37D", 500: "#3EC972", 600: "#34BD68", 700: "#239F52", 800: "#15773A", 900: "#0F5429", 950: "#0A3F1E" },
        red:    { 50: "#FFE8E8", 100: "#FFD1D1", 200: "#FFB2B2", 300: "#FF9494", 400: "#FF7474", 500: "#FF5656", 600: "#FA4949", 700: "#E63939", 800: "#C52727", 900: "#941818", 950: "#600F0F" },
        yellow: { 50: "#FFF2C9", 100: "#FFE7A0", 200: "#FFE081", 300: "#FFD968", 400: "#F7CD4C", 500: "#F0BB33", 600: "#DFAD2B", 700: "#BC9021", 800: "#816316", 900: "#4F3D0E", 950: "#342809" },
        signinColor: "rgba(116,99,224,0.25)", inputBackground1: "rgba(59, 24, 130, 0.75)", inputBackground2: " rgba(158, 24, 99, 0.75)", backgroundBtn: "rgba(0,0,0,0.4)",
      },
      fontFamily: { inter: ["Inter", "sans-serif"] },
      keyframes: { marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-100%)" } }},
      animation: { marquee: "marquee 30s linear infinite" },
      backgroundImage: { worldBackground: `url('/public/assets/img/bgWorld.png')`, vnBackground: `url('/public/assets/img/mapVN.png')`, cityBackground: `url('/public/assets/img/bgCity.png')` },
      height: { 100: "800px" },
      with: { 101: "1000px" },
      lineClamp: { 15: "15" },
      borderWidth: { 3: "3px" },
      minWidth: { 36: "9rem", 44: "11rem", 56: "14rem", 60: "15rem", 72: "18rem", 80: "20rem" },
      maxWidth: { "8xl": "88rem", "9xl": "96rem" },
      zIndex: { 60: "60" },
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
    function ({ addComponents, theme }) {
      addComponents({
        ".container-blogs": {
          maxWidth: "824px",
          margin: "0 auto",
          "@screen xxs": { maxWidth: "320px" },    // xxs: "375px"
          "@screen xs":  { maxWidth: "375px" },    // xs:  "375px",
          "@screen sm":  { maxWidth: "425px" },    // sm:  "425px",
          "@screen md":  { maxWidth: "640px" },    // md:  "768px",
          "@screen lg":  { maxWidth: "824px" },    // lg:  "1024px",
          "@screen xl":  { maxWidth: "824px" },    // xl:  "1440px",
          "@screen 2xl": { maxWidth: "824px" },    // 2xl: "1920px",
        },
      });
    }
  ],
  corePlugins: { preflight: false },
};
