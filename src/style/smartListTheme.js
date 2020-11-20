import { extendTheme } from '@chakra-ui/react';

// ReUseable Styles
// List item cards, buttons, header, inputs, rounded white corner boxes,

const smartListTheme = extendTheme({
  //app custom color references
  colors: {
    brand: {
      100: '#FFFFFF',
      300: '#76E4F7',
      600: '#00A3C4',
      900: '#065666',
    },
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: '48px',
      color: 'brand.100',
      lineHeight: '110%',
      letterSpacing: '-2%',
      fontFamily: 'Montserrat',
      background: 'brand.600',
      width: '100%',
      textAlign: 'center',
      height: '15vh',
      paddingTop: '3.75vh',
    },
    roundedCorners: {
      borderTopRadius: '3.5rem',
      background: 'brand.100',
    },
  },
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'semiBold',
        fontFamily: 'Montserrat',
        bg: 'cyan.600',
        borderRadius: '3xl',
        color: 'brand.100',
        type: 'submit',
        fontSize: '2xl',
      },
      variants: {
        // 4. We can override existing variants
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.600',
          _hover: { bg: 'brand.900' },
          bgImage: 'linear-gradient(red.500, yellow.500)',
          px: '45px',
          py: '25px',
          fontSize: '2xl',
        }),
      },
    },
    Input: {
      variants: {
        flushed: {
          borderBottom: '1px black solid',
          textAlign: 'center',
        },
        filled: {
          bg: 'brand.600',
          color: 'brand.100',
        },
      },
    },
  },
});

export default smartListTheme;
