import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TableContext } from '../../contexts';
import Grid from '@mui/material/Grid2';

function DefensivePlayerStatCards() {
  const data = useContext(TableContext)

  const statEntries = [
    { title: "Most Saves", data: data.playerStats.most_saves },
    { title: "Most Clean Sheets", data: data.playerStats.most_clean_sheets },
    { title: "Most Own Goals", data: data.playerStats.most_own_goals },
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

export default DefensivePlayerStatCards