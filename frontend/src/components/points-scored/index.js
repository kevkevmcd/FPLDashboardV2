import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

 function PointsScoredGraph() {
    const [lineChartData, setLineChartData] = useState({
        series: [],
        xAxis: [{ data: [] }],
      });
    
      useEffect(() => {
        axios.get('/weekly-points-scored')
          .then((res) => {
            const data = res.data;
    
            const maxGameweeks = Math.max(...data.map(manager => manager.points_by_gameweek.length));
            const xAxisData = Array.from({ length: maxGameweeks }, (_, i) => i + 1);
    
            const seriesData = data.map(manager => ({
              data: manager.points_by_gameweek,
              label: manager.team_name,
              area: false,
              stack: 'total',
              highlightScope: {
                highlighted: 'series',
                faded: 'global'
              }
            }));
    
            setLineChartData({
              series: seriesData,
              xAxis: [{ data: xAxisData, type: 'linear' }],
            });
          })
          .catch(err => console.error(err));
      }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
          <LineChart
            series={lineChartData.series}
            xAxis={lineChartData.xAxis}
            height={400}
          />
        </Box>
    );
  }

  export default PointsScoredGraph;