from clients.fpl_data_fetchers import get_league_info

async def get_league_name():
     league_info = await get_league_info()
     league_name = league_info["name"]

     return league_name