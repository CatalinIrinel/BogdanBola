import {
  Box,
  Stat,
  StatArrow,
  StatGroup,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { counterData } from './data';

const Counters = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Box
      position={'relative'}
      zIndex={'1000'}
      top={'-8rem'}
      w={['350px', 'full']}
      px={['2rem', null, null, 0]}
      height={['fit-content', '200px']}
      maxW={'100rem'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexWrap={'wrap'}
      bgColor={'transparent'}
    >
      <StatGroup
        w={['350px', 'full']}
        height={'full'}
        maxW={'1500px'}
        flexWrap={['none', 'wrap']}
        display={'flex'}
        flexDir={['column', 'row']}
        alignItems={'center'}
        justifyContent={'space-evenly'}
        bg={'rgba(0,0,0,0.25)'}
        borderRadius={'1rem'}
        backdropFilter={'blur(1rem)'}
        border={'1px solid #fff'}
        py={['1rem', 0]}
      >
        {counterData.map((item) => (
          <Stat key={item.id}>
            <StatNumber
              textAlign={'center'}
              fontSize={['3rem', null, null, '4.25rem']}
              color={'#fff'}
              fontFamily={'Roboto'}
            >
              {count < item.number ? count : item.number}{' '}
              <StatArrow w={6} h={6} type="increase" />
            </StatNumber>
            <StatLabel
              fontSize={['1rem', '1.25rem']}
              textAlign={'center'}
              color={'text'}
              fontFamily={'Roboto'}
            >
              {item.title}
            </StatLabel>
          </Stat>
        ))}
      </StatGroup>
    </Box>
  );
};

export default Counters;
