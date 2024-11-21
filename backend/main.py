from typing import List
from fastapi import FastAPI
from services.league_table_data import combined_table, weekly_trades
from services.general_data import get_league_name
from services.weekly_data import weekly_total_points, get_match_points_data
from services.player_data import get_top_players
from models.manager import Manager
from models.leaguegeneraldata import LeagueGeneralData
from models.managerweeklypoints import ManagerWeeklyPoints
from models.matchpoints import MatchPoints
from models.managerweeklytrades import ManagerWeeklyTrades
from models.topplayer import TopPlayer

app = FastAPI()


@app.get("/manager-table", response_model=List[Manager])
async def get_manager_table():
    manager_list = await combined_table()
    return manager_list

@app.get("/general-data", response_model=LeagueGeneralData)
async def get_league_data():
    league_name = await get_league_name()
    league_general_data = LeagueGeneralData(league_name=league_name)

    return league_general_data

@app.get("/weekly-points-scored", response_model=List[ManagerWeeklyPoints])
async def get_points_scored():
    weekly_points_list = await weekly_total_points()

    return weekly_points_list

@app.get("/weekly-match-points", response_model=MatchPoints)
async def get_match_points():
    weekly_match_points_list = await get_match_points_data()

    return weekly_match_points_list

@app.get("/weekly-trades", response_model=List[ManagerWeeklyTrades])
async def get_match_points():
    weekly_trades_list = await weekly_trades()

    return weekly_trades_list

@app.get("/in-form-players", response_model=List[TopPlayer])
async def get_in_form_players():
    top_players = await get_top_players()

    return top_players