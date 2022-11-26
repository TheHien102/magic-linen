import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { pink } from '@mui/material/colors';
import PieChartIcon from '@mui/icons-material/PieChart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FolderIcon from '@mui/icons-material/Folder';
import AppsIcon from '@mui/icons-material/Apps';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import company1 from '../assets/images/company1.jpg';
import company2 from '../assets/images/company2.jpg';
import company3 from '../assets/images/company3.jpg';
import company4 from '../assets/images/company4.jpg';
import company5 from '../assets/images/company5.jpg';
import company6 from '../assets/images/company6.jpg';
import { VariantParams } from '../services/types';

export const menuData = [
  {
    icon: <HomeIcon />,
    title: 'Dashboard',
    url: '/admin/dashboard',
  },
  {
    icon: <FolderIcon />,
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
    icon: <AdminPanelSettingsIcon />,
    title: 'Admin',
    items: [
      {
        icon: <RadioButtonUncheckedIcon />,
        title: 'Create Admin',
        url: '/admin/list/create-admin',
      },
      {
        icon: <RadioButtonUncheckedIcon />,
        title: 'View Admin',
        url: '/admin/list',
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
