import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ManagerTable from '../league-table';
import TopManagers from '../top-manager-list';
import InFormPlayers from '../in-form-players';
import MatchPointsGraph from '../match-points';
import PointsScoredGraph from '../points-scored';
import PlayerStatCards from '../player-stats';
import DefensivePlayerStatCards from '../defensive-player-stats';
import { Typography } from '@mui/material';
import WeeklyStatsChart from '../weekly-stats';
import WeeklyTradesGraph from '../trades';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: '0 7px 15px rgba(0,0,0,1)',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Dashboard({ gameweek }) {
  return (
    <>
      {!gameweek ? (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card             
            sx={{
              width: { xs: '90vw', sm: 400, md: 400, lg: 500 },
              maxWidth: 600,
              p: 2,
              boxShadow: 3,
              bgcolor: 'background.paper',
              opacity: 0.95,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Come Back Next Season!
              </Typography>
            </CardContent>
          </Card>
        </Box>   
      ) : (
        <Box sx={{ flexGrow: 1, padding: 2 }}> 
          <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2 }}>
                <Item>
                    <TopManagers />
                </Item>
              </Grid>  
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
                <Item>
                  <ManagerTable />
                </Item>
            </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2 }}>
                <Item>
                    <InFormPlayers />
                </Item>
              </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
              <Item>
                <PointsScoredGraph />
              </Item>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
              <Item>
                <MatchPointsGraph />
              </Item>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
              <Item>
                <WeeklyStatsChart />
              </Item>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
              <Item>
                <WeeklyTradesGraph />
              </Item>
            </Grid>
            <PlayerStatCards />
            <DefensivePlayerStatCards />
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Dashboard;