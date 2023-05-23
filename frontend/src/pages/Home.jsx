import { Box } from '@chakra-ui/react';
import React from 'react';
import Hero from '../components/home/Hero';
import CallToAction from '../components/home/CallToAction';
import FbPosts from '../components/home/FbPosts';
import Projects from '../components/home/Projects';
import Counters from '../components/Counters';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <Box
      bg={'primary'}
      width={'100%'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Helmet>
        <title>Bogdan Bola - Deputat</title>
      </Helmet>
      <Hero screen={'80vh'} />
      <Counters />
      <Projects />
      <CallToAction />
      <FbPosts />
    </Box>
  );
}

export default Home;
