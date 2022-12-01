import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
// import avatarLogo from '../../assets/imgs/logo.png';
import NestedList from '../Dashboard/NestedList';
import { LinearProgress } from '@mui/material';
import { AccountApi } from '../../../services/api/account';
import { useStorageContext } from '../../../contexts/StorageContext';
import { useRouter } from 'next/router';
import { getCookie, removeCookie } from '../../../services/cookies';
// import IconBreadcrumbs from "../Customers/IconBreadcrumbs";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface ILayout {
  children: React.ReactElement;
}

export default function Layout({ children }: ILayout) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleLogout = async () => {
    const token = await getCookie('token');
    const res = await AccountApi.logout(token as string);
    await removeCookie('token');
    if (res) {
      console.log('logout');
      // router.push('/admin');
    }
  };

  return (
    <div className={styles.container}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed' open={open}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Grid
              container
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
            >
              <Grid item>
                <Typography variant='h6' noWrap component='div'>
                  <Button
                    id='basic-button'
                    aria-controls={openDropdown ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openDropdown ? 'true' : undefined}
                    color='inherit'
                    sx={{ textTransform: 'capitalize' }}
                    onClick={handleClick}
                  >
                    <Avatar
                      alt='Admin vacation'
                      src={'/'}
                      sx={{ marginRight: '8px' }}
                    />
                    Admin
                  </Button>
                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={openDropdown}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <Box sx={{ textAlign: 'center', width: 270 }}>
                        <Avatar
                          alt='Admin'
                          src={'/'}
                          sx={{
                            width: 80,
                            height: 80,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: '10px',
                          }}
                        />
                        <Typography variant='h6' component='p'>
                          Admin
                        </Typography>
                        <Typography>Member since Feb, 2019</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                          marginTop: '20px',
                        }}
                      >
                        <Button variant='outlined'>Profile</Button>
                        <Button
                          variant='outlined'
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </Button>
                      </Box>
                    </MenuItem>
                  </Menu>
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <NestedList />
          <Divider />
        </Drawer>

        <Box component='main' sx={{ flexGrow: 1, pt: 3, overflow: 'hidden' }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </div>
  );
}
