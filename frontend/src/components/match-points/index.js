import React, { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import colors from '../../utils/chart-colors';
import { ChartsContext } from '../../contexts';

function MatchPointsGraph() {
  const data = useContext(ChartsContext)

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
            domain={[0, 42]} 
            tickCount={15} 
            interval={3} 
            label={{ value: 'Points', angle: -90, position: 'insideLeft' }}
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

export default MatchPointsGraph;