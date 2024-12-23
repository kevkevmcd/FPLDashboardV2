from typing import List, Dict
from pydantic import BaseModel
from models.manager_match_points import ManagerMatchPoints

class MatchPoints(BaseModel):
    manager_match_points: List[ManagerMatchPoints]
    in_form_managers: Dict[str, int]