import logging
from fastapi import APIRouter, HTTPException, Query
from typing import List
from services import get_manager_data, get_weekly_trades, get_league_name, weekly_total_points, get_match_points_data, get_squad_data, get_gameweek, get_league_weekly_stats
from models import Manager, LeagueGeneralData, ManagerWeeklyPoints, MatchPoints, ManagerWeeklyTrades, ManagerSquad, WeeklyStats

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/manager-table", response_model=List[Manager])
async def get_manager_table(league_code: int = Query(...)):
    try:

        manager_list = await get_manager_data(league_code)
        return manager_list
    
    except Exception as e:
        logger.error(f"Error retrieving manager table: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving manager table")

@router.get("/general-data", response_model=LeagueGeneralData)
async def get_league_data(league_code: int = Query(...)):
    try:

        league_name = await get_league_name(league_code)
        gameweek = await get_gameweek()
        league_general_data = LeagueGeneralData(league_name=league_name, gameweek=gameweek)

        return league_general_data
    
    except Exception as e:
        logger.error(f"Error retrieving league data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving league data")
    
@router.get("/weekly-points-scored", response_model=List[ManagerWeeklyPoints])
async def get_points_scored(league_code: int = Query(...)):
    try:

        weekly_points_list = await weekly_total_points(league_code)
        return weekly_points_list
    
    except Exception as e:
        logger.error(f"Error retrieving weekly points scored: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving weekly points scored data")
    
@router.get("/weekly-match-points", response_model=MatchPoints)
async def get_match_points(league_code: int = Query(...)):
    try:
            
        weekly_match_points_list = await get_match_points_data(league_code)
        return weekly_match_points_list
    
    except Exception as e:
        logger.error(f"Error retrieving weekly match points: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving weekly match points data")

@router.get("/weekly-trades", response_model=List[ManagerWeeklyTrades])
async def get_all_weekly_trades(league_code: int = Query(...)):
    try:

        weekly_trades_list = await get_weekly_trades(league_code)
        return weekly_trades_list
    
    except Exception as e:
        logger.error(f"Error retrieving weekly trades: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving weekly trades data")
    
@router.get("/weekly-stats", response_model=List[WeeklyStats])
async def get_weekly_stats(league_code: int = Query(...)):
    try:

        weekly_stats_list = await get_league_weekly_stats(league_code)
        return weekly_stats_list
    
    except Exception as e:
        logger.error(f"Error retrieving weekly stats: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving weekly stats data")
    
@router.get("/manager/{manager_id}/squad", response_model=ManagerSquad)
async def get_manager_squad_data(manager_id: int, league_code: int = Query(...)):
    try:

        manager_squad = await get_squad_data(manager_id, league_code)
        return manager_squad
    
    except Exception as e:
        logger.error(f"Error retrieving manager squad data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving manager squad data")