import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PointsScoredGraph from '../points-scored';
import leaguelogo from '../../assets/leaguelogo.png';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Blog',
    icon: <LibraryBooksIcon onClick={() => window.open('https://www.gosfpl.com/')}/>,
  },
];

const demoTheme = createTheme({
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

function DashboardLayoutBranding({ league_name }) {

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={leaguelogo} alt="League of Stones" />,
        title: league_name,
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PointsScoredGraph />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBranding;