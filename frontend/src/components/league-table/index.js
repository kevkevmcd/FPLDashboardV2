import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableContext } from '../../contexts';
import axios from 'axios';
import ManagerModal from './ManagerModal';
import { Typography } from '@mui/material';

function ManagerTable() {
  const data = useContext(TableContext)
  const [open, setOpen] = useState(false)
  const [managerData, setManagerData] = useState(null)
  const [loading, setLoading] = useState(false)
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleOpen = async (managerId) => {
    setLoading(true);
    setOpen(true);

    try{
      const response = await axios.post(`${backendUrl}/manager/${managerId}/squad`);
      setManagerData(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setManagerData(null);
  };

  return (
    <>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
        }}
      >
          <Typography variant="h6" component="div" sx={{ mb: 2, ml: 2 }}>
              League Table
          </Typography>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Team Name</TableCell>
                      <TableCell align="right">Pick</TableCell>
                      <TableCell align="right">Points</TableCell>
                      <TableCell align="right">Total Points</TableCell>
                      <TableCell align="right">Total Trades</TableCell>
                      <TableCell align="right">Point Difference</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {data.leagueEntries.map((row, index) => (
                      <TableRow key={index} hover onClick={() => handleOpen(row.id)} sx={{ cursor: 'pointer' }}>
                        <TableCell align="left">{row.position}</TableCell>
                        <TableCell component="th" scope="row">{row.team_name}</TableCell>
                        <TableCell align="right">{row.pick}</TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                        <TableCell align="right">{row.total_points_scored}</TableCell>
                        <TableCell align="right">{row.total_trades}</TableCell>
                        <TableCell align="right">{row.point_difference}</TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </Box>
      {(managerData || loading) && (
        <ManagerModal
          open={open}
          handleClose={handleClose}
          data={managerData}
          loading={loading}
        />
      )}
    </>
  );
}

export default ManagerTable;