import {
  Box,
  Button,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Hero from '../components/home/Hero';
import { getError } from '../Utils';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, articol: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const ArticolPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ articol }, dispatch] = useReducer(reducer, {
    loading: true,
    articol: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          `https://bogdanbola.babyfie.ro/api/articole/slug/${slug}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const location = useLocation();
  const currentUrl = 'https://bogdanbola.ro' + location.pathname;

  return (
    <Box
      w={'full'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={'column'}
      bg={'secondary'}
      color={'text'}
    >
      <Helmet>
        <title>{`${articol.title}`} - Bogdan Bola</title>
        <link rel="canonical" href={`${currentUrl}`} />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="csrf_token" content="" />
        <meta property="type" content="website" />
        <meta property="url" content={currentUrl} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" content={articol.etichete} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="_token" content="" />
        <meta name="robots" content="noodp" />
        <meta property="title" content={articol.title} />
        <meta property="quote" content={''} />
        <meta name="description" content={'Bogdan Bola'} />
        <meta property="image" content={articol.cover} />
        <meta property="og:locale" content="ro_RO" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={articol.title} />
        <meta property="og:quote" content={''} />
        <meta property="og:hashtag" content={'#BogdanBola'} />
        <meta property="og:image" content={articol.cover} />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="BogdanBola" />
        <meta property="og:description" content={articol.text} />
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
        alignItems={'flex-start'}
        justifyContent={'center'}
        gap={'2rem'}
        flexWrap={'wrap'}
        py={'3rem'}
      >
        <Box
          maxW={'50rem'}
          display={'flex'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          flexDir={'column'}
          h={['50vh', null, '70vh']}
        >
          <Image
            objectFit={'contain'}
            w={['300px', '600px']}
            h={['300px', '400px']}
            src={articol.cover}
            alt={articol.slug}
          />
          <Box color={'#Fff'}>
            <UnorderedList m={0} listStyleType={'none'} spacing={'6'}>
              <ListItem>Partajează articolul:</ListItem>
              <ListItem>
                <FacebookShareButton
                  url={currentUrl}
                  quote={'CampersTribe - World is yours to explore'}
                  hashtag="#BogdanBola"
                >
                  <FacebookIcon borderRadius={'1rem'} size={'2.5rem'} />
                </FacebookShareButton>
              </ListItem>
            </UnorderedList>
            {userInfo.isAdmin && (
              <UnorderedList listStyleType={'none'}>
                <ListItem>Editeaja articolul:</ListItem>
                <ListItem>
                  <Button
                    _hover={'none'}
                    bg={'primary'}
                    type="button"
                    color={'text'}
                    onClick={() => navigate(`/admin/${articol._id}`)}
                  >
                    Edit
                  </Button>
                </ListItem>
              </UnorderedList>
            )}
          </Box>
          <Box display={'none'}>
            <Heading as={'h2'}>Similare</Heading>
          </Box>
        </Box>
        <Box
          color={'text'}
          maxW={'50rem'}
          minH={'70vh'}
          px={['2rem', null, null, 0]}
        >
          <Heading textTransform={'capitalize'} mb={'1.5rem'} as={'h1'}>
            {articol.title}
          </Heading>
          <Text
            w={'full'}
            maxW={['350px', '700px']}
            lineHeight={'2'}
            dangerouslySetInnerHTML={{ __html: articol.text }}
          ></Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticolPage;
