import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [leagueEntries, setLeagueEntries] = useState([]);

  useEffect(() => {
    axios.get('/league-table')
      .then(res => setLeagueEntries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Fantasy Premier League Table</h1>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Pick</th>
            <th>Points</th>
            <th>Points Scored</th>
            <th>Total Trades</th>
            <th>Point Differential</th>
          </tr>
        </thead>
        <tbody>
          {leagueEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.team_name}</td>
              <td>{entry.pick}</td>
              <td>{entry.points}</td>
              <td>{entry.total_points_scored}</td>
              <td>{entry.total_trades}</td>
              <td>{entry.point_difference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
