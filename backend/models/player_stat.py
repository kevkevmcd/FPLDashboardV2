from pydantic import BaseModel
from typing import Optional

class PlayerStat(BaseModel):
    name: Optional[str] = None
    value: Optional[int] = None