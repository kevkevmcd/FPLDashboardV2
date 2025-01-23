import React, { useContext } from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import leaguelogo from '../../assets/leaguelogo.png';
import pitch from '../../assets/pitch.jpg';
import { TableContext } from '../../contexts';
import { Typography } from '@mui/material';
import Dashboard from '../dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TableRowsIcon from '@mui/icons-material/TableRows';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: <Typography onClick={() => window.open('https://www.gosfpl.com/')}>Blog</Typography>,
    icon: <ArticleIcon onClick={() => window.open('https://www.gosfpl.com/')}/>,
  },
  {
    title: <Typography gutterBottom onClick={() => window.open('https://discord.com/channels/1003362033259003944/1003362033259003947')}>Discord</Typography>,
    icon: <HeadsetMicIcon onClick={() => window.open('https://discord.com/channels/1003362033259003944/1003362033259003947')}/>,
  },
  {
    title: <Typography gutterBottom onClick={() => window.open('https://draft.premierleague.com')}>FPL Draft</Typography>,
    icon: <SportsSoccerIcon onClick={() => window.open('https://draft.premierleague.com')}/>,
  },
  {
    title: <Typography gutterBottom onClick={() => window.open('https://www.premierleague.com/tables')}>Premier League Table</Typography>,
    icon: <TableRowsIcon onClick={() => window.open('https://www.premierleague.com/tables')}/>,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  typography: {
    allVariants: {
      color: 'theme.palette.primary.main'
    }
  },
  colorSchemes: { light: true, dark: true },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
      },
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
        title: data.leagueData.league_name + " - Gameweek " + data.leagueData.gameweek,
      }}
      theme={theme}
    >
        <DashboardLayout >
        <div   
        style={{
        backgroundImage: `url(${pitch})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
      }}>
          <Dashboard gameweek={data.leagueData.gameweek}/>
          </div>
        </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBranding;