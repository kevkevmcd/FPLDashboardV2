import React, { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TableContext = createContext();

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const fetchGeneralData = async (leagueCode) =>
  (await axios.get(`${backendUrl}/general-data?league_code=${leagueCode}`)).data;
const fetchManagerTableData = async (leagueCode) =>
  (await axios.get(`${backendUrl}/manager-table?league_code=${leagueCode}`)).data;
const fetchPlayerStats = async () =>
  (await axios.get(`${backendUrl}/player-stats`)).data;

export const TableProvider = ({ leagueCode, children }) => {
  const { data: leagueData = {} } = useQuery({
    queryKey: ['generalData', leagueCode],
    queryFn: () => fetchGeneralData(leagueCode),
  });
  const { data: leagueEntries = [] } = useQuery({
    queryKey: ['managerTable', leagueCode],
    queryFn: () => fetchManagerTableData(leagueCode),
  });
  const { data: playerStats = {} } = useQuery({
    queryKey: ['playerStats'],
    queryFn: fetchPlayerStats,
  });

  return (
    <TableContext.Provider value={{ leagueEntries, leagueData, playerStats, leagueCode }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;