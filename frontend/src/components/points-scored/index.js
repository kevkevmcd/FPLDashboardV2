import React, { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import colors from '../../utils/chart-colors';
import { ChartsContext } from '../../contexts';

function PointsScoredGraph() {
  const data = useContext(ChartsContext)

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

  return (
    <Box sx={{ flexGrow: 1, height: 400 }}>
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
  );
}

export default PointsScoredGraph;