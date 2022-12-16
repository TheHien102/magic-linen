import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import { LOCAL_SAVE_LIMITER, LOCAL_SAVE_PREFIX } from '../../utils/dataConfig';
import { CartItemParams } from '../../services/types';
import RowCart from './RowCart';
import { useRouter } from 'next/router';
import { getCookie } from '../../services/cookies';
import { CartApi } from '../../services/api/cart';
import { formatPrice } from '../../utils/common';

export default function CartUser() {
  const [cartProduct, setCartProduct] = useState<CartItemParams[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getLocalValue = async () => {
    let temp: any = localStorage
      .getItem(LOCAL_SAVE_PREFIX)
      ?.toString()
      .split(LOCAL_SAVE_LIMITER)
      .map((data) => JSON.parse(data.replace('\\', '')));

    if (localStorage.getItem(LOCAL_SAVE_PREFIX) !== null) {
      console.log('temp', temp);

      setCartProduct(temp);
      let tempTotalPrice = 0;
      for (let i = 0; i < temp.length; i++) {
        tempTotalPrice += temp[i].totalPrice;
      }
      setTotalPrice(tempTotalPrice);
    }
  };

  const getCartData = async () => {
    setLoading(true);
    const token = await getCookie('token');
    if (token) {
      CartApi.listCart(token)
        .then((res) => {
          console.log('res cart: ', res);
          setCartProduct(res.data.data);
          setLoading(false);
          let tempTotalPrice = 0;
          for (let i = 0; i < res.data.data.length; i++) {
            tempTotalPrice +=
              res.data.data[i].price * res.data.data[i].quantity;
          }
          setTotalPrice(tempTotalPrice);
        })
        .catch(() => {
          setCartProduct([]);
        });
    } else {
      getLocalValue();
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const handleRemoveItem = async (data: CartItemParams) => {
    const token = await getCookie('token');
    if (cartProduct.length === 1) {
      localStorage.removeItem(LOCAL_SAVE_PREFIX);
    }
    const res = await CartApi.deleteCart(token as string, data.id);
    console.log(res);
    setCartProduct(cartProduct.filter((it) => it !== data));
  };

  const handleContinueShopping = async () => {
    const token = await getCookie('token');
    if (token) {
      router.push('/shop');
    } else {
      setNewJson();
      router.push('/shop');
    }
  };

  const setNewJson = () => {
    let newJSON = '';
    cartProduct.map((data, index) => {
      if (index === cartProduct.length - 1) {
        newJSON += JSON.stringify(data);
      } else {
        newJSON += JSON.stringify(data) + LOCAL_SAVE_LIMITER;
      }
    });

    if (cartProduct.length > 0) {
      localStorage.setItem(LOCAL_SAVE_PREFIX, newJSON);
    }
  };

  const handleCheckout = async () => {
    const token = await getCookie('token');
    if (token) {
      router.push('/checkout');
    } else {
      setNewJson();
      router.push('/checkout');
    }
  };

  return (
    <Box sx={{ pb: 20 }}>
      {cartProduct && cartProduct.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Josefin Sans',
                      fontSize: '14px',
                    }}
                  >
                    PRODUCT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Josefin Sans',
                      fontSize: '14px',
                    }}
                  >
                    PRICE
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Josefin Sans',
                      fontSize: '14px',
                    }}
                  >
                    QTY
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Josefin Sans',
                      fontSize: '14px',
                    }}
                  >
                    TOTAL
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartProduct &&
                  cartProduct.map((data, index) => (
                    <RowCart
                      key={index}
                      index={index}
                      data={data}
                      handleRemoveItem={handleRemoveItem}
                      totalPrice={totalPrice}
                      setTotalPrice={setTotalPrice}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ marginLeft: 'auto', width: 'fit-content', pl: 10, mt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontWeight: '400',
                  fontFamily: 'Josefin Sans',
                  fontSize: '18px',
                  textAlign: 'right',
                }}
              >
                Sub-Total:
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontFamily: 'Josefin Sans',
                  fontSize: '18px',
                  ml: 25,
                  textAlign: 'right',
                }}
              >
                ${formatPrice(totalPrice)}
              </Typography>
            </Box>

            <Box
              sx={{
                borderTop: '1px solid hsla(48,8%,88%,.6)',
                mt: 2,
                marginLeft: '-140px',
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 2,
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Josefin Sans',
                  fontSize: '26px',
                  textAlign: 'right',
                }}
              >
                Total:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Josefin Sans',
                  fontSize: '26px',
                  ml: 10,
                  textAlign: 'right',
                }}
              >
                ${formatPrice(totalPrice)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginLeft: 'auto', width: 'fit-content', mt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <BtnShopNow
                title='Continue Shopping'
                onClick={() => handleContinueShopping()}
              />
              <Box sx={{ ml: 2 }}>
                <BtnShopNow
                  title='Proceed to checkout'
                  revertColor
                  onClick={() => handleCheckout()}
                />
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          {!loading ? (
            <Box>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontFamily: 'Josefin Sans',
                  fontSize: '28px',
                  textAlign: 'center',
                  mt: 5,
                }}
              >
                Your cart is empty!. Buy some thing and go back here.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <BtnShopNow
                  title='Shopping Now'
                  onClick={() => handleContinueShopping()}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
