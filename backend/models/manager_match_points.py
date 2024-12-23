from typing import List
from pydantic import BaseModel

class ManagerMatchPoints(BaseModel):
    team_name: str
    gameweek_points: List[int]