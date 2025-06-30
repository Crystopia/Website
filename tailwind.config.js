module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './posts/**/*.mdx'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
      },
      screens: {
        DEFAULT: '100%',
        sm: '100%',
        md: '768px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter'],
        minecraftseven: ['MinecraftSeven_2'],
      },
      margin: {
        '380%': '380%',
        '650px': '650px',
      },
      colors: {
        '#EAA21A': '#EAA21A',
        '#FAC021': '#FAC021',
        '#7C2D12': '#7C2D12',
        '#78D5F5': '#78D5F5',
      },
    },
  },
  plugins: [],
};
