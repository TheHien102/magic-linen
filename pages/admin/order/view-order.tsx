import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Box,
  TablePagination,
  Typography,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import SearchBar from '../../../components/Global/SearchBar/SearchBar';
import { OrderApi } from '../../../services/api/order';
import { getCookie } from '../../../services/cookies';
import { OrderListParams, ProductDetail } from '../../../services/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { formatPrice } from '../../../utils/common';
import { useRouter } from 'next/router';

interface ViewOrderProps {
  orderList: any;
}

const ViewOrder = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [orderList, setOrderList] = useState<any>();
  const [params, setParams] = useState<OrderListParams>({
    page: 0,
    size: 20,
    sort: [],
  });
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const APPROVE = -1;
  const DECLINE = -2;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  console.log('list: ', orderList);

  const handleUpdateOrder = async (_id: number, _status: number) => {
    let data = {
      id: _id,
      status: _status,
    };
    console.log('data orrder update: ', data);
    const token = await getCookie('token');
    if (token) {
      await OrderApi.updateOrder(token, data).then((res) => {
        console.log('res :', res);
        setOpenSnackbar(true);
        setTimeout(() => {
          router.reload();
        }, 1000);
      });
    }
  };

  const getData = async () => {
    try {
      const token = getCookie('token');
      const res = await OrderApi.orderList(token as string, params);

      if (res && res.data && res.data.totalElements) {
        console.log(res);

        setOrderList(res.data.data);
      } else {
        console.log('No data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paginationChange = () => {};

  useEffect(() => {
    getData();
  }, [search]);
  return (
    <>
      <Head>
        <title>View Order | Linen A</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout>
        {orderList && orderList.length ? (
          <Box>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={openSnackbar}
              autoHideDuration={3000}
            >
              <Alert severity='success' sx={{ width: '100%' }}>
                Update Order Complete !
              </Alert>
            </Snackbar>
            {/* <SearchBar value={search} setValue={setSearch} /> */}
            <Typography sx={{ mb: 3, fontWeight: 'bold' }}>
              List Order
            </Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size='small'
                aria-label='a dense table'
              >
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>ID</TableCell>
                    <TableCell align='center'>Receiver Name</TableCell>
                    {/* <TableCell align='center'>Variants</TableCell> */}
                    <TableCell align='center'>Phone Number</TableCell>
                    <TableCell align='center'>Price</TableCell>
                    <TableCell align='center'>Shipping Fee</TableCell>
                    <TableCell align='center'>Address</TableCell>
                    <TableCell align='center'>Note</TableCell>
                    <TableCell align='center'>Payment Type</TableCell>

                    <TableCell align='center'>Created Date</TableCell>
                    <TableCell align='center'>Modified Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList.map((row: any, rowId: any) => (
                    <TableRow
                      key={rowId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row' align='center'>
                        {row.id}
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        {row.receiverName}
                      </TableCell>
                      {/* <TableCell style={{ width: '1px', whiteSpace: 'nowrap' }}>
                        {row.variants.map((it, id) => (
                          <Box
                            key={id}
                            sx={{ textAlign: 'left' }}
                          >{`${it.name}: ${it.property}`}</Box>
                        ))}
                      </TableCell> */}
                      <TableCell align='center'>{row.phoneNumber}</TableCell>
                      <TableCell align='center'>
                        {formatPrice(row.totalPrice)} VND
                      </TableCell>
                      <TableCell align='center'>
                        {formatPrice(row.shippingFee)} VND
                      </TableCell>
                      <TableCell align='center'>{row.address}</TableCell>
                      <TableCell align='center'>{row.note}</TableCell>
                      <TableCell align='center'>
                        {row.paymentType === 1 && 'COD'}
                      </TableCell>
                      <TableCell align='center'>{row.createdDate}</TableCell>
                      <TableCell align='center'>{row.modifiedDate}</TableCell>
                      <TableCell align='right'>
                        {row.status === 1 ? (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant='contained'
                              onClick={() => handleUpdateOrder(row.id, APPROVE)}
                            >
                              <CheckCircleIcon />
                            </Button>
                            <Button
                              variant='contained'
                              color={'error'}
                              onClick={() => handleUpdateOrder(row.id, DECLINE)}
                            >
                              <DoDisturbOnIcon />
                            </Button>
                          </Box>
                        ) : row.status === -1 ? (
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
                            Accepted
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              textTransform: 'capitalize',
                              bgcolor: 'red',
                              color: 'white',
                              borderRadius: '15px',
                              whiteSpace: 'nowrap',
                              textAlign: 'center',
                              fontWeight: 'bold',
                            }}
                          >
                            Rejected
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component='div'
              count={orderList.length}
              rowsPerPage={15}
              page={page}
              onPageChange={handleChangePage}
            />
          </Box>
        ) : (
          <Box>No data</Box>
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = getCookie('token', ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin',
      },
    };
  }

  return {
    props: {},
  };
}

export default ViewOrder;
