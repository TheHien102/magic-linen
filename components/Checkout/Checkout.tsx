import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProvinceApi } from '../../services/api/province';
import {
  CartItemParams,
  ListAddressParams,
  OrderGuestParam,
  ProfileParams,
  ProvinceParam,
} from '../../services/types';
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
import { AccountApi } from '../../services/api/account';
import { useStorageContext } from '../../contexts/StorageContext';
import { AddressApi } from '../../services/api/address';
import CreateAddress from './CreateAddress';
import DetailAddress from './DetailAddress';
import { useRouter } from 'next/router';
import { ShippingFeeApi } from '../../services/api/shippingFee';

const validationSchema = yup.object({
  username: yup.string().required('USername is required'),
  phoneNumber: yup.string().required('Phone is required'),
  note: yup.string().min(3, 'Must be more than 3 characters'),
  address: yup.string().required('Missing field of address'),
  paymentType: yup.number(),
});

type Props = {};

const CheckoutCart = (props: Props) => {
  const [cartProduct, setCartProduct] = useState<CartItemParams[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [listAddress, setListAddress] = useState<ListAddressParams[]>([]);
  const [province, setProvince] = useState<ProvinceParam[]>([]);
  const [disctrict, setDistrict] = useState<ProvinceParam[]>([]);
  const [ward, setWard] = useState<ProvinceParam[]>([]);
  const provinceRef = useRef<HTMLSelectElement>(null);
  const disctrictRef = useRef<HTMLSelectElement>(null);
  const wardRef = useRef<HTMLSelectElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState<any>();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const router = useRouter();
  // const { userInfo, setUserInfo } = useStorageContext();
  // console.log('userInfo: ', userInfo);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const handleOpenModalAddress = () => setOpenModalAddress(true);
  const handleCloseModalAddress = async () => {
    setOpenModalAddress(false);
    const token = getCookie('token');
    if (token) {
      getListAddress();
    }
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const getLocalValue = async () => {
    var archive = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

    // var assert = chai.assert;
    for (; (key = keys[i]); i++) {
      let localValue: string = localStorage.getItem(key) as string;

      // assert(localValue !== null);
      archive.push(JSON.parse(localValue));
    }
    setCartProduct(archive);
    let tempTotalPrice = 0;
    for (let i = 0; i < archive.length; i++) {
      tempTotalPrice += archive[i].totalPrice;
    }
    setTotalPrice(tempTotalPrice);
  };

  const SEARCH_PARAMS = '';

  const getProvinceGuest = (level: number) => {
    ProvinceApi.listProvince(SEARCH_PARAMS, level, null).then((res) => {
      setProvince(res.data.data);
    });
  };

  const getDistrictGuest = (data: string) => {
    const parentId = Number(data.split(',')[0]);
    ProvinceApi.listProvince(SEARCH_PARAMS, null, parentId).then((res) => {
      setDistrict(res.data.data);
      setWard([]);
    });
  };

  const getWardGuest = (data: string) => {
    const parentId = Number(data.split(',')[0]);
    ProvinceApi.listProvince(SEARCH_PARAMS, null, parentId).then((res) => {
      setWard(res.data.data);
      if (disctrictRef.current && wardRef.current) {
        getFeeGHN(
          disctrictRef.current?.value.split(',')[1],
          wardRef.current?.value.split(',')[1]
        );
      }
    });
  };

  const getUserValue = async () => {
    const token = await getCookie('token');
    if (token) {
      CartApi.listCart(token).then((res) => {
        setCartProduct(res.data.data);
        let tempTotalPrice = 0;
        for (let i = 0; i < res.data.data.length; i++) {
          tempTotalPrice += res.data.data[i].price * res.data.data[i].quantity;
        }
        setTotalPrice(tempTotalPrice);
      });
      getListAddress();
    } else {
      getLocalValue();
    }
  };

  const getListAddress = async () => {
    const token = await getCookie('token');
    if (token) {
      await AddressApi.listAddress(token).then((res) => {
        console.log('address: ', res);
        setListAddress(res.data);
        //set initial value for formik
        if (res.data) {
          let temp = res.data[res.data.length - 1];
          formik.values.username = temp.receiverName;
          formik.values.phoneNumber = temp.phone;
          formik.values.address =
            temp.details +
            ', ' +
            temp.ward.name +
            ', ' +
            temp.district.name +
            ', ' +
            temp.city.name;
        }
      });
    }
  };

  useEffect(() => {
    let sumPrice = Number((totalPrice + shippingFee).toFixed(2));
    setTotal(sumPrice);
  }, [shippingFee, totalPrice]);

  useEffect(() => {
    getUserValue();

    getProvinceGuest(1);
    getDistrictGuest('28,temp');
    setUserInfo(localStorage.getItem('userInfo'));
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      phoneNumber: '',
      note: '',
      address: '',
      paymentType: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const token = await getCookie('token');
      if (token) {
        let cartItemIdsList: number[] = cartProduct.map((data) => data.id);
        let data: any = values;
        data.cartItemIdsList = cartItemIdsList;
        data.shippingFee = shippingFee;
        console.log('values token: ', data);
        CartApi.createOrderUser(token, data).then((res) => {
          console.log('res: ', res);
          setOpenSnackbar(true);
          setTimeout(() => {
            router.push('/');
          }, 1500);
        });
      } else {
        if (
          streetRef.current &&
          wardRef.current &&
          disctrictRef.current &&
          provinceRef.current
        ) {
          formik.values.address =
            streetRef.current.value +
            ', ' +
            wardRef.current.value.split(',')[1] +
            ', ' +
            disctrictRef.current.value.split(',')[1] +
            ', ' +
            provinceRef.current.value.split(',')[1];
          //   streetRef.current.value + wardRef.current.innerText;
          // disctrictRef.current.innerText +
          // provinceRef.current.innerText;
          console.log('formik.values.address: ', formik.values.address);
        }
        let cartItemsList = cartProduct;
        let data: any = values;
        data.cartItemsList = cartItemsList;
        data.shippingFee = shippingFee;
        console.log('values no token: ', data);
        CartApi.createOrderGuest(data).then((res) => {
          console.log('res: ', res);
          setOpenSnackbar(true);
          localStorage.removeItem(LOCAL_SAVE_PREFIX);
          setTimeout(() => {
            router.push('/');
          }, 1500);
        });
      }
      try {
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });

  const getFeeGHN = async (districtName: string, wardName: string) => {
    const districtListGHN = await ShippingFeeApi.getDistrict();
    if (districtListGHN) {
      const DistrictID = districtListGHN.data.data.filter(
        (it: any) => it.DistrictName === districtName
      )[0].DistrictID;

      const wardListGHN = await ShippingFeeApi.getWard(DistrictID);
      if (wardListGHN) {
        //Check if WardCode available
        const WardCode = wardListGHN.data.data.filter(
          (it: any) => it.WardName === wardName
        )[0]
          ? wardListGHN.data.data.filter(
              (it: any) => it.WardName === wardName
            )[0].WardCode
          : wardListGHN.data.data[0].WardCode;

        const fee = await ShippingFeeApi.getFeeShip(DistrictID, WardCode);
        //convert to dollars
        // const result = Math.round((fee.data.data.total / 23560) * 100) / 100;
        setShippingFee(fee.data.data.total);
        console.log(wardListGHN);
      }
    }
  };

  const handleChangeListAddress = (e: any) => {
    console.log('value list: ', e.target.labels[0].innerText);
    let addressRaw = e.target.labels[0].innerText;
    formik.values.address = addressRaw.split('\n')[1];
    let info = addressRaw.split('\n')[0];
    formik.values.username = info.split('|')[0].trim();
    formik.values.phoneNumber = info.split('|')[1].trim();

    const curAddress = listAddress.filter((it) => e.target.value == it.id)[0];
    console.log(curAddress);

    getFeeGHN(curAddress.district.name, curAddress.ward.name);
  };

  useEffect(() => {
    if (listAddress && listAddress.length) {
      getFeeGHN(
        listAddress[listAddress.length - 1].district.name,
        listAddress[listAddress.length - 1].ward.name
      );
    }
    if (disctrictRef.current && wardRef.current) {
      getFeeGHN(
        disctrictRef.current?.value.split(',')[1],
        wardRef.current?.value.split(',')[1]
      );
    }
  }, [listAddress]);

  return (
    <Box sx={{ display: 'flex', gap: 5, mt: 5, mb: 5 }}>
      <Box sx={{ width: '60%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar}
          autoHideDuration={3000}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Buying Complete!
          </Alert>
        </Snackbar>
        <Modal
          open={openModalAddress}
          onClose={handleCloseModalAddress}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              sx={{ fontFamily: 'Josefin Sans' }}
              id='modal-modal-title'
              variant='h5'
              component='h1'
            >
              Add New Address
            </Typography>

            <CreateAddress
              setShippingFee={setShippingFee}
              handleCloseModalAddress={handleCloseModalAddress}
            />
          </Box>
        </Modal>
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
          {userInfo !== null ? (
            <Box sx={{ mt: 3 }}>
              <FormControl>
                {listAddress && listAddress.length > 0 && (
                  <RadioGroup
                    aria-labelledby='group-address'
                    defaultValue={
                      listAddress &&
                      listAddress.length > 0 &&
                      listAddress[listAddress.length - 1].id
                    }
                    onChange={(e) => handleChangeListAddress(e)}
                    name='radio-buttons-group'
                  >
                    {listAddress &&
                      listAddress.map((data, index) => (
                        <FormControlLabel
                          key={data.id}
                          value={data.id}
                          // defaultChecked={listAddress.length === index}
                          control={<Radio color='secondary' />}
                          label={<DetailAddress data={data} />}
                        />
                      ))}
                  </RadioGroup>
                )}
              </FormControl>
              <Box sx={{ mt: 3 }}>
                <BtnShopNow
                  title='Add Address'
                  type='button'
                  onClick={() => handleOpenModalAddress()}
                />
              </Box>
            </Box>
          ) : (
            <>
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
                  {formik.touched.username &&
                    Boolean(formik.errors.username) && (
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
              <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                <Box sx={{ width: '50%' }}>
                  <G.LabelInput>Province</G.LabelInput>
                  <G.Select
                    widthFull
                    disabled
                    ref={provinceRef}
                    onChange={(e) => getDistrictGuest(e.target.value)}
                  >
                    {province &&
                      province.map((data) => (
                        <option key={data.id} value={data.id + ',' + data.name}>
                          {data.name}
                        </option>
                      ))}
                  </G.Select>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <G.LabelInput>District</G.LabelInput>
                  <G.Select
                    widthFull
                    defaultValue={-1}
                    ref={disctrictRef}
                    onChange={(e) => getWardGuest(e.target.value)}
                  >
                    <option value={-1} disabled>
                      -Select Disctrict
                    </option>
                    {disctrict &&
                      disctrict.map((data) => (
                        <option key={data.id} value={data.id + ',' + data.name}>
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
                    onChange={(e) => {
                      if (disctrictRef.current && wardRef.current) {
                        getFeeGHN(
                          disctrictRef.current?.value.split(',')[1],
                          wardRef.current?.value.split(',')[1]
                        );
                      }
                    }}
                  >
                    {ward &&
                      ward.map((data) => (
                        <option key={data.id} value={data.id + ',' + data.name}>
                          {data.name}
                        </option>
                      ))}
                  </G.Select>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <G.LabelInput>
                    Street, Building, Apartment Number
                  </G.LabelInput>
                  <G.Input
                    widthFull
                    id='address'
                    name='address'
                    ref={streetRef}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  ></G.Input>
                  {formik.touched.address && Boolean(formik.errors.address) && (
                    <G.ErrorText>Missing Info of Address</G.ErrorText>
                  )}
                </Box>
              </Box>
            </>
          )}

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

          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Josefin Sans',
                mb: 1.5,
                borderBottom: '1px solid hsla(48,8%,88%,.6)',
              }}
            >
              PAYMENT
            </Typography>
            <label className='wrapChecked'>
              Ship COD (Cash On Delivery)
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
              {formatPrice(totalPrice)} VND
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
              {formatPrice(shippingFee)} VND
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
              {formatPrice(total)} VND
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutCart;
