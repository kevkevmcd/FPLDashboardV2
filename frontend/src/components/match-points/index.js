import React, { useContext, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import colors from '../../utils/chart-colors';
import { ChartsContext } from '../../contexts';
import Modal from '@mui/material/Modal';

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

function MatchPointsGraph() {
  const data = useContext(ChartsContext)
  const [open, setOpen] = useState(false)

  const { lineChartData, xAxisData } = useMemo(() => {
    if (!data.matchPointsData || data.matchPointsData.length === 0) {
      return { lineChartData: [], xAxisData: [] };
    }

    const maxGameweeks = Math.max(
      ...data.matchPointsData.map((manager) => manager.gameweek_points.length)
    );
    const xAxisData = Array.from({ length: maxGameweeks }, (_, i) => i + 1);

    const formattedData = xAxisData.map((week, index) => {
      const weekData = { week };
      data.matchPointsData.forEach((manager) => {
        weekData[manager.team_name] = manager.gameweek_points[index] || 0;
      });
      return weekData;
    });

    return { lineChartData: formattedData, xAxisData };
  }, [data.matchPointsData]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box sx={{ flexGrow: 1, height: 400 }} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineChartData}>
            <XAxis 
              dataKey="week" 
              ticks={xAxisData} 
              interval={0} 
              label={{ value: 'Gameweek', position: 'insideBottomRight', offset: -5 }} 
            />
            <YAxis 
              domain={[0, 50]} 
              tickCount={15} 
              interval={1} 
              label={{ value: 'Match Points', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
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

      <Modal open={open} onClose={handleClose} aria-labelledby="match-graph-modal">        
        <Box sx={chartModalStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <XAxis 
                dataKey="week" 
                ticks={xAxisData} 
                interval={0} 
                label={{ value: 'Gameweek', position: 'insideBottomRight', offset: -5 }} 
              />
              <YAxis 
                domain={[0, 100]} 
                tickCount={50} 
                interval={1} 
                label={{ value: 'Match Points', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend/>
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
      </Modal>     
    </>
  );
}

export default MatchPointsGraph;