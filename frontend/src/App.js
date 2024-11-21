import './App.css';
import DashboardLayoutBranding from './components/left-nav';
import { ChartsProvider, TableProvider } from './contexts';

function App() {

  return (
    <div className="App">
      <TableProvider>
        <ChartsProvider>
          <DashboardLayoutBranding />
        </ChartsProvider>
      </TableProvider>
    </div>
  );
}

export default App;
