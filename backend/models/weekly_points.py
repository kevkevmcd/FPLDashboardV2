from pydantic import BaseModel
from typing import Optional

class WeeklyPoints(BaseModel):
    team_name: Optional[str] = None
    points: Optional[int] = None