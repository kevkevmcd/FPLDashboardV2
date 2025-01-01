from typing import List, Dict, Optional
from pydantic import BaseModel
from models.manager_match_points import ManagerMatchPoints

class MatchPoints(BaseModel):
    manager_match_points: Optional[List[ManagerMatchPoints]] = []
    in_form_managers: Optional[Dict[str, int]] = {}