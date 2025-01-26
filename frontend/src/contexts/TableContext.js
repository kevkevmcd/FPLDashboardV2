import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
    const [leagueEntries, setLeagueEntries] = useState([]);
    const [leagueData, setLeagueData] = useState({});
    const [playerStats, setPlayerStats] = useState({});
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
    const fetchGeneralData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/general-data`);
        setLeagueData(response.data);
      } catch (error) {
        console.error('Error fetching general data:', error);
      }
    };
  
    fetchGeneralData();
  }, []);
  
  useEffect(() => {
    const fetchManagerTableData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/manager-table`);
        setLeagueEntries(response.data);
      } catch (error) {
        console.error('Error fetching manager table data:', error);
      }
    };
  
    fetchManagerTableData();
  }, []);   

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(`${backendUrl}/player-stats`);
        setPlayerStats(response.data);
      } catch (error) {
        console.error('Error fetching player stats data:', error);
      }
    };
  
    fetchPlayerStats();
  }, []);

  return (
    <TableContext.Provider value={{ leagueEntries, leagueData, playerStats }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;