import React, { Fragment } from 'react';
import { CategoryParams } from '../../../../services/types';

interface IMap {
  data: CategoryParams[];
  fontsize: number;
  left: number;
  weight: string;
}

const MapListCategory = ({ data, fontsize, left, weight }: IMap) => {
  return (
    <>
      {data.map((item) => (
        <Fragment key={item.id}>
          <option
            style={{
              fontSize: fontsize + 'px',
              fontWeight: weight,
              left: left + 'px',
            }}
            value={item.name}
          >
            &nbsp; {item.name}
          </option>
          {item.categoryList?.length && (
            <MapListCategory
              data={item.categoryList}
              fontsize={fontsize * 0.9}
              left={left + 24}
              weight={'lighter'}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};

export default MapListCategory;
