import './App.css';
import DashboardLayoutBranding from './components/left-nav';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [leagueData, setLeagueData] = useState({});

  useEffect(() => {
  axios.get('/general-data')
      .then(res => {
        console.log('API response:', res.data);
        setLeagueData(res.data)
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <DashboardLayoutBranding league_name={leagueData?.league_name}/>
    </div>
  );
}

export default App;
