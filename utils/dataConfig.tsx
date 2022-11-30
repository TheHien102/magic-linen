import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import company1 from '../assets/images/company1.jpg';
import company2 from '../assets/images/company2.jpg';
import company3 from '../assets/images/company3.jpg';
import company4 from '../assets/images/company4.jpg';
import company5 from '../assets/images/company5.jpg';
import company6 from '../assets/images/company6.jpg';
import { VariantParams } from '../services/types';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PreviewIcon from '@mui/icons-material/Preview';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import UpdateIcon from '@mui/icons-material/Update';
import HttpsIcon from '@mui/icons-material/Https';

export const iconData = {
  Folder: <FolderIcon color='primary' />,
  Permission: <HttpsIcon color='primary' />,
  Group: <HealthAndSafetyIcon color='primary' />,
  Create: <AddCircleIcon color='primary' />,
  View: <PreviewIcon sx={{ color: '#cddc39' }} />,
  Update: <UpdateIcon color='secondary' />,
};

export const urlMenuData = {
  'Create Group': '/admin/create-group',
  'Create Permission': '/admin/create-permission',
};

export const menuData = [
  {
    icon: <DashboardIcon color='primary' />,
    title: 'Dashboard',
    url: '/admin/dashboard',
  },
  {
    icon: <LocalMallIcon color='primary' />,
    title: 'Product',
    items: [
      {
        icon: <RadioButtonUncheckedIcon />,
        title: 'List Product',
        url: '/admin/product',
      },
      {
        icon: <RadioButtonUncheckedIcon />,
        title: 'Add Product',
        url: '/admin/product/add-product',
      },
    ],
  },
  {
    icon: <AdminPanelSettingsIcon color='warning' />,
    title: 'Admin',
    items: [
      {
        icon: <AddCircleIcon color='primary' />,
        title: 'Create Admin',
        url: '/admin/list/create-admin',
      },
      {
        icon: <PreviewIcon sx={{ color: '#cddc39' }} />,
        title: 'View Admin',
        url: '/admin/list',
      },
    ],
  },
  {
    icon: <HealthAndSafetyIcon sx={{ color: '#cddc39' }} />,
    title: 'Group',
    items: [
      {
        icon: <AddCircleIcon color='primary' />,
        title: 'Create Group',
        url: '/admin/list/create-group',
      },
      {
        icon: <PreviewIcon sx={{ color: '#cddc39' }} />,
        title: 'View Group',
        url: '/admin/group',
      },
    ],
  },
];

export const categoryList = [
  {
    name: 'name',
    list: ['n1', 'n2'],
  },
];

export const companyData = [
  {
    url: company1,
    alt: 'company1',
  },
  {
    url: company2,
    alt: 'company2',
  },
  {
    url: company3,
    alt: 'company3',
  },
  {
    url: company4,
    alt: 'company4',
  },
  {
    url: company5,
    alt: 'company5',
  },
  {
    url: company6,
    alt: 'company6',
  },
];

export const names: VariantParams[] = [
  {
    id: 0,
    name: 'size',
    property: 'S',
    addPrice: 0,
  },
  {
    id: 1,
    name: 'size',
    property: 'M',
    addPrice: 0,
  },
  {
    id: 2,
    name: 'size',
    property: 'L',
    addPrice: 0,
  },
  {
    id: 3,
    name: 'size',
    property: 'XL',
    addPrice: 0,
  },
  {
    id: 4,
    name: 'size',
    property: 'XXL',
    addPrice: 0,
  },
];
