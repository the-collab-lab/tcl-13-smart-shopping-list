import { extendTheme } from '@chakra-ui/react';

// ReUseable Styles
// List item cards, buttons, header, inputs, rounded white corner boxes,

const smartListTheme = extendTheme({
  //app custom color references
  colors: {
    brand: {
      50: '#F7FAFC',
      75: '#E2E8F0',
      100: '#FFFFFF',
      300: '#76E4F7',
      400: '#E53E3E',
      600: '#00A3C4',
      900: '#065666',
    },
  },
  fonts: {
    body: 'Montserrat',
    heading: 'Montserrat',
    mono: 'Montserrat',
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
      bgImage: 'linear-gradient(to bottom,#76E4F7, #00A3C4)',
      width: '100%',
      textAlign: 'center',
      py: '3.75vh',
    },
    h2: {
      fontSize: '24px',
      color: 'gray.900',
      fontFamily: 'Montserrat',
      width: '100%',
      textAlign: 'center',
      paddingTop: '3.75vh',
    },
    h2: {
      pt: '3%',
      pb: '1%',
      fontSize: '2xl',
      fontWeight: 'medium',
    },
    roundedCorners: {
      borderTopRadius: '3.5rem',
      background: 'brand.100',
      textAlign: 'center',
    },
    AddIcon: {
      width: '40px',
      height: '40px',
      background: 'brand.600',
      padding: '10px',
      borderRadius: 'xl',
      border: '1.5px solid brand.900',
      color: 'brand.100',
      marginTop: '3%',
      marginBottom: '10px',
      _hover: {
        bg: 'brand.900',
      },
    },
    itemButton: {
      fontWeight: 'medium',
      fontFamily: 'Montserrat',
      bg: 'brand.50',
      borderRadius: 'xl',
      color: 'black',
      fontSize: 'sm',
      padding: '0px 10px',
      margin: '5px',
      _hover: {
        textDecoration: 'none',
        bg: 'brand.900',
      },
    },
    fakeButton: {
      fontWeight: 'semiBold',
      fontFamily: 'Montserrat',
      bg: 'brand.600',
      borderRadius: '3xl',
      color: 'brand.100',
      type: 'submit',
      fontSize: '2xl',
      padding: '5px 15px',
      _hover: {
        textDecoration: 'none',
        bg: 'brand.900',
      },
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
          px: '35px',
          py: '20px',
          fontSize: '2xl',
        }),
      },
    },
    Input: {
      variants: {
        flushed: {
          borderBottom: '1px black solid',
          textAlign: 'center',
          bg: 'black',
          _focus: {
            borderColor: 'red',
          },
        },
        filled: {
          bg: 'brand.600',
          color: 'red',
        },
        shayne: {
          color: 'red',
          bg: 'black',
        },
        searchBox: {
          bg: 'brand.600',
          color: 'brand.100',
          borderRadius: '3xl',
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'Montserrat',
        fontSize: 'xl',
      },
    },
  },
});

export default smartListTheme;
