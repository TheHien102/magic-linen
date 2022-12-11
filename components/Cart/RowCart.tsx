import { TableRow, TableCell, Box, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CartItemParams } from '../../services/types';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IRowCart {
  data: CartItemParams;
  handleRemoveItem: (data: CartItemParams) => void;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

const RowCart = ({
  data,
  handleRemoveItem,
  totalPrice,
  setTotalPrice,
}: IRowCart) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const handleQuantityUp = () => {
    setQuantity(quantity + 1);
    setTotalPrice(totalPrice + data.price);
  };

  const handleQuantityDown = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice(totalPrice - data.price);
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
          ${data.price}
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
          ${data.price * quantity}
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
