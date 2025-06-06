import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TableContext } from '../../contexts';
import Grid from '@mui/material/Grid2';
import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: '0 5px 15px rgba(0,0,0,1)',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function PlayerStatCards() {
  const data = useContext(TableContext)

  const statEntries = [
    { title: "Most Goals", data: data.playerStats.most_goals },
    { title: "Most Assists", data: data.playerStats.most_assists },
    { title: "Most Clean Sheets", data: data.playerStats.most_clean_sheets },
    { title: "Most Saves", data: data.playerStats.most_saves },
  ];

  return (
    <>
      {statEntries.map((stat, index) =>
        stat.data && (
          <Grid key={index} size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
            <Item>
              <Card sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                  <CardMedia
                      component="img"
                      image={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${stat.data.code}.png`}
                      sx={{
                        width: 110, 
                        height: 140, 
                        objectFit: 'contain', 
                        marginRight: 2 
                      }}
                  />
                  <CardContent sx={{ flex: 1 }}>
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
            </Item>
          </Grid>
        )
      )}
    </>
  );
}

export default PlayerStatCards