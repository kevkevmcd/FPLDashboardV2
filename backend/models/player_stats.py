from pydantic import BaseModel
from models.player_stat import PlayerStat
from typing import Optional

class PlayerStats(BaseModel):
    most_goals: Optional[PlayerStat] = None
    most_cards: Optional[PlayerStat] = None
    most_saves: Optional[PlayerStat] = None
    most_own_goals: Optional[PlayerStat] = None
    most_clean_sheets: Optional[PlayerStat] = None
    most_bonus_points: Optional[PlayerStat] = None
    most_assists: Optional[PlayerStat] = None
    most_penalty_saves: Optional[PlayerStat] = None