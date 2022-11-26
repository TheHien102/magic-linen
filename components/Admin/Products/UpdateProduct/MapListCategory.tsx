import { MenuItem } from '@mui/material';
import React from 'react';
import { CategoryParams } from '../../../../services/types';

interface IMap {
  data: CategoryParams[];
  fontsize: number;
  left: number;
}

const MapListCategory = ({ data, fontsize, left }: IMap) => {
  return (
    <>
      {data.map(item => (
        <>
          <MenuItem
            key={item.id}
            sx={{ fontSize: fontsize + 'px', left: left + 'px' }}
            value={item.name}
          >
            {item.name}
          </MenuItem>
          {item.categoryList?.length && (
            <MapListCategory
              data={item.categoryList}
              fontsize={fontsize * 0.9}
              left={left + 24}
            />
          )}
        </>
      ))}
    </>
  );
};

export default MapListCategory;
