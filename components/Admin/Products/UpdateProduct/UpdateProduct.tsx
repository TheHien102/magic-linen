import {
  Box,
  Button,
  Grid,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
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

interface IUpdateProduct {
  data: any;
  categoryList: CategoryParams[];
}

const UpdateProduct = ({ data, categoryList }: IUpdateProduct) => {
  const DATA_DETAIL = data ? data : '';
  const [variants, setVariants] = useState<VariantParams[]>([]);
  // const DATA_VARIANT: VariantParams[] = data ? data.variants : [];
  const [sizeArray, setSizeArray] = useState<VariantParams[]>([]);
  const [colorArray, setColorArray] = useState<VariantParams[]>([]);
  const [variantsArray, setVariantsArray] = useState<IItemVariant[]>([]);
  const [arrayImage, setArrayImage] = useState<AssetsParams[]>([]);
  const editorRef = useRef<any>(null);
  let OtherVariants: IItemVariant[] = [];
  console.log('DATA_DETAIL: ', DATA_DETAIL);
  console.log('categoryList: ', categoryList);
  useEffect(() => {
    setVariants(data.variants);
    setArrayImage(DATA_DETAIL.assets);
    console.log('data: ', data);
  }, []);

  useEffect(() => {
    if (variants.length > 0) {
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
                name: variants[i].name,
                data: [variants[i]],
              };
              OtherVariants.push(newData);
            }
          }
        }
      }
    }
    setVariantsArray(OtherVariants);
  }, [variants]);

  // useEffect(() => {
  //   if (variantsArray.length > 0) {
  //     console.log('change', variantsArray);
  //   }
  // }, [variantsArray]);

  const [countVariant, setCountVariant] = useState(0);

  const handleDeleteVariant = (i: string) => {
    setVariantsArray(variantsArray.filter((item) => item.name !== i));
  };

  const handleAddVariant = () => {
    setCountVariant(countVariant + 1);
    let data = {
      id: countVariant,
      name: '',
      property: '',
      addPrice: 0,
    };
    let newVariant = {
      name: '',
      data: [data],
    };
    setVariantsArray((variantsArray) => [...variantsArray, newVariant]);
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: DATA_DETAIL.name,
      mainImg: DATA_DETAIL.mainImg,
      discount: DATA_DETAIL.discount,
      description: DATA_DETAIL.description,
      price: DATA_DETAIL.price,
      productCategoryID: DATA_DETAIL.productCategoryID,
      variants: [] as any,
      assets: [] as any,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   router.push('/dashboard');
      const token = getCookie('token');

      console.log(' values: ', values);

      try {
        const res = await ProductApi.addProduct(token as string, values);
        console.log('success: ', res);
        if (res) {
          router.push('/admin/product');
        }
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });
  const [age, setAge] = useState(0);

  const handleChangeType = (e: {
    target: { value: SetStateAction<number> };
  }) => {
    setAge(e.target.value);
    let id = Number(e.target.value);
    formik.values.productCategoryID = id;
  };

  const mapListItem: any = (data: CategoryParams[]) => {
    data.map((it) => {
      if (it.categoryList) {
        return mapListItem(it.categoryList);
      } else {
        return (
          <MenuItem key={it.id} sx={{ fontWeight: 'bold' }} value={it.name}>
            {it.name}
          </MenuItem>
        );
      }
    });
  };

  //Show Image
  const [mainImage, setMainImage] = useState(formik.values.mainImg);

  useEffect(() => {
    if (mainImage.length != 0) {
      fetch(mainImage[mainImage.length - 1])
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'dot.png', blob);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            formik.values.mainImg = reader.result as any;
          };
        });
    }

    // if (arrayImage.length != 0) {
    //   fetch(arrayImage[arrayImage.length - 1])
    //     .then((res) => res.blob())
    //     .then((blob) => {
    //       const file = new File([blob], 'dot.png', blob);
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onloadend = () => {
    //         let data = {
    //           type: 'image',
    //           data: reader.result,
    //         };
    //         formik.values.assets.push(data);
    //       };
    //     });
    // }

    console.log('variants: ', formik.values.variants);
  }, [mainImage, arrayImage]);

  return (
    <Grid>
      <Paper elevation={10} sx={{ pb: '50px' }}>
        <form>
          <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ position: 'relative' }}
          >
            <h2>Update product</h2>
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
              Update Product
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
                  {/* <InputLabel id='productCategoryID'>Type</InputLabel>
                  <Select
                    labelId='productCategoryID'
                    id='productCategoryID'
                    value={age}
                    defaultValue={DATA_DETAIL.categoryDescription}
                    label='Type'
                    sx={{ color: 'black' }}
                    onChange={(e: any) => handleChangeType(e)}
                  >
                    {categoryList &&
                      categoryList.length !== 0 &&
                      categoryList.map((data: any, index: number) => (
                        <MenuItem key={index} value={data.categoryDescription}>
                          {data.categoryDescription}
                        </MenuItem>
                      ))}
                  </Select> */}
                  <InputLabel htmlFor='grouped-select'>Grouping</InputLabel>
                  <Select defaultValue='' id='grouped-select' label='Grouping'>
                    <>{mapListItem(categoryList)}</>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <>
                  {sizeArray.length > 0 && (
                    <Size
                      sizeArray={sizeArray}
                      formikData={formik.values.variants}
                    />
                  )}
                </>
              </Grid>
              <Grid item xs={12} md={6}>
                <Color
                  colorArray={colorArray}
                  formikData={formik.values.variants}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {variantsArray.map((data) => (
                  <Variant
                    key={data.name}
                    handleDeleteVariant={handleDeleteVariant}
                    variantName={data.name}
                    variantsArray={data.data}
                    formikData={formik.values.variants}
                  />
                ))}
                <Button
                  variant='outlined'
                  sx={{ fontWeight: 'bold', mt: 1 }}
                  onClick={() => handleAddVariant()}
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
                  p: 3,
                }}
              >
                {arrayImage.length > 0 &&
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
                        // layout={'responsive'}
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
