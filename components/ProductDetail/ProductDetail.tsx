import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import StarsReview from '../Global/StarsReview/StarsReview';
import ProductSwiper from './ProductSwiper/ProductSwiper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';

type Props = {};

const ProductDetail = (props: Props) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityUp = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDown = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', marginX: '120px', gap: '35px' }}>
      <Box sx={{ width: '60%' }}>
        <ProductSwiper />
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>DESCRIPTION</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Cotent here</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ w: '30%' }}>
        <Typography
          component={'h1'}
          sx={{ fontWeight: 'semibold', fontSize: '24px' }}
        >
          LINEN BEACH SHIRT TAOS
        </Typography>
        <StarsReview />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
          <Typography
            sx={{
              textDecoration: 'line-through',
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold',
              color: 'gray',
              fontSize: '14px',
              lineHeight: '1.3',
            }}
          >
            $89.00
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Josefin Sans',
              ml: 1,
              fontWeight: 'bold',
              color: '#9e1a1a',
              fontSize: '24px',
              lineHeight: '1',
            }}
          >
            $71.20
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            mt: 1,
            fontWeight: 'bold',
            color: 'gray',
            fontSize: '14px',
          }}
        >
          You save $17.80 (20%)
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            mt: 1,
            fontWeight: 'bold',
            fontSize: '14 px',
          }}
        >
          SIZE
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Box
            sx={{
              width: '65px',
              border: '1px solid #ebeae7',
              textAlign: 'center',
              py: 1.5,
            }}
          >
            XS
          </Box>
          <Box
            sx={{
              width: '65px',
              border: '1px solid #ebeae7',
              textAlign: 'center',
              py: 1.5,
            }}
          >
            S
          </Box>
          <Box
            sx={{
              width: '65px',
              border: '1px solid #ebeae7',
              textAlign: 'center',
              py: 1.5,
            }}
          >
            M
          </Box>
          <Box
            sx={{
              width: '65px',
              border: '1px solid #ebeae7',
              textAlign: 'center',
              py: 1.5,
            }}
          >
            L
          </Box>
          <Box
            sx={{
              width: '65px',
              border: '1px solid #ebeae7',
              textAlign: 'center',
              py: 1.5,
            }}
          >
            XL
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, my: 4 }}>
          <Box
            sx={{
              backgroundColor: 'blue',
              borderRadius: '100%',
              width: 33,
              height: 33,
              border: '3px solid black',
            }}
          />
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', height: '45px', mb: 3 }}
        >
          <Box
            sx={{
              border: '1px solid #979797',
              borderRight: 0,
              p: 0.5,
              lineHeight: 0.5,
              cursor: 'pointer',
            }}
            onClick={() => handleQuantityDown()}
          >
            <RemoveIcon />
          </Box>
          <input
            className='inputShop'
            type='number'
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              border: '1px solid #979797',
              height: '34.5px',
              width: '35px',
            }}
            value={quantity}
          />
          <Box
            sx={{
              border: '1px solid #979797',
              borderLeft: 0,
              p: 0.5,
              lineHeight: 0.5,
              cursor: 'pointer',
            }}
            onClick={() => handleQuantityUp()}
          >
            <AddIcon />
          </Box>
        </Box>
        <BtnShopNow title='ADD TO CART' revertColor widthFull />

        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            mt: 1,
            fontWeight: 'bold',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          Free shipping for orders over $75
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            mt: 1,
            fontWeight: 'bold',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          Get it between Dec 02 - Dec 08
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            mt: 1,
            fontWeight: 'bold',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          Gift wrapping available
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetail;
