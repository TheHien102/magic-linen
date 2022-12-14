import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { PagesApi } from '../../../services/api/pages';
import { getCookie } from '../../../services/cookies';
import Head from 'next/head';
import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import { AccountApi } from '../../../services/api/account';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { filterPermissions } from '../../../utils/common';
import Pagination from '@mui/material/Pagination';

const ListAdmin = (props: any) => {
  const [list, setList] = useState([]);
  const getListAdmin = async () => {
    const token = await getCookie('token');

    if (token) {
      const [res] = await Promise.all([PagesApi.listAdmin(token)]);
      if (res) {
        setList(res.data.data);
      }
      console.log('data: ', res);
    }
  };

  useEffect(() => {
    getListAdmin();

    // const roles = filterPermissions(list[0]);
    console.log('roles: ', list);
  }, []);
  return (
    <>
      <Head>
        <title>List Admin</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Full name
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Phone number
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Role
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Create Date
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Last Login
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>
                {/* <TableCell align='right'></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((data: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {data.username}
                    </TableCell>
                    <TableCell align='left'>{data.fullName}</TableCell>
                    <TableCell align='left'>{data.phone}</TableCell>
                    <TableCell align='left'>
                      <Typography
                        sx={[
                          {
                            textTransform: 'capitalize',
                            bgcolor: '#263238',
                            color: 'white',
                            borderRadius: '15px',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                            fontWeight: 'bold',
                          },
                          data.group.kind === 2 && {
                            bgcolor: '#80cbc4',
                            color: 'black',
                          },
                        ]}
                      >
                        {data.group.name}
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>{data.createdDate}</TableCell>
                    <TableCell align='left'>{data.lastLogin}</TableCell>
                    <TableCell align='left'>
                      <Typography
                        sx={{
                          textTransform: 'capitalize',
                          bgcolor: '#4caf50',
                          color: 'white',
                          borderRadius: '15px',
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        {data.status === 1 ? 'Active' : 'Disable'}
                      </Typography>
                    </TableCell>
                    {/* <TableCell align='right'>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 0.5,
                        }}
                      >
                        <Button variant='contained'>
                          <EditIcon />
                        </Button>
                        <Button variant='contained' color={'error'}>
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={10} variant='outlined' shape='rounded' />
          </Box> */}
        </TableContainer>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);

  if (token) {
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

export default ListAdmin;
