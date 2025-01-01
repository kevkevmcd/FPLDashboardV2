from fastapi import APIRouter, HTTPException
from typing import List
from services import get_top_players, get_player_statistics
from models import TopPlayer, PlayerStats
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/in-form-players", response_model=List[TopPlayer])
async def get_in_form_players():
    try:

        top_players = await get_top_players()
        return top_players
    
    except Exception as e:
        logger.error(f"Error retrieving in form players: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving in form players")

@router.get("/player-stats", response_model=PlayerStats)
async def get_player_stats():
    try:

        player_stats = await get_player_statistics()

        return player_stats
    
    except Exception as e:
        logger.error(f"Error retrieving player stats: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving player stats")