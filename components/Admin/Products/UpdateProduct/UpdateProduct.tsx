import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';
import CloseIcon from '@mui/icons-material/Close';
import 'react-color-palette/lib/css/styles.css';
import Variant from '../../../../components/Admin/Products/Variant/Variant';
import Size from '../../../../components/Admin/Products/Size/Size';
import Color from '../../../../components/Admin/Products/Color/Color';
import { ProductApi } from '../../../../services/api/product';
import { getCookie } from '../../../../services/cookies';
import ModalImage from '../../../../components/Admin/Products/ModalImage';
import {
  AssetsParams,
  CategoryParams,
  VariantParams,
} from '../../../../services/types';
import { IItemVariant } from '../../../../services/interface';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ItemCategory from './MapListCategory';
import MapListCategory from './MapListCategory';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const validationSchema = yup.object({
  id: yup.number(),
  name: yup.string(),
  mainImg: yup.string(),
  discount: yup.string(),
  description: yup.string(),
  price: yup.string(),
  productCategoryId: yup.number(),
  variants: yup.array<VariantParams>(
    yup.object({
      id: yup.number(),
      name: yup.string(),
      property: yup.string(),
      addPrice: yup.number(),
    })
  ),
  assets: yup.array<AssetsParams>(
    yup.object({
      id: yup.number(),
      type: yup.string(),
      link: yup.string(),
    })
  ),
});

interface IUpdateProduct {
  data?: any;
  categoryList: CategoryParams[];
}

let countVariant = 0;
let otherVariantId = 0;

const fakeData = {
  id: -1,
  name: '',
  discount: '',
  description: '',
  price: '',
  productCategoryId: -1,
  variants: [],
  assets: [],
};

