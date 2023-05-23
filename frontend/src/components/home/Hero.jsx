import { Box } from '@chakra-ui/react';
import React from 'react';

const Hero = ({ screen }) => {
  return (
    <Box
      marginTop={'-130px'}
      w={'full'}
      minH={['50vh', `${screen}`]}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      position={'relative'}
      backgroundImage={'url(/images/hero.jpg.webp)'}
      backgroundPosition={'top'}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      zIndex={'999'}
    ></Box>
  );
};

export default Hero;
