import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
function EditProductPage() {
  const navigate = useNavigate();

  const params = useParams();
  const { id: articolId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [title, setTitle] = useState('');
  const [slugId, setSlugId] = useState(0);
  const [dataPostare, setDataPostare] = useState('');
  const [images, setImages] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [etichete, setEtichete] = useState([]);
  const [cover, setCover] = useState('');
  const [text, setText] = useState('');
  const [slug, setSlug] = useState('');
  const [link, setLink] = useState('');
  const [eticheta, setEticheta] = useState('');

  function makeSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'àáäâăèéëêìíïîòóöôùúüûñçțș·/_,:;';
    var to = 'aaaaaeeeeiiiioooouuuuncts------';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });

        const { data } = await axios.get(
          `https://bogdanbola.babyfie.ro/api/articole/${articolId}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setTitle(data.title);
        setSlugId(data.slugId);
        setDataPostare(data.dataPostare);
        setImages(data.images);
        setCategorie(data.categorie);
        setEtichete(data.etichete);
        setCover(data.cover);
        setText(data.text);
        setLink(data.link);

        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [articolId, userInfo.token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setSlug(makeSlug(title));
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `https://bogdanbola.babyfie.ro/api/articole/${articolId}`,
        {
          _id: articolId,
          text,
          slugId,
          dataPostare,
          images,
          cover,
          title,
          categorie,
          etichete,
          slug,
          link,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Proiect editat cu succes');
      navigate('/admin/articole');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(
        'https://bogdanbola.babyfie.ro/api/upload',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setCover(data.secure_url);
      }
      toast.success('Pozele au fost urcate cu succes.');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    setImages(images.filter((x) => x !== fileName));
    toast.success('Poza stearsa cu succes.');
  };

  const deleteEtichete = async (fileName, f) => {
    setEtichete(etichete.filter((x) => x !== fileName));
    toast.success('Eticheta stearsa cu succes.');
  };
  useEffect(() => {
    setSlug(makeSlug(title));
  }, [title]);
  const createPermaLink = () => {
    setLink('/' + slug + '/' + slugId);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const richText = (content, delta, source, editor) => {
    setText(editor.getHTML());
  };

  const delayOnChange = () => {
    setEtichete([...etichete, eticheta]);
    setEticheta('');
  };

  return (
    <Box
      minH={'60vh'}
      mx="3rem"
      py="4rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Helmet>
        <title>Editare Articol - Peak & Go</title>
      </Helmet>
      <Heading as={'h1'}>Editeaza articolul {title.slice(0, 10)}</Heading>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Box
          marginTop={'3rem'}
          display={'flex'}
          justifyContent={'center'}
          w={'100%'}
          maxW={'1100px'}
        >
          <form onSubmit={submitHandler}>
            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="name" fontWeight={'bold'}>
                Titlu:{' '}
              </FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="name" fontWeight={'bold'}>
                ID link:{' '}
              </FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                value={slugId}
                onChange={(e) => setSlugId(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="name" fontWeight={'bold'}>
                Permalink:{' '}
              </FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <Button
                _hover={'none'}
                bg={'primary'}
                disabled={loadingUpdate}
                type="button"
                color={'text'}
                onClick={createPermaLink}
              >
                Creaza permalink
              </Button>
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="name" fontWeight={'bold'}>
                Data Postare:{' '}
              </FormLabel>
              <Input
                type={'date'}
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                value={dataPostare}
                onChange={(e) => setDataPostare(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="categorie">Categorie:</FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                type="text"
                value={categorie}
                isRequired
                onChange={(e) => setCategorie(e.target.value)}
              />
            </FormControl>

            <FormControl my={'3rem'}>
              <FormLabel>Text:</FormLabel>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={text}
                onChange={richText}
              ></ReactQuill>
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="etichete">Adauga Etichete</FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                value={eticheta}
                onChange={(e) => setEticheta(e.target.value)}
              />
              <Button
                _hover={'none'}
                bg={'primary'}
                type="button"
                color={'text'}
                onClick={delayOnChange}
              >
                <SmallAddIcon />
              </Button>
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel fontWeight={'bold'}>Etichete curente:</FormLabel>
              <UnorderedList listStyleType={'none'}>
                {etichete.map((eticheta) => (
                  <ListItem key={eticheta} mb={'0.5rem'}>
                    {eticheta}
                    <IconButton
                      icon={<BiTrash />}
                      onClick={() => deleteEtichete(eticheta)}
                      marginLeft={'0.5rem'}
                      bg={'primary'}
                      color={'text'}
                      _hover={'none'}
                    />
                  </ListItem>
                ))}
              </UnorderedList>
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Poza cover:
              </FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                value={cover}
                onChange={(e) => setCover(e.target.value)}
              />
            </FormControl>
            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Incarca poza cover:
              </FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                type={'file'}
                onChange={(e) => uploadFileHandler(e, false)}
              />
            </FormControl>
            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Imagini articol
              </FormLabel>
              {images.length === 0 && <MessageBox>Nici o poza</MessageBox>}
              <UnorderedList listStyleType={'none'}>
                {images.map((x) => (
                  <ListItem w={'300px'} key={x} mb={'0.5rem'}>
                    {x}

                    <IconButton
                      marginLeft={'0.5rem'}
                      bg={'primary'}
                      color={'text'}
                      _hover={'none'}
                      onClick={() => deleteFileHandler(x)}
                      icon={<BiTrash />}
                    />
                  </ListItem>
                ))}
              </UnorderedList>
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Incarca pozele:
              </FormLabel>
              <Input
                borderTop={0}
                borderLeft={0}
                borderWidth={'3px'}
                borderColor={'#000'}
                w={['300px', '800px']}
                type={'file'}
                onChange={(e) => uploadFileHandler(e, true)}
              />
            </FormControl>

            <Button
              _hover={'none'}
              bg={'primary'}
              disabled={loadingUpdate}
              type="submit"
              color={'text'}
            >
              Editeaza Articol
            </Button>

            {loadingUpdate && <LoadingBox></LoadingBox>}
          </form>
        </Box>
      )}
    </Box>
  );
}

export default EditProductPage;
