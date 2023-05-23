import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { proiecteleMele } from '../data';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@chakra-ui/icons';

const Projects = () => {
  useEffect(() => {
    Aos.init({
      disable: window.innerWidth < 600,
    });
  }, []);
  return (
    <Box
      maxW={'100rem'}
      w={'full'}
      minH={'100vh'}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      padding={['2rem', null, '0 4rem']}
      textAlign={['center', 'left']}
      position={'relative'}
    >
      <Box
        w={'full'}
        height={'100vh'}
        position={'absolute'}
        zIndex={1}
        backgroundImage={'url(/images/LogoW.png.webp)'}
        backgroundSize={['cover', null, 'contain']}
        backgroundRepeat={'no-repeat'}
        backgroundPosition={'center'}
        opacity={'.4'}
      ></Box>
      <Box
        w={'full'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        mb={['3rem', '6rem']}
        gap={['2rem', null, 0]}
        position={'relative'}
        zIndex={1000}
      >
        <Box>
          <Heading
            as={'h2'}
            color={'#fff'}
            fontSize={'3rem'}
            textTransform={'uppercase'}
          >
            Proiectele mele
          </Heading>
          <Heading
            as={'h3'}
            textTransform={'uppercase'}
            fontSize={'1.5rem'}
            color={'#9c9c9c'}
          >
            trecute, prezente și viitoare
          </Heading>
        </Box>

        <Box
          w={['full', null, 'fit-content']}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          color={'text'}
          fontSize={'1.5rem'}
        >
          <Link to={'/proiecte'}>
            <Text
              w={'fit-content'}
              borderRadius={'1rem'}
              borderBottom={'2px solid #e8e8e8'}
              p={'.5rem'}
            >
              <ArrowLeftIcon />
              &nbsp; Toate proiectele
            </Text>
          </Link>
        </Box>
      </Box>
      <Box
        w={'full'}
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={['space-evenly', null, null, null, 'space-between']}
        alignItems={'center'}
        color={'#eaeaea'}
        gap={['2rem', null, null, null, 0]}
        zIndex={1000}
        pb={[null, null, '2rem', null, 0]}
      >
        {proiecteleMele.slice(0, 3).map((proiect) => (
          <Box
            key={proiect._id}
            w={'350px'}
            h={['fit-content', null, '550px']}
            bgColor={'rgba(255,255,255,0.15)'}
            borderRadius={'1rem'}
            backdropFilter={'blur(9px)'}
            border={'1px solid rgba(255,255,255,.8)'}
            padding={'1rem'}
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={['1rem', null, 0]}
            data-aos={proiect.dataAos}
            data-aos-duration={proiect.aosDuration}
            data-aos-easing={proiect.aosEasing}
            data-aos-delay={proiect.aosDelay}
          >
            <Image
              borderRadius={'.5rem'}
              w={'300px'}
              h={'200px'}
              src={proiect.image}
              alt={proiect.title}
              loading={'lazy'}
            />
            <Box>
              <Heading
                as={'h3'}
                fontSize={'1.25rem'}
                textTransform={'uppercase'}
                textAlign={'center'}
                mb={'1rem'}
              >
                {proiect.title}
              </Heading>
              <Text noOfLines={[1, null, 6]}>{proiect.text}</Text>
            </Box>
            <Link to={`/${proiect.slug}`}>
              <Text
                bgColor={'text'}
                borderRadius={'.5rem'}
                p={'.5rem 1rem'}
                color={'primary'}
              >
                Află mai mult
              </Text>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
