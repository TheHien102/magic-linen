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

interface IItemList {
  data: any;
  indexMenu: number;
  selectedMenu: number;
  setSelectedMenu: (index: number) => void;
}

interface IButtonMenu {
  icon: any;
  title: string;
  items?: any;
  index: number;
  selected?: number;
  paddingLeft?: number;
  handleClick?: () => void;
}

const ButtonMenu = ({
  icon,
  title,
  items,
  index,
  selected,
  handleClick,
  paddingLeft,
}: IButtonMenu) => {
  return (
    <ListItemButton onClick={handleClick} sx={{ pl: paddingLeft }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        primaryTypographyProps={{ fontSize: '14px' }}
      />
      {items && (index === selected ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );
};

export default function ItemList({
  data,
  indexMenu,
  selectedMenu,
  setSelectedMenu,
}: IItemList) {
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
              title={data.title}
              items={data.items}
              index={indexMenu}
              selected={selectedMenu}
            />
          </a>
        </Link>
      ) : (
        <ButtonMenu
          key={indexMenu}
          icon={data.icon}
          title={data.title}
          items={data.items}
          index={indexMenu}
          selected={selectedMenu}
          handleClick={() => setSelectedMenu(indexMenu)}
        />
      )}
      {data.items && (
        <Collapse in={indexMenu === selectedMenu} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {data.items.map((_data: any, index: number) => (
              <Box key={index}>
                {_data.url ? (
                  <Link href={_data.url}>
                    <a>
                      <ButtonMenu
                        icon={_data.icon}
                        title={_data.title}
                        items={_data.items}
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
                    title={_data.title}
                    items={_data.items}
                    index={index}
                    selected={selectedIndex}
                    paddingLeft={4}
                    handleClick={() => handleClick(index)}
                  />
                )}
                {_data.items && (
                  <Collapse
                    in={index === selectedIndex}
                    timeout='auto'
                    unmountOnExit
                    key={index}
                  >
                    <List component='div' disablePadding>
                      {_data.items.map((data: any, index: number) => (
                        <Box key={index}>
                          {data.url ? (
                            <Link href={data.url} key={index}>
                              <ButtonMenu
                                icon={data.icon}
                                title={data.title}
                                index={index}
                                paddingLeft={6}
                              />
                            </Link>
                          ) : (
                            <ButtonMenu
                              key={index}
                              icon={data.icon}
                              title={data.title}
                              index={index}
                              paddingLeft={6}
                            />
                          )}
                        </Box>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
