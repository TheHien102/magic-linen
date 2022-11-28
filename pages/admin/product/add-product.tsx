import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  dividerClasses,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import { Key, SetStateAction, useEffect, useRef, useState } from 'react';
import { ProductApi } from '../../../services/api/product';
import { getCookie } from '../../../services/cookies';
import ModalImage from '../../../components/Admin/Products/ModalImage';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';
import CloseIcon from '@mui/icons-material/Close';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import { MuiChipsInput, MuiChipsInputChip } from 'mui-chips-input';
import Modal from '@mui/material/Modal';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { GetServerSidePropsContext } from 'next';
import ModalVariant from '../../../components/Admin/Products/ModalVariant/ModalVariant';
import Variant from '../../../components/Admin/Products/Variant/Variant';
import Size from '../../../components/Admin/Products/Size/Size';
import Color from '../../../components/Admin/Products/Color/Color';
import UpdateProduct from '../../../components/Admin/Products/UpdateProduct/UpdateProduct';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  mainImg: yup.string().required('Main image is required'),
  discount: yup.string(),
  description: yup.string().required('Description is required'),
  price: yup.string().required('Price is required'),
  productCategoryID: yup.number(),
  variants: yup.array<any>(
    yup.object({
      name: yup.string(),
      property: yup.string(),
      addPrice: yup.number(),
    })
  ),
  assets: yup.array<any>(
    yup.object({
      type: yup.string(),
      data: yup.string(),
    })
  ),
});

export default function AddProduct({ categoryList }: any) {
  return (
    <div>
      <Head>
        <title>Add Product</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        {/* <Grid>
          <Paper elevation={10}>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ position: 'relative' }}
              >
                <h2>Add product</h2>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Add Product
                </Button>
              </Grid>

              <Box
                sx={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
              >
                <Box
                  sx={{
                    border: '2px solid gray',
                    borderRadius: '5px',
                    width: 300,
                    height: 350,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {mainImage ? (
                    <Box sx={{ p: 2.5, position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          cursor: 'pointer',
                        }}
                        onClick={() => setMainImage('')}
                      >
                        <CloseIcon />
                      </Box>
                      <Image
                        src={mainImage[0]}
                        alt={'main image'}
                        width={300}
                        height={440}
                      />
                    </Box>
                  ) : (
                    <ModalImage
                      title='Add main Image'
                      mainImage={mainImage}
                      setArrayImage={setMainImage}
                    />
                  )}
                </Box>
                <Grid container sx={{ marginTop: '5px' }} spacing={3.5}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label='Name'
                      fullWidth
                      id='name'
                      name='name'
                      size='small'
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      FormHelperTextProps={{
                        style: { position: 'absolute', bottom: '-25px' },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      label='Price'
                      fullWidth
                      id='price'
                      size='small'
                      name='price'
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                      FormHelperTextProps={{
                        style: { position: 'absolute', bottom: '-25px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      type={'number'}
                      fullWidth
                      id='discount'
                      size='small'
                      name='discount'
                      label='Discount'
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.discount &&
                        Boolean(formik.errors.discount)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size='small'>
                      <InputLabel id='productCategoryID'>Type</InputLabel>
                      <Select
                        labelId='productCategoryID'
                        id='productCategoryID'
                        value={age}
                        label='Type'
                        sx={{ color: 'black' }}
                        onChange={(e: any) => handleChangeType(e)}
                      >
                        {categoryList &&
                          categoryList.length !== 0 &&
                          categoryList.map((data: any, index: number) => (
                            <MenuItem key={index} value={data.id}>
                              {data.categoryName}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Size sizeArray={[]} formikData={formik.values.variants} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Color
                      colorArray={[]}
                      formikData={formik.values.variants}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Variant
                      variantName=''
                      handleDeleteVariant={() => {}}
                      variantsArray={[]}
                      formikData={formik.values.variants}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Editor
                      id='tod4u05uf72as4w1rg42bpbdrryz3ds79mhj4y9ozgh75hxf'
                      apiKey='tod4u05uf72as4w1rg42bpbdrryz3ds79mhj4y9ozgh75hxf'
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      // onChange={() => log()}
                      onEditorChange={(stringifiedHtmlValue) => {
                        formik.setFieldValue(
                          'description',
                          stringifiedHtmlValue
                        );
                      }}
                      init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                          'advlist',
                          'autolink',
                          'lists',
                          'link',
                          'image',
                          'charmap',
                          'preview',
                          'anchor',
                          'searchreplace',
                          'visualblocks',
                          'code',
                          'fullscreen',
                          'insertdatetime',
                          'media',
                          'table',
                          'code',
                          'help',
                          'wordcount',
                        ],
                        toolbar:
                          'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style:
                          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ModalImage
                      title='Add subs Image'
                      setArrayImage={setArrayImage}
                    />
                  </Grid>
                </Grid>
              </Box>
              {arrayImage.length > 0 && (
                <Box
                  sx={{
                    border: '2px solid gray',
                    borderRadius: '5px',
                    marginTop: '20px',
                    p: 1,
                    width: 'fit-content',
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
                    Sub Images
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    {arrayImage.length > 0 &&
                      arrayImage.map((data, index) => (
                        <figure
                          key={index}
                          style={{ width: '150px', height: '150px', margin: 0 }}
                        >
                          <img
                            src={data}
                            alt='chosen'
                            style={{
                              objectFit: 'contain',
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        </figure>
                      ))}
                  </Box>
                </Box>
              )}
            </form>
          </Paper>
        </Grid> */}
        <UpdateProduct data={undefined} categoryList={categoryList} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);

  if (token) {
    try {
      const [res] = await Promise.all([ProductApi.categoryList(token)]);
      return {
        props: {
          categoryList: res.data.data,
        },
      };
    } catch (e) {}

    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}
