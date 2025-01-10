import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import ManagerTable from '../league-table';
import TopManagers from '../top-manager-list';
import InFormPlayers from '../in-form-players';
import MatchPointsGraph from '../match-points';
import PointsScoredGraph from '../points-scored';
import PlayerStatCards from '../player-stats';
import DefensivePlayerStatCards from '../defensive-player-stats';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <PlayerStatCards />
      </Grid>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Item>
            <ManagerTable />
          </Item>
        </Grid>
      <Grid container spacing={1}>
          <Grid size={6}>
            <Item>
                <TopManagers />
            </Item>
          </Grid>  
          <Grid size={6}>
            <Item>
                <InFormPlayers />
            </Item>
          </Grid>
          <Grid size={6}>
            <Item>
                <InFormPlayers />
            </Item>
          </Grid>  
      </Grid>
      <Grid container spacing={1}>
          <DefensivePlayerStatCards />
      </Grid>
        <Grid size={6}>
          <Item>
            <PointsScoredGraph />
          </Item>
        </Grid>
        <Grid size={6}>
          <Item>
            <MatchPointsGraph />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;