import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { ChartsContext } from '../../contexts';

function TopManagers() {
    const data = useContext(ChartsContext);
  
    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Top Managers
        </Typography>

        <List>
          {Object.entries(data.inFormManagers).map(([teamName, cumulativeMatchPoints]) => (
            <ListItem key={teamName} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <ListItemText
                primary={teamName}
                secondary={`${cumulativeMatchPoints} / 12 points`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

export default TopManagers;