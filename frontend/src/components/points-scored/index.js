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

function PointsScoredGraph() {
  const data = useContext(ChartsContext);
  const [open, setOpen] = useState(false);

  const { lineChartData, xAxisData } = useMemo(() => {
    if (!data.pointsScoredData || data.pointsScoredData.length === 0) {
      return { lineChartData: [], xAxisData: [] };
    }

    const maxGameweeks = Math.max(
      ...data.pointsScoredData.map((manager) => manager.points_by_gameweek.length)
    );
    const xAxisData = Array.from({ length: maxGameweeks }, (_, i) => i + 1);

    const formattedData = xAxisData.map((week, index) => {
      const weekData = { week };
      data.pointsScoredData.forEach((manager) => {
        weekData[manager.team_name] = manager.points_by_gameweek[index] || 0;
      });
      return weekData;
    });

    return { lineChartData: formattedData, xAxisData };
  }, [data.pointsScoredData]);

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
              domain={[0, 80]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
              tickCount={9}
              label={{ value: 'Points Scored', angle: -90, position: 'insideLeft' }}
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

      <Modal open={open} onClose={handleClose} aria-labelledby="points-graph-modal">        
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
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                tickCount={11}
                label={{ value: 'Points Scored', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
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

export default PointsScoredGraph;