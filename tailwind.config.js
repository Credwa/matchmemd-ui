// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging',
    content: ['./index.html', './src/**/*.{vue,ts}']
  },
  theme: {
    extend: {
      // here's how to extend fonts if needed
      fontFamily: {
        sans: ['mulish', 'sans-serif']
      },
      colors: {
        pacific: {
          50: '#f1f9fa',
          100: '#def7f7',
          200: '#b5efed',
          300: '#7ee2e3',
          400: '#36cad3',
          500: '#14acbd',
          600: '#108c9f',
          700: '#146f7e',
          800: '#15555f',
          900: '#01474f'
        },
        royalblue: {
          50: '#f8fafb',
          100: '#f2f5f9',
          200: '#e2e4f3',
          300: '#cecced',
          400: '#b0a2e4',
          500: '#8a76d7',
          600: '#6552be',
          700: '#4b3f96',
          800: '#38316c',
          900: '#2b2852'
        },
        orchid: {
          50: '#f9fafb',
          100: '#f4f4f9',
          200: '#e7e3f2',
          300: '#d8c9ec',
          400: '#c19ce1',
          500: '#a470d3',
          600: '#7d4cb7',
          700: '#5a3a90',
          800: '#412e67',
          900: '#32254f'
        },
        violet: {
          50: '#fafafb',
          100: '#f7f4f8',
          200: '#eee0f0',
          300: '#e4c4e7',
          400: '#d995d7',
          500: '#c967c3',
          600: '#a544a2',
          700: '#76357d',
          800: '#53295a',
          900: '#3e2245'
        },
        hotpink: {
          50: '#fbfafa',
          100: '#f9f4f6',
          200: '#f2e1ec',
          300: '#ebc4de',
          400: '#e494c5',
          500: '#da67a5',
          600: '#ba437e',
          700: '#873361',
          800: '#5e2848',
          900: '#462138'
        },
        blush: {
          50: '#fbfafa',
          100: '#faf5f4',
          200: '#f5e2e5',
          300: '#f0c6d0',
          400: '#eb95a8',
          500: '#e4697b',
          600: '#c94554',
          700: '#953443',
          800: '#692936',
          900: '#4e212c'
        },
        salmon: {
          50: '#fcfaf9',
          100: '#fbf5f2',
          200: '#f6e3e0',
          300: '#f2c7c3',
          400: '#ee9791',
          500: '#e86b5f',
          600: '#d0463d',
          700: '#9d3534',
          800: '#6f292c',
          900: '#532125'
        },
        coral: {
          50: '#fcfaf9',
          100: '#fbf5f1',
          200: '#f6e5dc',
          300: '#f1cbba',
          400: '#ec9c82',
          500: '#e5714f',
          600: '#ca4c31',
          700: '#98392c',
          800: '#6b2c27',
          900: '#502322'
        },
        cooper: {
          50: '#fbfaf9',
          100: '#f9f6f2',
          200: '#f3e8de',
          300: '#ebd1c0',
          400: '#dfa68b',
          500: '#cf7c58',
          600: '#ab5638',
          700: '#7a4130',
          800: '#56312a',
          900: '#402724'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ]
}
