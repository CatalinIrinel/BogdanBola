import { Box, Image, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Sidebar = ({ openBar, toggle }) => {
  return (
    <Box
      onClick={toggle}
      position={'fixed'}
      zIndex={100000}
      w={['full', '300px']}
      h={'100%'}
      top={0}
      transition={'all .8s ease-in-out'}
      right={`${openBar ? 0 : '-100%'}`}
      opacity={`${openBar ? '100%' : 0}`}
      display={'flex'}
      flexDir={'column'}
      alignItems={'flex-end'}
      justifyContent={'flex-start'}
      gap={'3rem'}
      bg={'primary'}
      p={'2rem 3rem'}
      boxShadow={'-.5rem 0 8px rgba(0,0,0,0.3)'}
    >
      <CloseIcon color={'#fff'} fontSize={'1.5rem'} onClick={toggle} />
      <Box
        w={'full'}
        display={'flex'}
        flexDir={'column'}
        alignItems={['center', 'flex-start']}
        gap={'3rem'}
      >
        <Image boxSize={'100px'} src={'/images/LogoW.png.webp'} />
        <UnorderedList
          color={'#fff'}
          listStyleType={'none'}
          display={'flex'}
          flexDir={'column'}
          gap={'3rem'}
          fontWeight={'bold'}
          fontSize={'1.5rem'}
          alignItems={['center', 'flex-start']}
          margin={0}
        >
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/'} onClick={toggle}>
              Acasă
            </Link>
          </ListItem>
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/despre'} onClick={toggle}>
              Despre Mine
            </Link>
          </ListItem>
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/articole'} onClick={toggle}>
              Articole
            </Link>
          </ListItem>
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/proiecte'} onClick={toggle}>
              Proiecte
            </Link>
          </ListItem>
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/contacteaza-ma'} onClick={toggle}>
              Contactează-mă
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Sidebar;
