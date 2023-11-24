module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xxs: { 'max': '375px' },
      xs: '375px',
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    container: {
      screens: {
        xs: "425px",
        md: "768px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1440px",
      },
    },
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      backgroundImage: {
        "worldBackground": `url('/public/bgWorld.png')`,
        "vnBackground": `url('/public/mapVN.png')`,
        "cityBackground": `url('/public/bgCity.png')`,
      },
      colors: {
        'signinColor': "rgba(116,99,224,0.25)",
        'inputBackground1': "rgba(59, 24, 130, 0.75)",
        'inputBackground2': ' rgba(158, 24, 99, 0.75)',
        'backgroundBtn': 'rgba(0,0,0,0.4)',
      },
      height: {
        100: "800px",
      },
      with: {
        101: '1000px'
      },
      lineClamp: {
        15: '15',
      },
    },
  },
  plugins: [
  ],
  corePlugins: {
    preflight: false,
  },
};
