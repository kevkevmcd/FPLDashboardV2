import httpx

LEAGUE_CODE = 192

async def get_fpl_details():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://draft.premierleague.com/api/league/{LEAGUE_CODE}/details")
        return response.json()
    
async def get_fpl_game():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://draft.premierleague.com/api/game")
    return response.json()

async def get_fpl_transactions():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://draft.premierleague.com/api/draft/league/{LEAGUE_CODE}/transactions")
    return response.json()

async def get_fpl_choices():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://draft.premierleague.com/api/draft/{LEAGUE_CODE}/choices")
    return response.json()

async def get_fpl_player_data():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://draft.premierleague.com/api/bootstrap-static")
    return response.json()