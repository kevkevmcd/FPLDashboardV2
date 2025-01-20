from clients.fpl_data_fetchers import get_league_info, get_upcoming_gameweek
import logging

logger = logging.getLogger(__name__)

async def get_league_name():
     league_info = await get_league_info()
     if not league_info:
          logger.error("Failed to get league info")
          return ""
     
     league_name = league_info["name"]

     return league_name

async def get_gameweek():
     gameweek = await get_upcoming_gameweek()
     if not gameweek:
          logger.error("Failed to get gameweek for general data")
          return None
     
     return gameweek