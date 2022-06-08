module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth': "url('https://picsum.photos/200')"
      },
      fontFamily: {
        'display': ['Okra'],
        'body': ['"Open Sans"'],
      },
      colors: {
        zomato:
        {
          50: '#ffe5e7',
          100: '#fabac0',
          200: '#f18f96',
          300: '#e9626d',
          400: '#e23744',
          500: '#c81d2a',
          600: '#9d1520',
          700: '#700d16',
          800: '#46060c',
          900: '#1e0002',
        },
        megenta:
        {
          50: '#ffe2e7',
          100: '#ffb3bb',
          200: '#fc8393',
          300: '#f9526d',
          400: '#f6224b',
          500: '#dd0939',
          600: '#ad0320',
          700: '#7c000e',
          800: '#4d0002',
          900: '#200400',
        }
      }
    },
  },
  plugins: [],
}
