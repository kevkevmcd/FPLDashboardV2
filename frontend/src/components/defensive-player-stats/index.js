import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TableContext } from '../../contexts';
import Grid from '@mui/material/Grid2';
import { CardMedia } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

function DefensivePlayerStatCards() {
  const data = useContext(TableContext)

  const statEntries = [
    { title: "Most Saves", data: data.playerStats.most_saves },
    { title: "Most Clean Sheets", data: data.playerStats.most_clean_sheets },
    { title: "Most Cards", data: data.playerStats.most_cards },
    { title: "Most Penalties Saved", data: data.playerStats.most_penalty_saves },
  ];

  return (
    <>
      {statEntries.map((stat, index) =>
        stat.data && (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
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

export default DefensivePlayerStatCards