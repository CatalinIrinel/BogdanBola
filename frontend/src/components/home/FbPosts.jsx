import { Box } from '@chakra-ui/react';
import React from 'react';

const FbPosts = () => {
  return (
    <Box
      maxW={'100rem'}
      w={'full'}
      minH={'100vh'}
      display={'none'}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={'4rem 8rem'}
    >
      <Box>
        <h1>Helloo fb posts</h1>
      </Box>
    </Box>
  );
};

export default FbPosts;
