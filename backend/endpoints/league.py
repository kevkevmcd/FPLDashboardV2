import logging
from fastapi import APIRouter, HTTPException
from typing import List
from services import get_manager_data, get_weekly_trades, get_league_name, weekly_total_points, get_match_points_data, get_squad_data
from models import Manager, LeagueGeneralData, ManagerWeeklyPoints, MatchPoints, ManagerWeeklyTrades, ManagerSquad

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/manager-table", response_model=List[Manager])
async def get_manager_table():
    try:

        manager_list = await get_manager_data()
        return manager_list
    
    except Exception as e:
        logger.error(f"Error retrieving manager table: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving manager table")

@router.get("/general-data", response_model=LeagueGeneralData)
async def get_league_data():
    try:

        league_name = await get_league_name()
        league_general_data = LeagueGeneralData(league_name=league_name)

        return league_general_data
    
    except Exception as e:
        logger.error(f"Error retrieving league data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving league data")
    
@router.get("/weekly-points-scored", response_model=List[ManagerWeeklyPoints])
async def get_points_scored():
    try:

        weekly_points_list = await weekly_total_points()
        return weekly_points_list
    
    except Exception as e:
        logger.error(f"Error retrieving weekly points scored: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving weekly points scored data")
    
@router.get("/weekly-match-points", response_model=MatchPoints)
async def get_match_points():
    try:
            
        weekly_match_points_list = await get_match_points_data()
        return weekly_match_points_list
    
    except Exception as e:
        logger.error(f"Error retrieving weekly match points: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving weekly match points data")

@router.get("/weekly-trades", response_model=List[ManagerWeeklyTrades])
async def get_match_points():
    try:

        weekly_trades_list = await get_weekly_trades()
        return weekly_trades_list
    
    except Exception as e:
        logger.error(f"Error retrieving weekly trades: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving weekly trades data")
    
@router.post("/manager/{manager_id}/squad", response_model=ManagerSquad)
async def get_manager_squad_data(manager_id: int):
    try:

        manager_squad = await get_squad_data(manager_id)
        return manager_squad
    
    except Exception as e:
        logger.error(f"Error retrieving manager squad data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving manager squad data")