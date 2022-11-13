import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { PagesApi } from '../../../services/api/pages';
import { getCookie } from '../../../services/cookies';
import Head from 'next/head';
import { Box, Button } from '@mui/material';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import { AccountApi } from '../../../services/api/account';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ListAdmin = (props: any) => {
  console.log('data: ', props.data.data);
  return (
    <>
      <Head>
        <title>List Admin</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
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
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.data.map((data: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {data.username}
                  </TableCell>
                  <TableCell align='left'>{data.fullName}</TableCell>
                  <TableCell align='left'>{data.group.name}</TableCell>
                  <TableCell align='left'>{data.createdDate}</TableCell>
                  <TableCell align='left'>{data.lastLogin}</TableCell>
                  <TableCell align='left'>
                    {data.status === 1 ? 'Active' : 'Disable'}
                  </TableCell>
                  <TableCell align='right'>
                    <Button variant='contained'>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);

  if (token) {
    try {
      const [res] = await Promise.all([PagesApi.listAdmin(token, 1)]);
      return {
        props: {
          ...res,
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

export default ListAdmin;
