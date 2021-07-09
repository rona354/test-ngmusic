module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      // borderBottomLeftRadius: '50% 20%',
      // borderBottomRightRadius: '50% 20%',
      borderRadius: {
        'b-curved': '50% 20%'
      }
    },
  },
  variants: {
    display: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
}
