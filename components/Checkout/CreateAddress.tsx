import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { getCookie } from '../../services/cookies';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ProvinceApi } from '../../services/api/province';
import { ProvinceParam } from '../../services/types';
import * as G from '../../styles/global.styled';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import { AddressApi } from '../../services/api/address';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  province_cityId: yup.number().required('Province is required'),
  province_districtId: yup.number().required('Disctrict is required'),
  province_wardId: yup.number().required('Ward is required'),
  details: yup.string().required('Street is required'),
  receiverName: yup.string().required('Receivier is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
});

interface ICreateAddress {
  handleCloseModalAddress: () => void;
}

const CreateAddress = ({ handleCloseModalAddress }: ICreateAddress) => {
  const [province, setProvince] = useState<ProvinceParam[]>([]);
  const [disctrict, setDistrict] = useState<ProvinceParam[]>([]);
  const [ward, setWard] = useState<ProvinceParam[]>([]);
  const provinceRef = useRef<HTMLSelectElement>(null);
  const disctrictRef = useRef<HTMLSelectElement>(null);
  const wardRef = useRef<HTMLSelectElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      province_cityId: 0,
      province_districtId: 0,
      province_wardId: 0,
      details: '',
      phone: '',
      receiverName: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.values.province_cityId = Number(provinceRef.current?.value);
      formik.values.province_districtId = Number(disctrictRef.current?.value);
      formik.values.province_wardId = Number(wardRef.current?.value);
      const token = await getCookie('token');
      console.log('values: ', values);

      if (token) {
        AddressApi.AddNewAddress(token, values).then((res) => {
          console.log('res create address: ', res);
          handleCloseModalAddress();
        });
      }
      try {
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });

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
    formik.handleChange;
  };

  const getWard = (parentId: number) => {
    ProvinceApi.listProvince(SEARCH_PARAMS, null, parentId).then((res) => {
      setWard(res.data.data);
    });
    formik.handleChange;
  };

  useEffect(() => {
    getProvince(1);
    getDistrict(127);
  }, []);

  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ width: '50%' }}>
            <G.LabelInput>RECEIVIER NAME</G.LabelInput>
            <G.Input
              widthFull
              id='receiverName'
              name='receiverName'
              value={formik.values.receiverName}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.receiverName &&
              Boolean(formik.errors.receiverName) && (
                <G.ErrorText>{formik.errors.receiverName}</G.ErrorText>
              )}
          </Box>
          <Box sx={{ width: '50%' }}>
            <G.LabelInput>PHONE</G.LabelInput>
            <G.Input
              widthFull
              id='phone'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.phone && Boolean(formik.errors.phone) && (
              <G.ErrorText>{formik.errors.phone}</G.ErrorText>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
          <Box sx={{ width: '50%' }}>
            <G.LabelInput>Province</G.LabelInput>
            <G.Select
              widthFull
              ref={provinceRef}
              disabled
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
              id='province_districtId'
              name='province_districtId'
              defaultValue={-1}
              ref={disctrictRef}
              onChange={(e) => getWard(Number(e.target.value))}
              value={formik.values.province_districtId}
            >
              <option value={-1} disabled>
                -Select Disctrict
              </option>
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
              id='province_wardId'
              name='province_wardId'
              widthFull
              ref={wardRef}
              disabled={ward && ward.length > 0 ? false : true}
              // onChange={(e) => getDistrict(Number(e.target.value))}
              value={formik.values.province_wardId}
              onChange={formik.handleChange}
            >
              {ward &&
                ward.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
            </G.Select>
            {formik.touched.province_wardId &&
              Boolean(formik.errors.province_wardId) && (
                <G.ErrorText>{formik.errors.province_wardId}</G.ErrorText>
              )}
          </Box>
          <Box sx={{ width: '50%' }}>
            <G.LabelInput>Street, Building, Apartment Number</G.LabelInput>
            <G.Input
              id='details'
              name='details'
              value={formik.values.details}
              onChange={formik.handleChange}
              widthFull
            ></G.Input>
            {formik.touched.details && Boolean(formik.errors.details) && (
              <G.ErrorText>Missing Info of Address</G.ErrorText>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <BtnShopNow
            title='Cancel'
            type='button'
            onClick={() => handleCloseModalAddress()}
          />
          <BtnShopNow title='Confirm' revertColor type='submit' />
        </Box>
      </form>
    </Box>
  );
};

export default CreateAddress;
