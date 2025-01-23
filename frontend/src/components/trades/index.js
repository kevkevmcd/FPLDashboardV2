import React, { useContext, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import colors from '../../utils/chart-colors';
import { ChartsContext } from '../../contexts';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

const chartModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

function WeeklyTradesGraph() {
  const data = useContext(ChartsContext);
  const [open, setOpen] = useState(false);
  const [hoveredLine, setHoveredLine] = useState(null);

  const { lineChartData, xAxisData } = useMemo(() => {
    if (!data.trades || data.trades.length === 0) {
      return { lineChartData: [], xAxisData: [] };
    }

    const maxGameweeks = Math.max(
      ...data.trades.map((manager) => manager.trades.length)
    );
    const xAxisData = Array.from({ length: maxGameweeks }, (_, i) => i + 1);

    const formattedData = xAxisData.map((week, index) => {
      const weekData = { week };
      data.trades.forEach((manager) => {
        weekData[manager.team_name] = manager.trades[index] || 0;
      });
      return weekData;
    });

    return { lineChartData: formattedData, xAxisData };
  }, [data.trades]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box sx={{ flexGrow: 1, height: 400, display: 'flex', flexDirection: 'column', }} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
            Trades Per Week
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <XAxis 
                dataKey="week" 
                ticks={xAxisData} 
                interval={0} 
                label={{ value: 'Gameweek', position: 'insideBottomRight', offset: -5 }} 
              />
              <YAxis
                domain={[0, 10]}
                tickCount={11}
                label={{ value: 'Trades', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#1A2027', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}/>
              {lineChartData.length > 0 && Object.keys(lineChartData[0]).slice(1).map((teamName, index) => (
                <Line 
                  key={teamName} 
                  type="linear" 
                  dataKey={teamName} 
                  stroke={colors[index % colors.length]} 
                  dot={true} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>  

      <Modal open={open} onClose={handleClose} aria-labelledby="trades-graph-modal">        
        <Box sx={chartModalStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="week" 
                ticks={xAxisData} 
                interval={0} 
                label={{ value: 'Gameweek', position: 'insideBottomRight', offset: -5 }} 
              />
              <YAxis
                domain={[0, 10]}
                tickCount={11}
                label={{ value: 'Trades', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#1A2027', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}/>
              <Legend />
              {lineChartData.length > 0 && Object.keys(lineChartData[0]).slice(1).map((teamName, index) => (
                <Line 
                  key={teamName} 
                  type="linear" 
                  dataKey={teamName} 
                  stroke={colors[index % colors.length]} 
                  dot={true} 
                  strokeWidth={hoveredLine === teamName ? 5 : 3}
                  opacity={hoveredLine === null || hoveredLine === teamName ? 1 : 0.3}
                  onMouseEnter={() => setHoveredLine(teamName)}
                  onMouseLeave={() => setHoveredLine(null)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Modal>        
    </>
  );
}

export default WeeklyTradesGraph;