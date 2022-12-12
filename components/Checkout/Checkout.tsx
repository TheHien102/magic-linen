import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProvinceApi } from '../../services/api/province';
import { CartItemParams, ProvinceParam } from '../../services/types';
import * as G from '../../styles/global.styled';
import { LOCAL_SAVE_PREFIX, LOCAL_SAVE_LIMITER } from '../../utils/dataConfig';
import ItemCart from './ItemCart';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getCookie } from '../../services/cookies';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import { CartApi } from '../../services/api/cart';
import { useRef } from 'react';
import { formatPrice } from '../../utils/common';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  note: yup.string().min(3, 'Must be more than 3 characters'),
  address: yup.string().required('Address is required'),
  paymentType: yup.number(),
  cartItemsList: yup.array(),
});

type Props = {};

const CheckoutCart = (props: Props) => {
  const [cartProduct, setCartProduct] = useState<CartItemParams[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [province, setProvince] = useState<ProvinceParam[]>([]);
  const [disctrict, setDistrict] = useState<ProvinceParam[]>([]);
  const [ward, setWard] = useState<ProvinceParam[]>([]);
  const provinceRef = useRef<HTMLSelectElement>(null);
  const disctrictRef = useRef<HTMLSelectElement>(null);
  const wardRef = useRef<HTMLSelectElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
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

  const SEARCH_PARAMS = '';

  const getProvince = (level: number) => {
    ProvinceApi.listProvince(SEARCH_PARAMS, level, null).then((res) => {
      setProvince(res.data.data);
    });
  };

  const getDistrict = (parentId: number) => {
    ProvinceApi.listProvince(SEARCH_PARAMS, null, parentId).then((res) => {
      setDistrict(res.data.data);
      setWard([]);
    });
  };

  const getWard = (parentId: number) => {
    ProvinceApi.listProvince(SEARCH_PARAMS, null, parentId).then((res) => {
      setWard(res.data.data);
    });
  };

  useEffect(() => {
    getLocalValue();
    // getAllListProvince();
    getProvince(1);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      phoneNumber: '',
      note: '',
      address: '',
      paymentType: 1,
      cartItemsList: [] as any,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.values.cartItemsList = cartProduct;
      const token = await getCookie('token');
      if (token) {
        console.log('user logged with token cart');
      } else {
        formik.values.cartItemsList = cartProduct;
        if (
          streetRef.current &&
          wardRef.current &&
          disctrictRef.current &&
          provinceRef.current
        ) {
          formik.values.address =
            streetRef.current.value + wardRef.current.innerText;
          // disctrictRef.current.innerText +
          // provinceRef.current.innerText;
        }
        console.log('values: ', values);
        // CartApi.createOrderGuest(values).then((res) => {
        //   console.log('res: ', res);
        // });
      }
      try {
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', gap: 5, mt: 5, mb: 5 }}>
      <Box sx={{ width: '60%' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Josefin Sans',
            mb: 1.5,
            borderBottom: '1px solid hsla(48,8%,88%,.6)',
          }}
        >
          BILLING
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
            <Box sx={{ width: '50%' }}>
              <G.LabelInput>FULL NAME</G.LabelInput>
              <G.Input
                widthFull
                id='username'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
              ></G.Input>
              {formik.touched.username && Boolean(formik.errors.username) && (
                <G.ErrorText>{formik.errors.username}</G.ErrorText>
              )}
            </Box>
            <Box sx={{ width: '50%' }}>
              <G.LabelInput>PHONE</G.LabelInput>
              <G.Input
                widthFull
                id='phoneNumber'
                name='phoneNumber'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              ></G.Input>
              {formik.touched.phoneNumber &&
                Boolean(formik.errors.phoneNumber) && (
                  <G.ErrorText>{formik.errors.phoneNumber}</G.ErrorText>
                )}
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <G.LabelInput>NOTE (Optional)</G.LabelInput>
            <G.TextArea
              widthFull
              id='note'
              name='note'
              value={formik.values.note}
              onChange={formik.handleChange}
            ></G.TextArea>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
            <Box sx={{ width: '50%' }}>
              <G.LabelInput>Province</G.LabelInput>
              <G.Select
                widthFull
                ref={provinceRef}
                onChange={(e) => getDistrict(Number(e.target.value))}
              >
                {province &&
                  province.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
              </G.Select>
            </Box>
            <Box sx={{ width: '50%' }}>
              <G.LabelInput>District</G.LabelInput>
              <G.Select
                widthFull
                ref={disctrictRef}
                disabled={disctrict && disctrict.length > 0 ? false : true}
                onChange={(e) => getWard(Number(e.target.value))}
              >
                {disctrict &&
                  disctrict.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
              </G.Select>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
            <Box sx={{ width: '50%' }}>
              <G.LabelInput>Ward</G.LabelInput>
              <G.Select
                widthFull
                ref={wardRef}
                disabled={ward && ward.length > 0 ? false : true}
                // onChange={(e) => getDistrict(Number(e.target.value))}
              >
                {ward &&
                  ward.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
              </G.Select>
            </Box>
            <Box sx={{ width: '50%' }}>
              <G.LabelInput>Street</G.LabelInput>
              <G.Input widthFull ref={streetRef}></G.Input>
              {formik.touched.address && Boolean(formik.errors.address) && (
                <G.ErrorText>{formik.errors.address}</G.ErrorText>
              )}
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <label className='wrapChecked'>
              Ship COD
              <input type='checkbox' disabled checked />
              <span className='checkmark'></span>
            </label>
          </Box>

          <Box sx={{ width: 'fit-content', marginLeft: 'auto', mt: 5 }}>
            <BtnShopNow title='Confirm' revertColor type='submit' />
          </Box>
        </form>
      </Box>
      <Box sx={{ width: '40%', backgroundColor: '#f8f8f8', p: 2.7 }}>
        <Typography
          sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', mb: 1.5 }}
        >
          CART
        </Typography>
        <Box
          sx={{
            borderTop: '1px solid hsla(48,8%,88%,.6)',
            borderBottom: '1px solid black',
            py: 3,
          }}
        >
          {cartProduct &&
            cartProduct.map((data, index) => (
              <ItemCart key={index} data={data} />
            ))}
        </Box>
        <Box sx={{ width: '100%', mt: 4 }}>
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
                fontSize: '16px',
                textAlign: 'right',
              }}
            >
              Sub-Total:
            </Typography>
            <Typography
              sx={{
                fontWeight: '400',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
                ml: 15,
                textAlign: 'right',
              }}
            >
              ${formatPrice(totalPrice)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: '400',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
                textAlign: 'right',
              }}
            >
              Shipping:
            </Typography>
            <Typography
              sx={{
                fontWeight: '400',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
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
              width: '100%',
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
                fontSize: '22px',
                textAlign: 'right',
              }}
            >
              Total:
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Josefin Sans',
                fontSize: '22px',
                ml: 10,
                textAlign: 'right',
              }}
            >
              ${formatPrice(totalPrice)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutCart;
