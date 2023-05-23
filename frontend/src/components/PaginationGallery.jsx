import { Box, Text } from '@chakra-ui/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        articole: action.payload,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const PaginationGallery = () => {
  const [{ articole }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    articole: [],
  });
  useEffect(() => {
    Aos.init({ disabled: window.innerWidth < 600 });
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `https://bogdanbola.babyfie.ro/api/articole/home`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      w={'full'}
      maxW={'100rem'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={'column'}
      gap={'4rem'}
    >
      <Box
        color={'text'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flex={'1'}
        flexWrap={'wrap'}
        gap={'2rem'}
      >
        {articole.map((articol) => (
          <Link key={articol.slug} to={`/${articol.slug}/${articol.slugId}`}>
            <Box
              className="postsCard"
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              position={'relative'}
              data-aos={'fade'}
              data-aos-duration={'1500'}
              data-aos-easing={'ease-in-out'}
              data-aos-delay={'400'}
            >
              <Box
                w={['300px', null, '450px']}
                h={['200px', null, '300px']}
                borderRadius={'1rem'}
                backgroundImage={`url(${articol.cover})`}
                backgroundPosition={'center'}
                backgroundRepeat={'no-repeat'}
                backgroundSize={'cover'}
                boxShadow={'5px 5px 16px rgba(0,0,0,0.25)'}
                transition={'all .5s ease-in-out'}
                _hover={{ filter: 'grayscale(1)' }}
              ></Box>
              <Text
                w={'300px'}
                position={'absolute'}
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
                {articol.title}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default PaginationGallery;
