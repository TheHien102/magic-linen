import { TableRow, TableCell, Box, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CartItemParams } from '../../services/types';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatPrice } from '../../utils/common';
import { getCookie } from '../../services/cookies';
import { CartApi } from '../../services/api/cart';
import { LOCAL_SAVE_LIMITER, LOCAL_SAVE_PREFIX } from '../../utils/dataConfig';

interface IRowCart {
  data: CartItemParams;
  index: number;
  handleRemoveItem: (data: CartItemParams) => void;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  updateLocalValue: any;
}

const RowCart = ({
  data,
  index,
  handleRemoveItem,
  totalPrice,
  setTotalPrice,
  updateLocalValue,
}: IRowCart) => {
  const [quantity, setQuantity] = useState(data.quantity);

  const handleQuantityUp = async () => {
    const token = await getCookie('token');
    if (token) {
      updateQuantity(quantity + 1).then((res) => {
        if (res?.status.toString() === 'OK') {
          setQuantity(quantity + 1);
          setTotalPrice(totalPrice + data.price);
        }
      });
    } else {
      setQuantity(quantity + 1);
      setTotalPrice(totalPrice + data.price);
      updateLocalValue(data, 'plus');
    }
  };

  const handleQuantityDown = async () => {
    const token = await getCookie('token');
    if (quantity > 1) {
      if (token) {
        updateQuantity(quantity - 1).then((res) => {
          if (res?.status.toString() === 'OK') {
            setQuantity(quantity - 1);
            setTotalPrice(totalPrice - data.price);
          }
        });
      } else {
        setQuantity(quantity - 1);
        setTotalPrice(totalPrice + data.price);
        updateLocalValue(data, 'minus');
      }
    }
  };

  const updateQuantity = async (_quantity: number) => {
    const token = await getCookie('token');
    if (token) {
      let cartItem = {
        cartItemId: data.id,
        quantity: _quantity,
      };
      console.log('productId: ', data);
      return CartApi.updateCartItem(token, cartItem).then((res) => {
        console.log('res cart item: ', res);
        return res;
      });
    }
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              width: 70,
              height: 85,
              ml: 2,
            }}
          >
            <Image
              src={data.mainImg}
              width={70}
              height={85}
              layout='responsive'
              alt=''
            />
          </Box>
          <Box sx={{ ml: 6 }}>
            <Typography
              sx={{
                fontWeight: 'bolder',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
              }}
            >
              {data.name}
            </Typography>
            {data.variants &&
              data.variants.map((_data) =>
                _data.name === 'color' ? (
                  <Box
                    key={_data.id}
                    sx={{
                      fontWeight: 'bolder',
                      fontFamily: 'Josefin Sans',
                      fontSize: '14px',
                      color: 'gray',

                      textTransform: 'capitalize',
                    }}
                  >
                    {_data.name} :{' '}
                    <Box
                      sx={{
                        display: 'inline-block',
                        width: 15,
                        height: 15,
                        border: '1px solid gray',
                        backgroundColor: _data.property,
                      }}
                    ></Box>
                  </Box>
                ) : (
                  <Typography
                    key={_data.id}
                    sx={{
                      fontWeight: 'bolder',
                      fontFamily: 'Josefin Sans',
                      fontSize: '14px',
                      color: 'gray',
                      textTransform: 'capitalize',
                    }}
                  >
                    {_data.name} : {_data.property}
                  </Typography>
                )
              )}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Josefin Sans',
            fontSize: '16px',
          }}
        >
          {formatPrice(data.price)} VND
        </Typography>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RemoveIcon
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => handleQuantityDown()}
          />
          <input
            className='inputShop'
            type='number'
            style={{
              fontWeight: 'bold',
              border: 0,
              fontSize: '18px',
              width: '35px',
              color: 'gray',
            }}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <AddIcon
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => handleQuantityUp()}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Josefin Sans',
            fontSize: '16px',
          }}
        >
          {formatPrice(data.price * quantity)} VND
        </Typography>
      </TableCell>
      <TableCell align='right'>
        <CloseIcon
          sx={{ color: 'gray', fontSize: '16px', cursor: 'pointer' }}
          onClick={() => handleRemoveItem(data)}
        />
      </TableCell>
    </TableRow>
  );
};

export default RowCart;
