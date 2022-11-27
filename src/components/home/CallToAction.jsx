import { ArrowLeftIcon } from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import PaginationGallery from '../PaginationGallery';

const CallToAction = () => {
  return (
    <Box
      position={'relative'}
      w={'full'}
      minH={'30rem'}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      paddingY={'4rem'}
      bgColor={'#f8f8f8'}
      zIndex={'2'}
      clipPath={[
        'polygon(0 0, 100% 3%, 100% 100%, 0% 100%)',
        'polygon(0 0, 100% 1%, 100% 100%, 0% 100%)',
      ]}
    >
      <Box
        w={'full'}
        maxW={'100rem'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        mb={['3rem', '6rem']}
        padding={['2rem', null, '0 4rem']}
      >
        <Box>
          <Heading
            as={'h2'}
            color={'title'}
            fontSize={'3rem'}
            textTransform={'uppercase'}
          >
            Ultimele articole
          </Heading>
        </Box>

        <Box
          w={['full', null, 'fit-content']}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          color={'subtitle'}
          fontSize={'1.5rem'}
          gap={['2rem', null, 0]}
        >
          <Text
            borderRadius={'1rem'}
            borderBottom={'2px solid #08510A'}
            p={'.5rem'}
          >
            <Link to={'/articole'}>
              <ArrowLeftIcon />
              &nbsp; Toate articolele
            </Link>
          </Text>
        </Box>
      </Box>

      <PaginationGallery />
    </Box>
  );
};

export default CallToAction;
