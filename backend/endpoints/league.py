from fastapi import APIRouter
from typing import List
from services import combined_table, weekly_trades, get_league_name, weekly_total_points, get_match_points_data
from models import Manager, LeagueGeneralData, ManagerWeeklyPoints, MatchPoints, ManagerWeeklyTrades

router = APIRouter()

@router.get("/manager-table", response_model=List[Manager])
async def get_manager_table():
    manager_list = await combined_table()
    return manager_list

@router.get("/general-data", response_model=LeagueGeneralData)
async def get_league_data():
    league_name = await get_league_name()
    league_general_data = LeagueGeneralData(league_name=league_name)

    return league_general_data

@router.get("/weekly-points-scored", response_model=List[ManagerWeeklyPoints])
async def get_points_scored():
    weekly_points_list = await weekly_total_points()

    return weekly_points_list

@router.get("/weekly-match-points", response_model=MatchPoints)
async def get_match_points():
    weekly_match_points_list = await get_match_points_data()

    return weekly_match_points_list

@router.get("/weekly-trades", response_model=List[ManagerWeeklyTrades])
async def get_match_points():
    weekly_trades_list = await weekly_trades()

    return weekly_trades_list