import { Box } from '@chakra-ui/react';
import React from 'react';
import bgImg from '../../images/hero.jpg';

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
      backgroundImage={bgImg}
      backgroundPosition={'top'}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      zIndex={'999'}
    ></Box>
  );
};

export default Hero;
