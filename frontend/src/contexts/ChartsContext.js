import React, { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ChartsContext = createContext();

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const fetchPointsScoredData = async (leagueCode) =>
  (await axios.get(`${backendUrl}/weekly-points-scored?league_code=${leagueCode}`)).data;

const fetchMatchPointsData = async (leagueCode) =>
  (await axios.get(`${backendUrl}/weekly-match-points?league_code=${leagueCode}`)).data;

const fetchInFormPlayers = async () =>
  (await axios.get(`${backendUrl}/in-form-players`)).data;

const fetchWeeklyTrades = async (leagueCode) =>
  (await axios.get(`${backendUrl}/weekly-trades?league_code=${leagueCode}`)).data;

const fetchWeeklyStats = async (leagueCode) =>
  (await axios.get(`${backendUrl}/weekly-stats?league_code=${leagueCode}`)).data;

export const ChartsProvider = ({ leagueCode, children }) => {
  const { data: pointsScoredData = [] } = useQuery({
    queryKey: ['pointsScoredData', leagueCode],
    queryFn: () => fetchPointsScoredData(leagueCode),
  });
  const { data: matchPointsRaw = {} } = useQuery({
    queryKey: ['matchPointsData', leagueCode],
    queryFn: () => fetchMatchPointsData(leagueCode),
  });
  const { data: inFormPlayers = [] } = useQuery({
    queryKey: ['inFormPlayers'],
    queryFn: fetchInFormPlayers,
  });
  const { data: trades = [] } = useQuery({
    queryKey: ['weeklyTrades', leagueCode],
    queryFn: () => fetchWeeklyTrades(leagueCode),
  });
  const { data: weeklyStats = [] } = useQuery({
    queryKey: ['weeklyStats', leagueCode],
    queryFn: () => fetchWeeklyStats(leagueCode),
  });

  // Extract matchPointsData and inFormManagers from matchPointsRaw
  const matchPointsData = matchPointsRaw.manager_match_points || [];
  const inFormManagers = matchPointsRaw.in_form_managers || {};

  return (
    <ChartsContext.Provider value={{ pointsScoredData, matchPointsData, inFormManagers, inFormPlayers, weeklyStats, trades }}>
      {children}
    </ChartsContext.Provider>
  );
};

export default ChartsContext;