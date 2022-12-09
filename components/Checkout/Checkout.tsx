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

const validationSchema = yup.object({
  id: yup.number(),
  name: yup.string(),
});

type Props = {};

const CheckoutCart = (props: Props) => {
  const [cartProduct, setCartProduct] = useState<CartItemParams[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [province, setProvince] = useState<ProvinceParam[]>([]);
  const [disctrict, setDistrict] = useState<ProvinceParam[]>([]);
  const [ward, setWard] = useState<ProvinceParam[]>([]);

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

  // const getAllListProvince = async () => {
  //   const result = await ProvinceApi.listProvince();
  //   if (result) {
  //     console.log('result: ', result);
  //   }
  // };
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
      id: -1,
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const token = await getCookie('token');

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
        <G.LabelInput>E-MAIL</G.LabelInput>
        <G.Input widthFull></G.Input>
        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
          <Box sx={{ width: '50%' }}>
            <G.LabelInput>FULL NAME</G.LabelInput>
            <G.Input widthFull></G.Input>
          </Box>
          <Box sx={{ width: '50%' }}>
            <G.LabelInput>PHONE</G.LabelInput>
            <G.Input widthFull></G.Input>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
          <Box sx={{ width: '50%' }}>
            <G.LabelInput>Province</G.LabelInput>
            <G.Select
              widthFull
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

        <Box sx={{ mt: 3 }}>
          <G.LabelInput>Ward</G.LabelInput>
          <G.Select
            widthFull
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
        <Box sx={{ width: 'fit-content', marginLeft: 'auto', mt: 5 }}>
          <BtnShopNow title='Confirm' revertColor />
        </Box>
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
              ${totalPrice}
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
              ${totalPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutCart;
