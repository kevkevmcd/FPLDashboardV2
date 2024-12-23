from pydantic import BaseModel
from typing import List

class ManagerWeeklyTrades(BaseModel):
    team_name: str
    trades: List[int]