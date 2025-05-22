from pydantic import BaseModel

class Manager(BaseModel):
    id: int
    team_name: str
    points: int
    total_points_scored: int
    total_trades: int
    point_difference: int
    pick: int
    position: int
    wins: int
    draws: int
    losses: int