// assets
import { IconDashboard } from '@tabler/icons';
import FastfoodIcon from '@mui/icons-material/Fastfood';
// constant
const icons = { IconDashboard, FastfoodIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/free/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'foods',
      title: 'Foods',
      type: 'item',
      url: '/foods',
      icon: icons.FastfoodIcon,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
