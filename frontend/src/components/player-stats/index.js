import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TableContext } from '../../contexts';
import Grid from '@mui/material/Grid2';

function PlayerStatCards() {
  const data = useContext(TableContext)

  const statEntries = [
    { title: "Most Goals", data: data.playerStats.most_goals },
    { title: "Most Cards", data: data.playerStats.most_cards },
    { title: "Most Bonus Points", data: data.playerStats.most_bonus_points },
  ];

  return (
    <>
      {statEntries.map((stat, index) =>
        stat.data && (
          <Grid size={4}>
            <Card key={index}>
                <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {stat.title}
                </Typography>
                <Typography variant="h5" component="div">
                    {stat.data.value}
                </Typography>
                <Typography variant="body2">
                    {stat.data.name}
                </Typography>
                </CardContent>
            </Card>
          </Grid>
        )
      )}
    </>
  );
}

export default PlayerStatCards