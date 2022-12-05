import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import { LOCAL_SAVE_PREFIX } from '../../utils/dataConfig';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CartUser() {
  const [quantity, setQuantity] = useState(0);
  // localStorage.getItem(LOCAL_SAVE_PREFIX + 64, JSON.parse(newCartParam));
  const handleQuantityUp = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDown = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ pb: 20 }}>
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
                        src={
                          'https://res.cloudinary.com/vhg2901/image/upload/v1669655893/zler32zfrm9cb49odzqn.jpg'
                        }
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
                        Royal TOSCANA linen dress
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 'bolder',
                          fontFamily: 'Josefin Sans',
                          fontSize: '14px',
                          color: 'gray',
                        }}
                      >
                        Size : XS
                      </Typography>
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
                    $71.20
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
                    $142.40
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <CloseIcon
                    sx={{ color: 'gray', fontSize: '16px', cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
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
            $71.20
          </Typography>
        </Box>
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
              fontWeight: '400',
              fontFamily: 'Josefin Sans',
              fontSize: '18px',
              textAlign: 'right',
            }}
          >
            Shipping:
          </Typography>
          <Typography
            sx={{
              fontWeight: '400',
              fontFamily: 'Josefin Sans',
              fontSize: '18px',
              ml: 10,
              textAlign: 'right',
            }}
          >
            $5.00
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
            $71.20
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
          <BtnShopNow title='Continue Shopping' />
          <Box sx={{ ml: 2 }}>
            <BtnShopNow title='Proceed to checkout' revertColor />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
