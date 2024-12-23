from pydantic import BaseModel
from models.player_stat import PlayerStat

class PlayerStats(BaseModel):
    most_goals: PlayerStat
    most_cards: PlayerStat
    most_saves: PlayerStat
    most_own_goals: PlayerStat
    most_clean_sheets: PlayerStat
    most_bonus_points: PlayerStat