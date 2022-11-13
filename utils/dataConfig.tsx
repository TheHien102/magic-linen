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
