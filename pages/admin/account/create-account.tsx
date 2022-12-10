import { LockOutlined } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { SelectChangeEvent } from '@mui/material/Select';
import { SetStateAction, useEffect, useState } from 'react';
import { ProductApi } from '../../../services/api/product';
import { getCookie } from '../../../services/cookies';
import UploadImage from '../../../components/Global/UploadImage/UploadImage';
import { AccountApi } from '../../../services/api/account';
import CloseIcon from '@mui/icons-material/Close';
import ModalImage from '../../../components/Admin/Products/ModalImage';
import Image from 'next/image';
import { GroupApi } from '../../../services/api/group';
import { GroupParams } from '../../../services/types';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  email: yup.string().required('Email is required'),
  fullName: yup.string().required('Full name is required'),
  avatarPath: yup.string(),
  groupId: yup.number().required('Kind is required'),
  status: yup.number(),
  phone: yup.string().required('Phone is required'),
});

export default function CreateAdmin() {
  const [kind, setKind] = useState('');
  const [groupList, setGroupList] = useState<GroupParams[]>([]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
      phone: '',
      groupId: 0,
      status: 1,
      avatarPath: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const token = await getCookie('token');
      try {
        if (token) {
          formik.values.avatarPath = mainImage;
          console.log('values: ', values);

          AccountApi.createAdmin(token, values).then(() => {
            setOpenSnackbar(true);
            router.push('/admin/account/view-account');
          });
        }
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });

  useEffect(() => {
    getAllGroup();
  }, []);

  const getAllGroup = async () => {
    const token = await getCookie('token');
    if (token) {
      const result = await GroupApi.listAllGroup(token);

      console.log(result.data.data);

      if (result) {
        setGroupList(result.data.data);
      }
    }
  };

  const handleChangeKind = (event: SelectChangeEvent) => {
    setKind(event.target.value);
    formik.values.groupId = Number(event.target.value);
  };

  const [mainImage, setMainImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <div>
      <Head>
        <title>Create Admin</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
          >
            <Alert severity='success' sx={{ width: '100%' }}>
              Create New Admin Success !
            </Alert>
          </Snackbar>
          <Box
            sx={{
              border: '2px solid gray',
              borderRadius: '5px',
              width: 240,
              height: 320,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: 3,
              mt: 10,
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
                  width={320}
                  height={440}
                />
              </Box>
            ) : (
              <ModalImage title='Add Avatar' setMainImage={setMainImage} />
            )}
          </Box>
          <Grid>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ position: 'relative' }}
                >
                  <h2>Create Admin</h2>
                  <Button
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: '20px',
                      fontWeight: 'bold',
                    }}
                    type='submit'
                    color='primary'
                    variant='contained'
                  >
                    Create
                  </Button>
                </Grid>
                <Grid
                  container
                  sx={{ marginTop: '5px', maxWidth: '800px' }}
                  spacing={2.5}
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      label='Username'
                      fullWidth
                      size='small'
                      id='username'
                      name='username'
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                      FormHelperTextProps={{
                        style: { position: 'absolute', bottom: '-25px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size='small'
                      id='email'
                      name='email'
                      label='Email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label='Password'
                      fullWidth
                      type='password'
                      size='small'
                      id='password'
                      name='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      FormHelperTextProps={{
                        style: { position: 'absolute', bottom: '-25px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label='Full Name'
                      fullWidth
                      size='small'
                      id='fullName'
                      name='fullName'
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.fullName &&
                        Boolean(formik.errors.fullName)
                      }
                      helperText={
                        formik.touched.fullName && formik.errors.fullName
                      }
                      FormHelperTextProps={{
                        style: { position: 'absolute', bottom: '-25px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label='Phone'
                      fullWidth
                      size='small'
                      id='phone'
                      name='phone'
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                      FormHelperTextProps={{
                        style: { position: 'absolute', bottom: '-25px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth size='small'>
                      <InputLabel id='kind'>Kind</InputLabel>
                      <Select
                        labelId='kind'
                        id='kind'
                        value={kind}
                        label='Kind'
                        placeholder='Kind'
                        sx={{ color: 'black', textTransform: 'capitalize' }}
                        onChange={handleChangeKind}
                        error={
                          formik.touched.groupId &&
                          Boolean(formik.errors.groupId)
                        }
                      >
                        {groupList &&
                          groupList.map(data => (
                            <MenuItem
                              key={data.id}
                              value={data.id}
                              // onClick={handleGetMenuItemValue}
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {data.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Box>
      </Layout>
    </div>
  );
}
