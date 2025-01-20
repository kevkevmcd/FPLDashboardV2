import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TableContext } from '../../contexts';
import Grid from '@mui/material/Grid2';
import { Avatar, CardMedia } from '@mui/material';

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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card key={index}>
                <CardMedia 
                    component="img"
                    image={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${stat.data.code}.png`}
                    sx={{ width: '15%', height: 'auto', margin: '0 auto', padding: 1 }}
                  />
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