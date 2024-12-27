from fastapi import APIRouter
from typing import List
from services import get_top_players, get_player_statistics
from models import TopPlayer, PlayerStats

router = APIRouter()

@router.get("/in-form-players", response_model=List[TopPlayer])
async def get_in_form_players():
    top_players = await get_top_players()

    return top_players

@router.get("/player-stats", response_model=PlayerStats)
async def get_player_stats():
    player_stats = await get_player_statistics()

    return player_stats