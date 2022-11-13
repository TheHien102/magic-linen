import * as React from 'react';
import List from '@mui/material/List';
import ItemList from './ItemList';
import { menuData } from '../../../utils/dataConfig';
import { useState } from 'react';

interface INestedList {
  roles: any;
}

export default function NestedList({ roles }: INestedList) {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleClickMenu = (index: number) => {
    if (selectedMenu === index) {
      setSelectedMenu(0);
    } else {
      setSelectedMenu(index);
    }
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {menuData.map((data, index) => (
        <ItemList
          key={index}
          data={data}
          indexMenu={index}
          selectedMenu={selectedMenu}
          setSelectedMenu={handleClickMenu}
        />
      ))}
    </List>
  );
}
