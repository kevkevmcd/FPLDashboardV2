from pydantic import BaseModel
from typing import Optional

class Player(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    total_points: Optional[int] = None
    minutes: Optional[int] = None
    starts: Optional[int] = None
    goals_scored: Optional[int] = None
    assists: Optional[int] = None
    clean_sheets: Optional[int] = None
    own_goals: Optional[int] = None
    yellow_cards: Optional[int] = None
    red_cards: Optional[int] = None
    saves: Optional[int] = None
    points_per_game: Optional[float] = None
    bonus: Optional[int] = None
    penalties_order: Optional[int] = None
    expected_goals: Optional[float] = None
    expected_assists: Optional[float] = None
    expected_goals_conceded: Optional[float] = None
    expected_goals_per_90: Optional[float] = None
    expected_assists_per_90: Optional[float] = None
    expected_goal_involvements_per_90: Optional[float] = None
    saves_per_90: Optional[float] = None
    clean_sheets_per_90: Optional[float] = None
    penalties_saved: Optional[int] = None
    penalties_missed: Optional[int] = None
    form: Optional[float] = None
    bps: Optional[int] = None
    influence: Optional[float] = None
    creativity: Optional[float] = None
    threat: Optional[float] = None