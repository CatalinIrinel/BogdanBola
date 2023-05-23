import React from 'react';
import { Box, Heading, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import Hero from '../components/home/Hero';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <Box
      w={'full'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={'column'}
      bg={'#f0eeee'}
    >
      <Helmet>
        <title>Despre Mine - Bogdan Bola</title>
        <link rel="canonical" href="https://bogdanbola.ro/despre" />
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
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </Box>

      <Box
        maxW={'100rem'}
        w={'full'}
        px={['2rem', null, '8rem']}
        py={'3rem'}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        gap={'3rem'}
        h={['fit-content', null, '80vh']}
      >
        <Box w={'full'} textAlign={['center', null, 'left']}>
          <Heading
            as={'h2'}
            color={'secondary'}
            fontSize={'1.8rem'}
            textTransform={'uppercase'}
          >
            bogdan bola
          </Heading>
          <Heading as={'h1'} color={'primary'} fontSize={'3rem'}>
            Despre Mine
          </Heading>
        </Box>
        <Box className={'despreText'} w={'full'}>
          <UnorderedList display={'flex'} flexDir={'column'} gap={'1rem'}>
            <ListItem>
              Mă aflu la primul mandat de deputat de Constanța, sunt licențiat
              în drept și avocat de profesie, iar pasiunile mele enumeră
              istoria, pescuitul și muzica.
            </ListItem>
            <ListItem>
              Până recent, am fost membru al Partidului Național Liberal în care
              m-am înscris la vârsta de 14 ani, având carnet de membru încă din
              1995, fiind o opțiune făcută cu sufletul căreia i-am rămas fidel
              la bine și la greu. Cu toate acestea, în luna octombrie a anului
              2021, cu o mare greutate și imens regret, am demisionat din PNL
              întrucât deciziile luate în cascadă de noua conducere a partidului
              în vremuri de criză și pandemie, cu o alianță cu PSD pe care nu o
              pot susține. în timp ce țara era administrată de un guvern
              interimar au fost de neînțeles.
            </ListItem>
          </UnorderedList>
          <UnorderedList display={'flex'} flexDir={'column'} gap={'1rem'}>
            {' '}
            <ListItem>
              Pentru mine, politica nu a fost niciodată un scop în sine, eu
              fiind interesat să contribui în mod real la luarea deciziilor care
              să producă schimbări pozitive în comunitate și am înțeles că orice
              funcție nu este mai mult decât un instrument pe care îl poți
              folosi pentru a obține rezultate pentru comunitate.
            </ListItem>
            <ListItem>
              În trecut, am avut un mandat de consilier județean în cadrul
              Consiliului Județean Constanța în perioada 2016-2020 și am deținut
              funcția de director al Administrația Bazinală de Apă Dobrogea
              Litoral Constanța în perioada februarie 2020- ianuarie 2021 și am
              deținut mai multe funcții de ordin politic în Partidul Național
              Liberal.
            </ListItem>
          </UnorderedList>
        </Box>
        <Box
          listStyleType={'none'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={['center', null, 'flex-start']}
        >
          <Link
            boxShadow={'0 5px .8rem rgba(0,0,0,0.2)'}
            borderRadius={'1rem'}
            border={'2px solid #187718'}
            p={'.5rem 1rem'}
            color={'primary'}
            href={'/BolaBogdan.pdf'}
            download
          >
            CV-ul Meu
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
