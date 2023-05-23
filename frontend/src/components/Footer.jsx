import {
  Box,
  Icon,
  Image,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { FaFacebook, FaInstagram, FaCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      w={'full'}
      bg={'#043306'}
      display={'flex'}
      flexWrap={'wrap'}
      alignItems={'center'}
      flexDir={['column', 'row']}
      justifyContent={'space-between'}
      px={['2rem', null, null, '8rem']}
      py={'2rem'}
      color={'#e8e8e8'}
      gap={['2rem', 0]}
      boxShadow={'0 -1rem 1rem rgba(0,0,0,0.4)'}
    >
      <Box>
        <Image w={'70px'} height={'70px'} src={'/images/LogoW.png.webp'} />
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexWrap={'wrap'}
        gap={'.5rem'}
      >
        Created by{' '}
        <Link
          color={'#a89cf5'}
          target="_blank"
          aria-label="Peak & Go"
          rel="noreferrer"
          href={'https://peakngo.com'}
        >
          Peak & Go - Web.
        </Link>{' '}
        All rights reserved <Icon fontSize={'1.25rem'} as={FaCopyright} /> Bola
        Bogdan.
      </Box>
      <Box>
        <UnorderedList
          m={0}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'2rem'}
          listStyleType={'none'}
          fontSize={'1.5rem'}
        >
          <ListItem>
            <Link
              _hover={{ color: '#4267B2' }}
              href="https://www.facebook.com/Bogdan.Bola"
              target="_blank"
              aria-label="facebook"
              rel="noreferrer"
            >
              <Icon as={FaFacebook} />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              _hover={{ color: '#C13584' }}
              target="_blank"
              aria-label="instagram"
              rel="noreferrer"
              href="https://www.instagram.com/bolabogdan"
            >
              <Icon as={FaInstagram} />
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Footer;
