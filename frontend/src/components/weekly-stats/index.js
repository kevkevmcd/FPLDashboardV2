import React, { useContext, useState } from 'react';
import { ChartsContext } from '../../contexts';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
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

function WeeklyStatsChart() {
  const data = useContext(ChartsContext);
  const [open, setOpen] = useState(false);

  const formattedData = data.weeklyStats.map((item, index) => ({
        week: index + 1,
        high_points: item.week_high_points.points,
        high_team: item.week_high_points.team_name,
        low_points: item.week_low_points.points,
        low_team: item.week_low_points.team_name,
        average_points: parseFloat(item.week_average_points),
  }));

  const renderTooltip = ({ payload }) => {
      if (!payload || payload.length === 0) return null;

      const { high_points, high_team, low_points, low_team, average_points } = payload[0].payload;

      return (
          <div className="custom-tooltip" style={{ backgroundColor: '#1A2027', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#82ca9d'}}><strong>High:</strong> {high_points} - ({high_team})</p>
              <p style={{ color: '#8884d8'}}><strong>Low:</strong> {low_points} - ({low_team})</p>
              <p style={{ color: '#ff7300'}}><strong>Average:</strong> {average_points}</p>
          </div>
      );
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box sx={{ flexGrow: 1, height: 400, display: 'flex', flexDirection: 'column', }} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
            Points Spread Per Week
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis dataKey="week" label={{ value: 'Gameweek', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Points Scored', angle: -90, position: 'insideLeft' }}/>
              <Tooltip content={renderTooltip} />
              <Legend />
              <Bar
                dataKey="high_points"
                fill="#82ca9d"
                name="High Points"
                barSize={30}
              />
              <Bar
                dataKey="low_points"
                fill="#8884d8"
                name="Low Points"
                barSize={30}
              />
              <Line
                type="monotone"
                dataKey="average_points"
                stroke="#ff7300"
                strokeWidth={2}
                name="Average Points"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="average-points-graph-modal">
        <Box sx={chartModalStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis dataKey="week" label={{ value: 'Gameweek', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Points Scored', angle: -90, position: 'insideLeft' }}/>
              <Tooltip content={renderTooltip} />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend />
              <Bar
                dataKey="high_points"
                fill="#82ca9d"
                name="High Points"
                barSize={30}
              />
              <Bar
                dataKey="low_points"
                fill="#8884d8"
                name="Low Points"
                barSize={30}
              />
              <Line
                type="monotone"
                dataKey="average_points"
                stroke="#ff7300"
                strokeWidth={2}
                name="Average Points"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Modal>
    </>
  );
};

export default WeeklyStatsChart;