import {
  Box,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        articole: action.payload.articole,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
function ProjectListPage() {
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      articole,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://bogdanbola.babyfie.ro/api/articole/admin?page=${page}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        'https://bogdanbola.babyfie.ro/api/articole/new',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('Articol creat cu succes');
      dispatch({ type: 'CREATE_SUCCESS' });
      navigate(`/admin/${data.articol._id}`);
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };
  const deleteHandler = async (articol) => {
    if (window.confirm('Esti sigur ca vrei sa stergi articolul?')) {
      try {
        await axios.delete(
          `https://bogdanbola.babyfie.ro/api/articole/${articol._id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('Articol sters cu succes');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <Box
      minH={'calc(100vh -  130px)'}
      mx={['1rem', '3rem']}
      py={['2rem', '4rem']}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Helmet>
        <title>Lista Articole - Bogdan Bola</title>
      </Helmet>
      <Box
        maxW={'1100px'}
        w={'full'}
        display={'flex'}
        justifyContent={['center', null, 'space-between']}
        mb={'2rem'}
        flexWrap={'wrap'}
        gap={'2rem'}
      >
        <Heading as="h1" fontSize={'2rem'}>
          Lista articole
        </Heading>
        <Button
          type="button"
          onClick={createHandler}
          borderRadius={'0 1.5rem 0 1.5rem'}
          bg={'primary'}
          color={'text'}
          _hover={'none'}
        >
          Adauga articol nou
        </Button>
      </Box>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <>
          <TableContainer maxW={'100rem'} w="full">
            <Table variant="simple">
              <Thead bg={'primary'}>
                <Tr>
                  <Th color={'#fff'}>ID</Th>
                  <Th color={'#fff'}>TITLU</Th>
                  <Th color={'#fff'}>DATA</Th>
                  <Th color={'#fff'}>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {articole.map((articol) => (
                  <Tr key={articol._id}>
                    <Td>{articol._id}</Td>
                    <Td>{articol.title}</Td>
                    <Td>{articol.dataPostare}</Td>

                    <Td color={'#000'}>
                      <IconButton
                        fontSize={'1.5rem'}
                        onClick={() => navigate(`/admin/${articol._id}`)}
                        icon={<BiEdit />}
                      />{' '}
                      <IconButton
                        fontSize={'1.5rem'}
                        onClick={() => deleteHandler(articol)}
                        icon={<BiTrash />}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box maxW={'100rem'} mt={'1rem'} w="full" display={'flex'}>
            {[...Array(pages).keys()].map((x) => (
              <Link key={x + 1} to={`/admin/articole?page=${x + 1}`}>
                <Box
                  w={'fit-content'}
                  bg={x + 1 === Number(page) ? 'primary' : '#fff'}
                  boxSize={'25px'}
                  mr={3}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderRadius={'0.3rem'}
                  boxShadow={'0 0 1rem rgba(0,0,0,0.8)'}
                  outline={x + 1 === Number(page) ? '1px solid #fff' : '0'}
                  color={x + 1 === Number(page) ? 'text' : 'secondary'}
                  fontWeight={'bold'}
                >
                  {x + 1}
                </Box>
              </Link>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default ProjectListPage;
