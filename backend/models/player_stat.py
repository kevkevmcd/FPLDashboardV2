from pydantic import BaseModel

class PlayerStat(BaseModel):
    name: str
    value: int