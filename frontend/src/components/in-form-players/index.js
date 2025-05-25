import React, { useContext, useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Collapse, ListItemIcon } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChartsContext } from '../../contexts';

function InFormPlayers() {
  const data = useContext(ChartsContext);
  const [openPlayerId, setOpenPlayerId] = useState(null);

  const handleToggle = (playerId) => {
    setOpenPlayerId(openPlayerId === playerId ? null : playerId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        In Form Players
      </Typography>

      <List dense>
        {data.inFormPlayers.map((player) => (
          <React.Fragment key={player.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleToggle(player.id)} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItemText
                  primary={player.name}
                  sx={{ textAlign: 'left' }}
                />
                <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'flex-end' }}>
                  {openPlayerId === player.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <Collapse in={openPlayerId === player.id} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4 }}>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Form"
                      secondary={player.form}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Total Points"
                      secondary={player.total_points}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="PPG"
                      secondary={player.points_per_game}
                    />
                  </ListItem>
                </List>
              </Box>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default InFormPlayers;