import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [leagueEntries, setLeagueEntries] = useState([]);

  useEffect(() => {
    axios.get('/league-entries')
      .then(res => setLeagueEntries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Fantasy Premier League Entries</h1>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {leagueEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.team_name}</td>
              <td>{entry.first_name}</td>
              <td>{entry.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
