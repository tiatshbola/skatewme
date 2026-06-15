{/* all my reusable values in one spot so i'm not retyping hex codes everywhere */}
const theme = {
  /* colour palette - primary is the blue, rose is the red */
  colors: {
    primary: '#00C6E5',
    primaryDark: '#00AC62',

    dark: '#3E3E3E',
    darkLight: '#E1E1E1',
    gray: '#e3e3e3',

    text: '#494949',
    textLight: '#7C7C7C',
    textDark: '#1D1D1D',

    rose: '#ef4444',
    roseLight: '#f87171',
  },

  /* font weights, just named so i don't have to remember the numbers */
  fonts: {
    medium: '500',
    semibold: '600',
    bold: '700',
    extraBold: '800',
  },

  /* corner roundness sizes, xs is barely round, xxl is very round */
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
  },
}

export default theme