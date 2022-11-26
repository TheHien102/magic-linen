import { MenuItem } from '@mui/material';
import React from 'react';
import { CategoryParams } from '../../../../services/types';

interface IMap {
  data: CategoryParams[];
}

const MapListItem = ({ data }: IMap) => {
  return (
    <>
      {data.map(item => (
        <>
          <MenuItem key={item.id} sx={{ fontWeight: 'bold' }} value={item.name}>
            {item.name}
          </MenuItem>
          {item.categoryList?.length && (
            <MapListItem data={item.categoryList} />
          )}
        </>
      ))}
    </>
  );
};

export default MapListItem;
