module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: '#374151',
            },
            h2: {
              color: '#374151',
            },
            h3: {
              color: '#374151',
            },
            h4: {
              color: '#374151',
            },
          }
        }
      })
    },
    borderWidth: {
      DEFAULT: '0.5px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
    }
  },
  variants: {
    extend: {
      translate: ['active', 'group-hover'],
      transitionDuration: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
