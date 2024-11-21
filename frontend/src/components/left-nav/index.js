import React, { useContext } from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import leaguelogo from '../../assets/leaguelogo.png';
import { TableContext } from '../../contexts';
import { Typography } from '@mui/material';
import Dashboard from '../dashboard';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: <Typography onClick={() => window.open('https://www.gosfpl.com/')}>Blog</Typography>,
    icon: <LibraryBooksIcon onClick={() => window.open('https://www.gosfpl.com/')}/>,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBranding() {
  const data = useContext(TableContext)

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={leaguelogo} alt="League of Stones" />,
        title: data.leagueData.league_name,
      }}
      theme={theme}
    >
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBranding;