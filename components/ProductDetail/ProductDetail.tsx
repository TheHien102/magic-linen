import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import StarsReview from '../Global/StarsReview/StarsReview';
import ProductSwiper from './ProductSwiper/ProductSwiper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import {
  CartItemParams,
  ProductDetailPrams,
  VariantCheckParams,
  VariantParams,
} from '../../services/types';
import { filterVariants } from '../../utils/common';
import { group } from 'console';
import style from 'styled-jsx/style';
import Image from 'next/image';
import sizeGuide from '../../assets/images/size-guide.jpg';
import { IItemCheckVariant, IItemVariant } from '../../services/interface';
import { LOCAL_SAVE_LIMITER, LOCAL_SAVE_PREFIX } from '../../utils/dataConfig';
import { useRouter } from 'next/router';

interface IProductDetail {
  data: ProductDetailPrams;
}

const ProductDetail = ({ data }: IProductDetail) => {
  console.log('data detail: ', data);
  const [quantity, setQuantity] = useState(1);
  // const [addPrice, setAddPrice] = useState(0);
  const [price, setPrice] = useState(data.price);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const router = useRouter();

  const handleQuantityUp = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDown = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleProperty = (data: VariantCheckParams) => {
    setVariantList(
      variantList.map(it => {
        if (it.name === data.name) {
          it.data.map(_it => {
            if (_it.id === data.id) {
              _it.checked = !_it.checked;

              if (_it.checked) {
                setPrice(price + _it.addPrice);
              } else {
                setPrice(price - _it.addPrice);
              }
            } else {
              if (_it.checked) {
                setPrice(price - _it.addPrice);
              }
              _it.checked = false;
            }
            return _it;
          });
        }
        return it;
      })
    );
  };

  const handleAddToCart = () => {
    let oneProductPrice = price * ((100 - data.discount) / 100);
    let newCartParam: CartItemParams = {
      productId: data.id,
      name: data.name,
      price: oneProductPrice,
      mainImg: data.mainImg,
      variants: [],
      quantity: quantity,
      totalPrice: quantity * price * ((100 - data.discount) / 100),
    };
    variantList.map(it => {
      newCartParam.variants = newCartParam.variants.concat(
        it.data.filter(_it => _it.checked === true)
      );
    });

    if (localStorage.getItem(LOCAL_SAVE_PREFIX) !== null) {
      let storage = localStorage.getItem(LOCAL_SAVE_PREFIX)?.toString();
      storage = storage + LOCAL_SAVE_LIMITER + JSON.stringify(newCartParam);
      localStorage.setItem(LOCAL_SAVE_PREFIX, storage);
    } else {
      localStorage.setItem(LOCAL_SAVE_PREFIX, JSON.stringify(newCartParam));
    }
    router.push('/cart');
  };

  const variantListTemp = filterVariants(data.variants);
  const [variantList, setVariantList] = useState<IItemCheckVariant[]>([]);
  useEffect(() => {
    setVariantList(variantListTemp);
  }, []);
  const dataImages = data.assets.map(it => it.link).concat(data.mainImg);

  console.log('dataImages: ', dataImages);

  return (
    <Box sx={{ display: 'flex', marginX: '120px', gap: '35px' }}>
      <Box sx={{ width: '60%' }}>
        <ProductSwiper data={dataImages} />
        {/* <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography sx={{ fontFamily: 'Josefin Sans', fontWeight: 'bold' }}>
              DESCRIPTION
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></Typography>
          </AccordionDetails>
        </Accordion> */}
      </Box>
      <Box sx={{ w: '30%' }}>
        <Typography
          component={'h1'}
          sx={{ fontWeight: 'semibold', fontSize: '24px' }}
        >
          {data.name}
        </Typography>
        <StarsReview />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
          {data.discount === 0 ? (
            <Typography
              sx={{
                fontFamily: 'Josefin Sans',
                ml: 1,
                fontWeight: 'bold',
                fontSize: '24px',
                lineHeight: '1',
              }}
            >
              {price}
            </Typography>
          ) : (
            <>
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
                ${price}
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
                ${price * ((100 - data.discount) / 100)}
              </Typography>
            </>
          )}
        </Box>
        {data.discount !== 0 && (
          <Typography
            sx={{
              fontFamily: 'Josefin Sans',
              mt: 1,
              fontWeight: 'bold',
              color: 'gray',
              fontSize: '14px',
            }}
          >
            You save ${price * (data.discount / 100)} ({data.discount}%)
          </Typography>
        )}
        <Typography
          onClick={handleOpenModal}
          sx={{
            fontFamily: 'Josefin Sans',
            width: 'fit-content',
            marginLeft: 'auto',
            textDecoration: 'underline',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Size guide
        </Typography>
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                maxHeight: '90vh',
                bgcolor: 'background.paper',
                boxShadow: 14,
                p: 4,
                overflowY: 'scroll',
              }}
            >
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'
                sx={{
                  textAlign: 'center',
                  fontFamily: 'Josefin Sans',
                  fontSize: '36px',
                }}
              >
                Clothing size guide
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Image
                  src={sizeGuide}
                  alt='size-guide'
                  width={'500px'}
                  height={'2000px'}
                  layout='responsive'
                />
              </Box>
            </Box>
          </Fade>
        </Modal>
        {variantList &&
          variantList.map(data => (
            <Box key={data.id}>
              <Typography
                sx={{
                  fontFamily: 'Josefin Sans',
                  mt: 1,
                  fontWeight: 'bold',
                  fontSize: '14 px',
                  textTransform: 'capitalize',
                }}
                key={data.id}
              >
                {data.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {data.data.map(_data =>
                  _data.name !== 'color' ? (
                    <Box
                      key={_data.property}
                      sx={[
                        {
                          width: '65px',
                          textAlign: 'center',
                          py: 1.5,
                          cursor: 'pointer',
                        },
                        _data.checked
                          ? { border: '2px solid black' }
                          : { border: '1px solid #ebeae7' },
                      ]}
                      onClick={() => handleProperty(_data)}
                    >
                      {_data.property}
                    </Box>
                  ) : (
                    <Box
                      key={_data.id}
                      sx={[
                        {
                          backgroundColor: _data.property,
                          borderRadius: '100%',
                          width: 33,
                          height: 33,
                          cursor: 'pointer',
                        },
                        _data.checked
                          ? { border: '3px solid black' }
                          : { border: '1px solid #ebeae7' },
                      ]}
                      onClick={() => handleProperty(_data)}
                    ></Box>
                  )
                )}
              </Box>
            </Box>
          ))}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '45px',
            mb: 3,
            mt: 2,
          }}
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
              height: '34.3px',
              width: '35px',
            }}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
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
        <Box sx={{ mt: 2 }}>
          <BtnShopNow
            title='ADD TO CART'
            revertColor
            widthFull
            onClick={handleAddToCart}
          />
        </Box>

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
