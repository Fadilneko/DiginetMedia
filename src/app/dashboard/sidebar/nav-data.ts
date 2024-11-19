export const navbarData = [
  // {
  //   routeLink: 'dashboard',
  //   icon: 'fal fa-home',
  //   label: 'Dashboard',
  // },
  {
    routeLink: '/home',
    icon: ' fa fa-home',
    label: 'Home',
  },
  {
    routeLink: '/chart',
    icon: 'fa fa-history',
    label: 'History',
  },
  {
    routeLink: '/food-list',
    icon: 'fa fa-info',
    label: 'Report',
  },
  {
    routeLink: '/',
    icon: ' fa fa-cog',
    label: 'menu',
    submenu : [
      {
        routeLink: '/settinghakakses',
        icon: 'fa fa-cog',
        label: 'Setting Hak Akses',
      },
      {
        routeLink: '/settinggrub',
        icon: 'fa fa-cog',
        label: 'Setting Group',
      },

      {
        routeLink: '/settingmenu',
        icon: 'fa fa-cog',
        label: 'Setting Menu',
      },

    ],
    showSubmenu: false
    
  },
  {
    routeLink: '/inbox',
    icon: ' fa fa-inbox',
    label: 'Inbox',
  },
  


];
