from pydantic import BaseModel
from typing import List

class ManagerWeeklyTrades(BaseModel):
    id: int
    team_name: str
    trades: List[int]