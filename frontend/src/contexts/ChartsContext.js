import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ChartsContext = createContext();

export const ChartsProvider = ({ children }) => {
    const [pointsScoredData, setPointsScoredData] = useState([]);
    const [matchPointsData, setMatchPointsData] = useState([]);
    const [inFormManagers, setInFormManagers] = useState({});
    const [inFormPlayers, setInFormPlayers] = useState([]);
    const [trades, setTradesData] = useState([])
    const [weeklyStats, setWeeklyStats] = useState([])

    useEffect(() => {
    const fetchPointsScoredData = async () => {
      try {
        const response = await axios.get('/weekly-points-scored');
        setPointsScoredData(response.data);
      } catch (error) {
        console.error('Error fetching points scored data:', error);
      }
    };
  
    fetchPointsScoredData();
  }, []);
  
  useEffect(() => {
    const fetchMatchPointsData = async () => {
      try {
        const response = await axios.get('/weekly-match-points');
        setMatchPointsData(response.data.manager_match_points);
        setInFormManagers(response.data.in_form_managers);
      } catch (error) {
        console.error('Error fetching match points data:', error);
      }
    };
  
    fetchMatchPointsData();
  }, []);
  
  useEffect(() => {
    const fetchInFormPlayers = async () => {
      try {
        const response = await axios.get('/in-form-players');
        setInFormPlayers(response.data);
      } catch (error) {
        console.error('Error fetching in form players data:', error);
      }
    };
  
    fetchInFormPlayers();
  }, []);   

  useEffect(() => {
    const fetchWeeklyTrades = async () => {
      try {
        const response = await axios.get('/weekly-trades');
        setTradesData(response.data);
      } catch (error) {
        console.error('Error fetching weekly trades data:', error);
      }
    };
  
    fetchWeeklyTrades();
  }, []);   
  
  useEffect(() => {
    const fetchWeeklyStats = async () => {
      try {
        const response = await axios.get('/weekly-stats');
        setWeeklyStats(response.data);
      } catch (error) {
        console.error('Error fetching weekly stats data:', error);
      }
    };
  
    fetchWeeklyStats();
  }, []);  
  
  return (
    <ChartsContext.Provider value={{ pointsScoredData, matchPointsData, inFormManagers, inFormPlayers, weeklyStats, trades }}>
      {children}
    </ChartsContext.Provider>
  );
};

export default ChartsContext;