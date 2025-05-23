import httpx
import logging

#LEAGUE_CODE = 192

logger = logging.getLogger(__name__)

async def get_fpl_details(league_code: int):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://draft.premierleague.com/api/league/{league_code}/details")
            response.raise_for_status()

        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        logger.error(f"Http error, failed to get fpl details: {e}")
        return {}
    
async def get_fpl_game():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://draft.premierleague.com/api/game")
            response.raise_for_status()

        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        logger.error(f"Http error, failed to get fpl game: {e}")
        return {}

async def get_fpl_transactions(league_code: int):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://draft.premierleague.com/api/draft/league/{league_code}/transactions")
            response.raise_for_status()

        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        logger.error(f"Http error, failed to get fpl transactions: {e}")
        return {}

async def get_fpl_choices(league_code: int):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://draft.premierleague.com/api/draft/{league_code}/choices")
            response.raise_for_status()

        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        logger.error(f"Http error, failed to get fpl choices: {e}")
        return {}

async def get_fpl_player_data():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://draft.premierleague.com/api/bootstrap-static")
            response.raise_for_status()

        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        logger.error(f"Http error, failed to get fpl player data: {e}")
        return {}
    
async def get_element_status_data(league_code: int):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://draft.premierleague.com/api/league/{league_code}/element-status")
            response.raise_for_status()

        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        logger.error(f"Http error, failed to get element status data: {e}")
        return {}
    
async def get_fantasy_static_elements():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://fantasy.premierleague.com/api/bootstrap-static/")
            response.raise_for_status()

        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        logger.error(f"Http error, failed to get fantasy static elements: {e}")
        return {}