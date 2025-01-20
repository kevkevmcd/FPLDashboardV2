from pydantic import BaseModel
from typing import Optional
from models.weekly_points import WeeklyPoints

class WeeklyStats(BaseModel):
    week_high_points: Optional[WeeklyPoints] = None
    week_low_points: Optional[WeeklyPoints] = None
    week_average_points: Optional[float] = None
