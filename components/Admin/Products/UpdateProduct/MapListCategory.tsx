import { MenuItem } from '@mui/material';
import React from 'react';
import { CategoryParams } from '../../../../services/types';

interface IMap {
  data: CategoryParams[];
}

const MapListCategory = ({ data }: IMap) => {
  return (
    <>
      {data.map(item => (
        <>
          <MenuItem key={item.id} sx={{ fontWeight: 'bold' }} value={item.name}>
            {item.name}
          </MenuItem>
          {item.categoryList?.length && (
            <MapListCategory data={item.categoryList} />
          )}
        </>
      ))}
    </>
  );
};

export default MapListCategory;
