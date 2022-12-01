import * as React from 'react';
import List from '@mui/material/List';
import ItemList from './ItemList';
import { useEffect, useRef, useState } from 'react';
import { useStorageContext } from '../../../contexts/StorageContext';
import { MenuParams } from '../../../services/types';
import { useRouter } from 'next/router';

interface INestedList {}

export default function NestedList({}: INestedList) {
  const [selectedMenu, setSelectedMenu] = useState(-1);
  const router = useRouter();

  const handleClickMenu = (index: number) => {
    if (selectedMenu === index) {
      setSelectedMenu(-1);
    } else {
      setSelectedMenu(index);
    }
  };

  const { permissions } = useStorageContext();
  const [menuList, setMenuList] = useState<MenuParams[]>([]);
  let listMenuRef = useRef<any>(null);
  let menu: MenuParams[] = [];

  if (permissions) {
    console.log('permissions: ', permissions);
  }

  useEffect(() => {
    if (permissions) {
      for (let i = 0; i < permissions.length; i++) {
        const index = menu.findIndex(
          (I) => I.name === permissions[i].nameGroup
        );
        if (index !== -1) {
          menu.map((data) => {
            if (data.name === permissions[i].nameGroup) {
              data.list.push(permissions[i]);
              return data;
            } else {
              return data;
            }
          });
        } else {
          let newMenuParam = {
            name: permissions[i].nameGroup,
            list: [permissions[i]],
          };
          menu.push(newMenuParam);
        }
      }
      setMenuList(menu);
      // listMenuRef.current.value = menuList;
      // console.log('menu: ', menu);
    }
  }, [permissions, router, setMenuList]);

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {menuList.map((data: any, index: number) => (
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
