import './App.css';
import DashboardLayoutBranding from './components/left-nav';
import { ChartsProvider, TableProvider } from './contexts';
import React, { useState } from 'react';

const LEAGUES = [
  { code: 157, name: "Game of Stones - League A" },
  { code: 461, name: "Game of Stones - League B" },
];

function App() {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);

  return (
    <div className="App">
      <TableProvider leagueCode={selectedLeague.code}>
        <ChartsProvider leagueCode={selectedLeague.code}>
          <DashboardLayoutBranding 
            leagues={LEAGUES}
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
          />
        </ChartsProvider>
      </TableProvider>
    </div>
  );
}

export default App;
