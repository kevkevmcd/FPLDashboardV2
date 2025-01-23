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
    { title: "Most Own Goals", data: data.playerStats.most_own_goals },
    { title: "Most Bonus Points", data: data.playerStats.most_bonus_points },
    { title: "Most Assists", data: data.playerStats.most_assists },
  ];

  return (
    <>
      {statEntries.map((stat, index) =>
        stat.data && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Item>
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
            </Item>
          </Grid>
        )
      )}
    </>
  );
}

export default PlayerStatCards