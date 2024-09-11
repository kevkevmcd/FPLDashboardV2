import httpx

async def get_league_details():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://draft.premierleague.com/api/league/192/details")
        return response.json()