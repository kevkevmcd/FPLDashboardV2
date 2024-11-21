from pydantic import BaseModel

class TopPlayer(BaseModel):
    id: int
    name: str
    form: float
    points_per_game: float
    total_points: int