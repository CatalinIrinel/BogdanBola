import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const Navbar = ({ toggle }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    navigate('/');
  };
  return (
    <Box
      w={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      px={['2rem', null, null, '8rem']}
      height={'130px'}
      position={'relative'}
      zIndex={'10000'}
      bg={'rgba(0,0,0,0.4)'}
    >
      <Box
        w={'full'}
        maxW={'100rem'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        py={'3em'}
      >
        <Link className="loglink" to="/logare">
          <Image
            boxSize={['50px', '90px']}
            src={'/images/LogoW.png.webp'}
            alt={'Deputat Bogdan Bola - Forta Dreptei'}
          />
        </Link>

        <UnorderedList
          color={'#fff'}
          listStyleType={'none'}
          display={['none', null, 'flex']}
          gap={'3rem'}
          fontWeight={'bold'}
          fontSize={'1.5rem'}
          alignItems={'center'}
          margin={0}
        >
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/'}>Acasă</Link>
          </ListItem>
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/despre'}>Despre Mine</Link>
          </ListItem>
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/articole'}>Articole</Link>
          </ListItem>

          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/proiecte'}>Proiecte</Link>
          </ListItem>
          <ListItem
            w={'fit-content'}
            borderBottom={'1px solid transparent'}
            transition={'all .8s ease-in-out'}
            _hover={{ borderBottom: '1px solid #fff' }}
          >
            <Link to={'/contacteaza-ma'}>Contactează-mă</Link>
          </ListItem>
        </UnorderedList>
        <Box display={['none', null, null, 'block']} color={'#fff'}>
          {userInfo && userInfo.isAdmin && (
            <Menu id="admin-nav-dropdown">
              <MenuButton display="flex" alignItems="center">
                <Avatar name={userInfo.name} bg="secondary" color="#fff">
                  <AvatarBadge
                    boxSize={'1rem'}
                    bg={'green.500'}
                    border={'none'}
                  />
                </Avatar>
              </MenuButton>
              <MenuList bg={'primary'}>
                <Link to="/admin/articole">
                  {' '}
                  <MenuItem _focus={{ background: 'brand.500', color: '#fff' }}>
                    Articole
                  </MenuItem>
                </Link>
                <MenuDivider />{' '}
                <MenuItem
                  onClick={signoutHandler}
                  _focus={{ background: 'brand.500', color: '#fff' }}
                >
                  {' '}
                  Delogare
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
        <IconButton
          display={['block', null, 'none']}
          onClick={toggle}
          _active={'none'}
          colorScheme={'white'}
          fontSize={'2rem'}
          icon={<HamburgerIcon />}
          aria-label={'navbar-meniu'}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
