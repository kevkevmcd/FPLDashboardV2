from pydantic import BaseModel
from typing import Optional

class LeagueGeneralData(BaseModel):
    league_name: Optional[str]
