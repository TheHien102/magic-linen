import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import styles from '../../../styles/Home.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { SelectChangeEvent } from '@mui/material/Select';
import { SetStateAction, useState } from 'react';
import { ProductApi } from '../../../services/api/product';
import { getCookie } from '../../../services/cookies';
import UploadImage from '../../../components/Global/UploadImage/UploadImage';
import { AccountApi } from '../../../services/api/account';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  email: yup.string().required('Email is required'),
  fullName: yup.string().required('Full name is required'),
  avatarPath: yup.string(),
  kind: yup.number().required('Kind is required'),
  status: yup.number(),
  phone: yup.string().required('Phone is required'),
});

export default function CreateAdmin() {
  const [fileImage, setFileImage] = useState<File>();
  const [imagePath, setImagePath] = useState('');
  const [kind, setKind] = useState('');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
      phone: '',
      kind: 0,
      status: 1,
      avatarPath: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   router.push('/dashboard');
      const token = getCookie('token');
      try {
        // ProductApi.addProduct(token as string, values).then((res) => {
        formik.values.avatarPath = imagePath;
        const result = await AccountApi.createAdmin(token, values);
        console.log('result: ', result);
        console.log('values: ', values);
        console.log('image path: ', imagePath);
      } catch (error) {
        console.log('error: ', error);
      }
      //   console.log(' values: ', values);
    },
  });

  const handleChangeKind = (event: SelectChangeEvent) => {
    setKind(event.target.value);
    formik.values.kind = Number(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Create Admin</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Grid>
          <Paper elevation={10}>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <h2>Create Admin</h2>
              </Grid>
              <Grid container sx={{ marginTop: '5px' }} spacing={3.5}>
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{ marginBottom: '20px' }}
                    label='Username'
                    fullWidth
                    size='small'
                    id='username'
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
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
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    size='small'
                    id='email'
                    name='email'
                    label='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{ marginBottom: '20px' }}
                    label='Password'
                    fullWidth
                    type='password'
                    size='small'
                    id='password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
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
                    style={{ marginBottom: '20px' }}
                    label='Full Name'
                    fullWidth
                    size='small'
                    id='fullName'
                    name='fullName'
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
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
                    style={{ marginBottom: '20px' }}
                    label='Phone'
                    fullWidth
                    size='small'
                    id='phone'
                    name='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    FormHelperTextProps={{
                      style: { position: 'absolute', bottom: '-25px' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    size='small'
                  >
                    <InputLabel id='kind'>Kind</InputLabel>
                    <Select
                      labelId='kind'
                      id='kind'
                      value={kind}
                      label='Kind'
                      placeholder='Kind'
                      sx={{ color: 'black' }}
                      onChange={handleChangeKind}
                      error={formik.touched.kind && Boolean(formik.errors.kind)}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Customer</MenuItem>
                      <MenuItem value={3}>Employee</MenuItem>
                      <MenuItem value={4}>Collaborator</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>Avatar</Typography>
                  <UploadImage
                    title='Add avatar'
                    setImagePath={setImagePath}
                    onFileChange={(file) => {
                      setFileImage(file);
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                sx={{ marginTop: '20px' }}
                type='submit'
                color='primary'
                variant='contained'
              >
                Create
              </Button>
            </form>
          </Paper>
        </Grid>
      </Layout>
    </div>
  );
}
