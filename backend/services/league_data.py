from typing import List
from fpl_api_clients import get_league_details
from models.league_entries import LeagueEntries

async def fetch_league_details() -> List[LeagueEntries]:
    raw_data = await get_league_details()
    league_entries_raw = raw_data["league_entries"]
    
    league_entries = [
        LeagueEntries(
            team_name=entry["entry_name"],
            first_name=entry["player_first_name"],
            last_name=entry["player_last_name"]
        )
        for entry in league_entries_raw
    ]
    
    return league_entries