from typing import List
from fastapi import FastAPI
from services.league_data import fetch_league_details
from models.league_entries import LeagueEntries

app = FastAPI()


@app.get("/league-entries", response_model=List[LeagueEntries])
async def get_league_entries():
    league_entries = await fetch_league_details()
    return league_entries