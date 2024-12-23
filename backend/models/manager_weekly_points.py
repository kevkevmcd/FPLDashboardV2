from pydantic import BaseModel
from typing import List

class ManagerWeeklyPoints(BaseModel):
    team_name: str
    points_by_gameweek: List[int]