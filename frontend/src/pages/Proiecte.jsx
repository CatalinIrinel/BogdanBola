import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { proiecteleMele } from '../components/data';
import Hero from '../components/home/Hero';
import { Helmet } from 'react-helmet-async';

const Proiecte = () => {
  useEffect(() => {
    Aos.init({
      disable: window.innerWidth < 600,
    });
  }, []);
  return (
    <Box
      w={'full'}
      bgColor={'secondary'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={'column'}
    >
      {' '}
      <Helmet>
        <title>Proiecte - Bogdan Bola</title>
        <link rel="canonical" href="https://bogdanbola.ro/proiecte" />
      </Helmet>
      <Box w={'full'} position={'relative'}>
        <Hero screen={'60vh'} />
        <div className="custom-shape-divider-bottom-1668967835">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill2"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill2"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill2"
            ></path>
          </svg>
        </div>
      </Box>
      <Box
        w={'full'}
        maxW={'100rem'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDir={'column'}
        color={'text'}
        gap={'3rem'}
      >
        <Heading as={'h1'} fontSize={'3rem'}>
          Proiectele Mele
        </Heading>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          w={'full'}
          gap={'2rem'}
          py={['3rem', null, '4rem']}
        >
          {proiecteleMele.map((proiect) => (
            <Link to={`/${proiect.slug}`}>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                key={proiect._id}
                position={'relative'}
                mb={'1rem'}
              >
                <Box
                  w={['300px', null, '450px']}
                  h={['200px', null, '300px']}
                  borderRadius={'1rem'}
                  backgroundImage={`url(${proiect.image})`}
                  backgroundPosition={'center'}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'cover'}
                  boxShadow={'0 0 1.5rem rgba(0,0,0,0.65)'}
                ></Box>
                <Heading
                  as={'h2'}
                  w={'300px'}
                  textTransform={'uppercase'}
                  position={'absolute'}
                  fontSize={'1.25rem'}
                  zIndex={'2'}
                  top={'50%'}
                  left={'0'}
                  right={'0'}
                  marginRight={'auto'}
                  bgColor={'rgba(0,0,0,0.7)'}
                  p={'.5rem 1rem'}
                  borderRadius={'0 1rem 1rem 0'}
                  className={'callToAction'}
                >
                  {proiect.title}
                </Heading>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Proiecte;
