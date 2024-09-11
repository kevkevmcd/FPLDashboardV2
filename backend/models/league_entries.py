from pydantic import BaseModel

class LeagueEntries(BaseModel):
    team_name: str
    first_name: str
    last_name: str