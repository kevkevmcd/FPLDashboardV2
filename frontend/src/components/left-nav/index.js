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
    title: <Typography onClick={() => window.open('https://www.gosfpl.com/')} sx={{
      backgroundColor: 'transparent',
      color: 'inherit',
    }}>Blog</Typography>,
    icon: <LibraryBooksIcon onClick={() => window.open('https://www.gosfpl.com/')}/>,
  },
  {
    title: <Typography gutterBottom onClick={() => window.open('https://discord.com/channels/1003362033259003944/1003362033259003947')}>Discord</Typography>,
    icon: <LibraryBooksIcon onClick={() => window.open('https://discord.com/channels/1003362033259003944/1003362033259003947')}/>,
  },
  {
    title: <Typography gutterBottom onClick={() => window.open('https://draft.premierleague.com/?state=success')}>FPL Draft</Typography>,
    icon: <LibraryBooksIcon onClick={() => window.open('https://draft.premierleague.com/?state=success')}/>,
  },
  {
    title: <Typography gutterBottom onClick={() => window.open('https://www.premierleague.com/tables')}>Premier League Table</Typography>,
    icon: <LibraryBooksIcon onClick={() => window.open('https://www.premierleague.com/tables')}/>,
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