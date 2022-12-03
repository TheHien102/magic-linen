import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { iconData, urlMenuData } from '../../../utils/dataConfig';
import FolderIcon from '@mui/icons-material/Folder';

interface IItemList {
  data: any;
  indexMenu: number;
  selectedMenu: number;
  setSelectedMenu: (index: number) => void;
}

interface IButtonMenu {
  icon: any;
  name: string;
  list?: any;
  index: number;
  selected?: number;
  paddingLeft?: number;
  handleClick?: () => void;
}

const getIconByName = (name: string) => {
  const index = Object.keys(iconData).findIndex((key) =>
    name.split(' ').shift()?.includes(key)
  );
  if (index !== -1) {
    return Object.values(iconData).at(index);
  } else {
    return <FolderIcon color='primary' />;
  }
};

const getUrlByName = (name: string) => {
  const index = Object.keys(urlMenuData).findIndex((key) => name === key);
  if (index !== -1) {
    return Object.values(urlMenuData).at(index) as string;
  } else {
    return '404';
  }
};

const ButtonMenu = ({
  icon,
  name,
  list,
  index,
  selected,
  handleClick,
  paddingLeft,
}: IButtonMenu) => {
  return (
    <ListItemButton onClick={handleClick} sx={{ pl: paddingLeft }}>
      <ListItemIcon>{getIconByName(name)}</ListItemIcon>
      <ListItemText
        primary={name}
        primaryTypographyProps={{ fontSize: '14px' }}
      />
      {list && (index === selected ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );
};

export default function ItemList({
  data,
  indexMenu,
  selectedMenu,
  setSelectedMenu,
}: IItemList) {
  console.log('data menu: ', data);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <>
      {data.url ? (
        <Link href={data.url} key={indexMenu}>
          <a>
            <ButtonMenu
              icon={data.icon}
              name={data.name}
              list={data.list}
              index={indexMenu}
              selected={selectedMenu}
            />
          </a>
        </Link>
      ) : (
        <ButtonMenu
          key={indexMenu}
          icon={data.icon}
          name={data.name}
          list={data.list}
          index={indexMenu}
          selected={selectedMenu}
          handleClick={() => setSelectedMenu(indexMenu)}
        />
      )}
      {data.list && (
        <Collapse in={indexMenu === selectedMenu} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {data.list.map(
              (_data: any, index: number) =>
                _data.showMenu && (
                  <Box key={index}>
                    {getUrlByName(_data.name) ? (
                      <Link href={getUrlByName(_data.name)}>
                        <a>
                          <ButtonMenu
                            icon={_data.icon}
                            name={_data.name}
                            list={_data.list}
                            index={index}
                            selected={selectedIndex}
                            paddingLeft={4}
                            handleClick={() => handleClick(index)}
                          />
                        </a>
                      </Link>
                    ) : (
                      <ButtonMenu
                        icon={_data.icon}
                        name={_data.name}
                        list={_data.list}
                        index={index}
                        selected={selectedIndex}
                        paddingLeft={4}
                        handleClick={() => handleClick(index)}
                      />
                    )}
                    {/* Third level of menu */}
                    {/* {_data.list && (
                      <Collapse
                        in={index === selectedIndex}
                        timeout='auto'
                        unmountOnExit
                        key={index}
                      >
                        <List component='div' disablePadding>
                          {_data.list.map((data: any, index: number) => (
                            <Box key={index}>
                              {data.url && !data.showMenu ? (
                                <Link href={data.url} key={index}>
                                  <ButtonMenu
                                    icon={data.icon}
                                    name={data.name}
                                    index={index}
                                    paddingLeft={6}
                                  />
                                </Link>
                              ) : (
                                <ButtonMenu
                                  key={index}
                                  icon={data.icon}
                                  name={data.name}
                                  index={index}
                                  paddingLeft={6}
                                />
                              )}
                            </Box>
                          ))}
                        </List>
                      </Collapse>
                    )} */}
                  </Box>
                )
            )}
          </List>
        </Collapse>
      )}
    </>
  );
}
