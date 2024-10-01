from typing import List
from fastapi import FastAPI
from services.league_data import combined_table
from models.manager import Manager

app = FastAPI()


@app.get("/league-table", response_model=List[Manager])
async def get_league_entries():
    managerList = await combined_table()
    return managerList