const UpdateProduct = ({ data, categoryList }: IUpdateProduct) => {
  const DATA_DETAIL = data ? data : fakeData;
  console.log('DATA_DETAIL: ', DATA_DETAIL);
  // all Variants
  const [variants, setVariants] = useState<VariantParams[]>([]);

  // size variants only
  const [sizeArray, setSizeArray] = useState<VariantParams[]>([]);

  // color variants only
  const [colorArray, setColorArray] = useState<VariantParams[]>([]);

  // other variants
  let OtherVariants: IItemVariant[] = []; // because in state can't catch for loop
  const [variantsList, setVariantsList] = useState<IItemVariant[]>([]);

  const [arrayImage, setArrayImage] = useState<AssetsParams[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const editorRef = useRef<any>(null);
  const categoryRef = useRef<any>(null);

  useEffect(() => {
    setVariants(DATA_DETAIL.variants);
    setArrayImage(DATA_DETAIL.assets);
  }, []);

  useEffect(() => {
    if (variants && variants.length > 0) {
      for (let i = 0; i < variants.length; i++) {
        if (variants[i].name === 'size') {
          setSizeArray((sizeArray) => [...sizeArray, variants[i]]);
        } else {
          if (variants[i].name === 'color') {
            setColorArray((colorArray) => [...colorArray, variants[i]]);
          } else {
            let isPush = false;
            OtherVariants.map((item) => {
              if (item.name === variants[i].name) {
                item.data.push(variants[i]);
                isPush = true;
              }
            });
            if (!isPush) {
              const newData: IItemVariant = {
                id: OtherVariants.length,
                name: variants[i].name,
                data: [variants[i]],
              };
              OtherVariants.push(newData);
            }
          }
        }
      }
    }
    setVariantsList(OtherVariants);
  }, [variants]);

  // const [countVariant, setCountVariant] = useState(0);

  const handleDeleteVariant = (i: string) => {
    setVariantsList(variantsList.filter((item) => item.name !== i));
  };

  const handleAddOtherVariant = () => {
    // setCountVariant(countVariant + 1);
    let data = {
      id: countVariant--,
      name: '',
      property: '',
      addPrice: 0,
    };
    let newVariant = {
      id: otherVariantId--,
      name: '',
      data: [data],
    };
    setVariantsList((variantsList) => [...variantsList, newVariant]);
  };

  const handleAddOtherVariantItem = (name: string) => {
    let data = {
      id: otherVariantId--,
      name: '',
      property: '',
      addPrice: 0,
    };
    setVariantsList(
      variantsList.map((iterator) => {
        if (iterator.name === name) {
          iterator.data.push(data);
          return iterator;
        } else {
          return iterator;
        }
      })
    );
  };

  const handleChangeOtherVariantItem = (
    index: number,
    variantName: string,
    data: VariantParams,
    price: number,
    property: string
  ) => {
    let newData = {
      id: data.id,
      name: variantName,
      property: property,
      addPrice: price,
    };
    setVariantsList(
      variantsList.map((iterator) => {
        if (iterator.name === variantName) {
          iterator.data = iterator.data.map((it, indexIt) =>
            indexIt === index ? newData : it
          );
          return iterator;
        } else {
          return iterator;
        }
      })
    );
  };

  const handleOnChangeVariantName = (index: number, name: string) => {
    setVariantsList(
      variantsList.map((item, i) => {
        if (i === index) {
          item.name = name;
          return item;
        } else {
          return item;
        }
      })
    );
  };

  const onClickBtn = () => {
    let finalArray: VariantParams[] = [];
    finalArray = sizeArray;
    finalArray = finalArray.concat(colorArray);
    variantsList.forEach((value) => {
      value.data.forEach((_value) => finalArray.push(_value));
    });

    formik.values.mainImg = mainImage;
    formik.values.assets = arrayImage;
    formik.values.productCategoryId = categoryRef.current.value;
    formik.values.variants = finalArray;
    console.log('formik values: ', formik.values);
  };

  const handleDeleteVariantItem = (property: string) => {
    setVariantsList(
      variantsList.map((v) => {
        v.data = v.data.filter((_v) => _v.property !== property);
        return v;
      })
    );
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      id: DATA_DETAIL.id,
      name: DATA_DETAIL.name,
      mainImg: DATA_DETAIL.mainImg,
      discount: DATA_DETAIL.discount,
      description: DATA_DETAIL.description,
      price: DATA_DETAIL.price,
      productCategoryId: DATA_DETAIL.productCategoryId,
      variants: DATA_DETAIL.variants,
      assets: DATA_DETAIL.assets,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      validationSchema.validate(values);
      const token = await getCookie('token');
      let finalArray: VariantParams[] = [];
      finalArray = sizeArray;
      finalArray = finalArray.concat(colorArray);
      variantsList.forEach((value) => {
        value.data.forEach((_value) => finalArray.push(_value));
      });

      formik.values.mainImg = mainImage;
      formik.values.assets = arrayImage;
      formik.values.productCategoryId = categoryRef.current.value;
      formik.values.variants = finalArray;
      // const res = await ProductApi.addProduct(token as string, values);
      console.log('add pro not in if');

      try {
        if (DATA_DETAIL.id === -1) {
          const res = await ProductApi.addProduct(token as string, values);
          setOpenSnackbar(true);
          // console.log('add pro');
          if (res) {
            setTimeout(() => {
              router.push('/admin/product');
            }, 2000);
          }
        } else {
          const res = await ProductApi.updateProduct(token as string, values);
          setOpenSnackbar(true);

          if (res) {
            setTimeout(() => {
              router.push('/admin/product');
            }, 2000);
          }
          console.log('update pro');
        }
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });
  const [mainImage, setMainImage] = useState(formik.values.mainImg);

  return (
    <Grid>
      <Paper elevation={10} sx={{ pb: '50px' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar}
          autoHideDuration={3000}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            {DATA_DETAIL.id === -1
              ? 'Create Product Success !'
              : 'Update Product Success !'}
          </Alert>
        </Snackbar>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ position: 'relative' }}
          >
            <h2>
              {DATA_DETAIL.id === -1 ? 'Create Product' : 'Update Product'}
            </h2>
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
              // onClick={() => onClickBtn()}
            >
              {DATA_DETAIL.id === -1 ? 'Create Product' : 'Update Product'}
            </Button>
          </Grid>

          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
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
                    src={mainImage}
                    alt={'main image'}
                    width={300}
                    height={440}
                  />
                </Box>
              ) : (
                <ModalImage
                  title='Add main Image'
                  setMainImage={setMainImage}
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
                  //   helperText={formik.touched.name && formik.errors.name}
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
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  //   helperText={formik.touched.price && formik.errors.price}
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
                    formik.touched.discount && Boolean(formik.errors.discount)
                  }
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth size='small'>
                  <InputLabel htmlFor='categoryDescription'>Type</InputLabel>
                  <Select
                    native
                    defaultValue={DATA_DETAIL.productCategoryId}
                    label='Type'
                    name='categoryDescription'
                    id='categoryDescription'
                    inputRef={categoryRef}
                  >
                    <MapListCategory
                      data={categoryList}
                      fontsize={18}
                      left={0}
                      weight={'bold'}
                    />
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                {sizeArray && (
                  <Size
                    sizeArray={sizeArray}
                    setSizeArray={setSizeArray}
                    formikData={formik.values.variants}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Color
                  setColorArray={setColorArray}
                  colorArray={colorArray}
                  formikData={formik.values.variants}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {variantsList.map((data, index) => (
                  <Variant
                    key={data.id}
                    index={index}
                    variantName={data.name}
                    variantItems={data.data}
                    handleDeleteVariant={handleDeleteVariant}
                    handleOnChangeVariantName={handleOnChangeVariantName}
                    handleAddOtherVariantItem={handleAddOtherVariantItem}
                    handleChangeOtherVariantItem={handleChangeOtherVariantItem}
                    handleDeleteVariantItem={handleDeleteVariantItem}
                  />
                ))}
                <Button
                  variant='outlined'
                  sx={{ fontWeight: 'bold', mt: 1 }}
                  onClick={() => handleAddOtherVariant()}
                >
                  New variant &nbsp;
                  <PlaylistAddIcon />
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Editor
                  id='tod4u05uf72as4w1rg42bpbdrryz3ds79mhj4y9ozgh75hxf'
                  apiKey='tod4u05uf72as4w1rg42bpbdrryz3ds79mhj4y9ozgh75hxf'
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={DATA_DETAIL.description}
                  onEditorChange={(stringifiedHtmlValue) => {
                    formik.setFieldValue('description', stringifiedHtmlValue);
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
                  arrayImage={arrayImage}
                  setArrayImage={setArrayImage}
                />
              </Grid>
            </Grid>
          </Box>
          {arrayImage && arrayImage.length > 0 && (
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
                  p: 3,
                }}
              >
                {arrayImage &&
                  arrayImage.length > 0 &&
                  arrayImage.map((data, index) => (
                    <figure
                      key={index}
                      style={{
                        width: '100%',
                        height: '100%',
                        margin: 0,
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={data.link}
                        alt='chosen'
                        width={150}
                        height={200}
                      />
                    </figure>
                  ))}
              </Box>
            </Box>
          )}
        </form>
      </Paper>
    </Grid>
  );
};

export default UpdateProduct;
