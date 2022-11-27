import { Avatar, Box } from '@chakra-ui/react';
import React from 'react';
import Hero from '../components/home/Hero';
import CallToAction from '../components/home/CallToAction';
import FbPosts from '../components/home/FbPosts';
import Projects from '../components/home/Projects';
import Counters from '../components/Counters';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box
      bg={'primary'}
      width={'100%'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
    >
      <Helmet>
        <title>Bogdan Bola</title>
      </Helmet>
      <Box
        bg={'transparent'}
        w={'full'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        position={'absolute'}
        zIndex={10000000}
        top={'-5rem'}
        px={'8rem'}
      >
        <Link to={'/logare'}>
          <Avatar />
        </Link>
      </Box>
      <Hero screen={'80vh'} />
      <Counters />

      <Projects />
      <CallToAction />
      <FbPosts />
    </Box>
  );
}

export default Home;
