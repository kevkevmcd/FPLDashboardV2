import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableContext } from '../../contexts';

function ManagerTable() {
  const data = useContext(TableContext)

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
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
                    <TableRow key={index}>
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
  );
}

export default ManagerTable;