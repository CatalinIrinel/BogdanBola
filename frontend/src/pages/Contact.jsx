import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Hero from '../components/home/Hero';

const Contact = () => {
  const [name, getName] = useState('');
  const [email, getEmail] = useState('');
  const [subject, getSubject] = useState('');
  const [message, getMessage] = useState('');

  const sendMail = async (e) => {
    e.preventDefault();
    // await axios
    //   .post('https://bogdanbola.babyfie.ro/api/mail/contact', {
    //     name,
    //     email,
    //     message,
    //   })
    //   .then(toast.success('Mesajul a fost trimis'));

    await axios
      .post('/api/mail/contact', {
        name,
        email,
        message,
      })
      .then(toast.success('Mesajul a fost trimis'));
  };
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
        <title>Contact - Bogdan Bola</title>
        <link rel="canonical" href="https://bogdanbola.ro/contact" />
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
        py={['2rem', null, '4rem']}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'3rem'}
        minH={'80vh'}
      >
        <Box w={'full'} maxW={['300px', null, '400px']}>
          <Heading mb={'3rem'} fontSize={'3rem'} as={'h1'} color={'title'}>
            Contactează-mă
          </Heading>
          <form onSubmit={sendMail} className={'contactForm'}>
            <FormControl mb={'1.5rem'} isRequired>
              <FormLabel>Numele complet: </FormLabel>
              <Input
                outline={0}
                outlineOffset={0}
                border={0}
                boxShadow={'2px 2px 8px rgba(0,0,0,0.2)'}
                type={'text'}
                value={name}
                onChange={(e) => getName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={'1.5rem'} isRequired>
              <FormLabel>Email: </FormLabel>
              <Input
                outline={0}
                outlineOffset={0}
                border={0}
                boxShadow={'2px 2px 8px rgba(0,0,0,0.2)'}
                type={'email'}
                value={email}
                onChange={(e) => getEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={'1.5rem'} isRequired>
              <FormLabel>Subiect: </FormLabel>
              <Input
                outline={0}
                outlineOffset={0}
                border={0}
                boxShadow={'2px 2px 8px rgba(0,0,0,0.2)'}
                type={'text'}
                value={subject}
                onChange={(e) => getSubject(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mesaj: </FormLabel>
              <Textarea
                outline={0}
                outlineOffset={0}
                border={0}
                boxShadow={'2px 2px 8px rgba(0,0,0,0.2)'}
                value={message}
                onChange={(e) => getMessage(e.target.value)}
              />
            </FormControl>
            <FormControl mb={'1.5rem'}>
              <FormHelperText fontSize={'.8rem'}>
                {' '}
                Campurile marcate cu *, sunt obligatorii
              </FormHelperText>

              <FormHelperText fontSize={'.8rem'}>
                {' '}
                Nu folosim datele percepute in nici un mod si nu sunt transmise
                catre o parte terță
              </FormHelperText>
            </FormControl>
            <FormControl
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Button
                w={'150px'}
                textTransform={'uppercase'}
                letterSpacing={'2px'}
                bg={'secondary'}
                color={'text'}
                _hover={'none'}
                _active={'none'}
                type="submit"
              >
                Trimite
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
