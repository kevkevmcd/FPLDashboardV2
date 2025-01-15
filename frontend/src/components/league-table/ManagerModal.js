import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

const ManagerModal = ({ open, handleClose, data, loading }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="manager-modal-title">
      <Box sx={style}>
        <Box sx={{ mb: 4 }}>
          <Typography id="manager-modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
            {data?.team_name || ''}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'gray' }}>
            {data?.manager_name || ''}
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>            
        ) : (
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>POS</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>MP</TableCell>
                  <TableCell>Starts</TableCell>
                  <TableCell>GS</TableCell>
                  <TableCell>A</TableCell>
                  <TableCell>CS</TableCell>
                  <TableCell>OG</TableCell>
                  <TableCell>YC</TableCell>
                  <TableCell>RC</TableCell>
                  <TableCell>B</TableCell>
                  <TableCell>PEN ORDER</TableCell>
                  <TableCell>EG</TableCell>
                  <TableCell>EA</TableCell>
                  <TableCell>EGC</TableCell>
                  <TableCell>EG per 90</TableCell>
                  <TableCell>EA per 90</TableCell>
                  <TableCell>EGI per 90</TableCell>
                  <TableCell>S per 90</TableCell>
                  <TableCell>CS per 90</TableCell>
                  <TableCell>PENS SAVE</TableCell>
                  <TableCell>PENS MISS</TableCell>
                  <TableCell>FORM</TableCell>
                  <TableCell>BPS</TableCell>
                  <TableCell>I</TableCell>
                  <TableCell>C</TableCell>
                  <TableCell>T</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.squad.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.total_points}</TableCell>
                    <TableCell>{player.minutes}</TableCell>
                    <TableCell>{player.starts}</TableCell>
                    <TableCell>{player.goals_scored}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                    <TableCell>{player.clean_sheets}</TableCell>
                    <TableCell>{player.own_goals}</TableCell>
                    <TableCell>{player.yellow_cards}</TableCell>
                    <TableCell>{player.red_cards}</TableCell>
                    <TableCell>{player.saves}</TableCell>
                    <TableCell>{player.points_per_game}</TableCell>
                    <TableCell>{player.bonus}</TableCell>
                    <TableCell>{player.penalties_order}</TableCell>
                    <TableCell>{player.expected_goals}</TableCell>
                    <TableCell>{player.expected_assists}</TableCell>
                    <TableCell>{player.expected_goals_conceded}</TableCell>
                    <TableCell>{player.expected_goals_per_90}</TableCell>
                    <TableCell>{player.expected_assists_per_90}</TableCell>
                    <TableCell>{player.expected_goal_involvements_per_90}</TableCell>
                    <TableCell>{player.saves_per_90}</TableCell>
                    <TableCell>{player.clean_sheets_per_90}</TableCell>
                    <TableCell>{player.penalties_saved}</TableCell>
                    <TableCell>{player.penalties_missed}</TableCell>
                    <TableCell>{player.form}</TableCell>
                    <TableCell>{player.bps}</TableCell>
                    <TableCell>{player.influence}</TableCell>
                    <TableCell>{player.creativity}</TableCell>
                    <TableCell>{player.threat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
};

export default ManagerModal;