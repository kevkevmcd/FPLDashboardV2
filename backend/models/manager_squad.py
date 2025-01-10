from pydantic import BaseModel
from models.player import Player
from typing import List, Optional

class ManagerSquad(BaseModel):
    team_name: Optional[str] = None
    manager_name: Optional[str] = None
    squad: Optional[List[Player]] = []