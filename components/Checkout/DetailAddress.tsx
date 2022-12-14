import { Box } from '@mui/material';
import React from 'react';
import { ListAddressParams } from '../../services/types';

interface IDetailAddress {
  data: ListAddressParams;
}

const DetailAddress = ({ data }: IDetailAddress) => {
  return (
    <Box>
      <Box>
        {data.receiverName} | <b>{data.phone}</b>
      </Box>
      <Box>
        {data.details +
          ', ' +
          data.ward.name +
          ', ' +
          data.district.name +
          ', ' +
          data.city.name}
      </Box>
    </Box>
  );
};

export default DetailAddress;
