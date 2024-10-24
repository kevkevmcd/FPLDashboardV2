import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function DemoPageContent() {
    const [leagueEntries, setLeagueEntries] = useState([]);

    useEffect(() => {
    axios.get('/league-table')
        .then(res => setLeagueEntries(res.data))
        .catch(err => console.error(err));
    }, []);

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Team Name</TableCell>
                    <TableCell align="right">Pick</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">Total Points</TableCell>
                    <TableCell align="right">Total Trades</TableCell>
                    <TableCell align="right">Point Difference</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {leagueEntries.map((row, index) => (
                    <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {row.team_name}
                    </TableCell>
                    <TableCell align="right">{row.pick}</TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                    <TableCell align="right">{row.total_points_scored}</TableCell>
                    <TableCell align="right">{row.total_trades}</TableCell>
                    <TableCell align="right">{row.point_difference}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding() {

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
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'MUI',
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBranding;