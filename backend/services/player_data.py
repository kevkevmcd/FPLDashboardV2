import logging
from clients.fpl_data_fetchers import get_player_data, get_upcoming_gameweek
from models import TopPlayer, PlayerStats, PlayerStat
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

async def get_top_players() -> List[TopPlayer]:
    try:
        gameweek = await get_upcoming_gameweek()
        if gameweek == 1:
            logger.info("Gameweek one, no top players yet.")
            return []

        player_data = await get_player_data()
        if not player_data:
            logger.error("Failed to get player data")
            return []
        
        # Filter players based on form and minutes
        filtered_players = [
            {
                "id": player["id"],
                "name": player["web_name"],
                "form": float(player["form"]),
                "points_per_game": float(player["points_per_game"]),
                "total_points": player["total_points"]
            }
            for player in player_data
            if float(player["form"]) > 6 and player["minutes"] > 0
        ]

        # Sort by form descending, then by points_per_game descending
        sorted_players = sorted(
            filtered_players,
            key = lambda player: (player["form"], player["points_per_game"]),
            reverse = True
        )

        # Get the top 10 players after sorting
        top_10_players = sorted_players[:10]

        # Convert each player dictionary to a TopPlayer model instance
        top_10_in_form = [TopPlayer(**player) for player in top_10_players]

        return top_10_in_form

    except Exception as e:
        logger.error(f"Unable to get the Top Players: {e}")
        return []

async def get_player_statistics() -> PlayerStats:
    try:
        gameweek = await get_upcoming_gameweek()
        if gameweek == 1:
            logger.info("Gameweek one, no players stats yet.")
            return PlayerStats()

        data = await get_player_data()
        if not data:
            logger.error("Failed to get player data")
            return PlayerStats()

        return PlayerStats(
            most_goals = get_most_goals(data),
            most_cards = get_most_cards(data),
            most_saves = get_most_saves(data),
            most_own_goals = get_most_own_goals(data),
            most_clean_sheets = get_most_clean_sheets(data),
            most_bonus_points = get_most_bonus_points(data)
        )
    
    except Exception as e:
        logger.error(f"Unable to get the Top Players: {e}")
        return PlayerStats()


def get_most_goals(data: List[Dict[str, Any]]) -> PlayerStat:
    player = max(data, key=lambda x: x["goals_scored"])
    return PlayerStat(name = player["web_name"], value = player["goals_scored"], code = player["code"])

def get_most_cards(data: List[Dict[str, Any]]) -> PlayerStat:
    player = max(data, key=lambda x: x["yellow_cards"] + x["red_cards"])
    return PlayerStat(name = player["web_name"], value = player["yellow_cards"] + player["red_cards"], code = player["code"])

def get_most_saves(data: List[Dict[str, Any]]) -> PlayerStat:
    goalkeepers = [player for player in data if player["element_type"] == 1]
    player = max(goalkeepers, key=lambda x: x["saves"])
    return PlayerStat(name = player["web_name"], value = player["saves"], code = player["code"])

def get_most_own_goals(data: List[Dict[str, Any]]) -> PlayerStat:
    player = max(data, key=lambda x: x["own_goals"])
    return PlayerStat(name = player["web_name"], value = player["own_goals"], code = player["code"])

def get_most_clean_sheets(data: List[Dict[str, Any]]) -> PlayerStat:
    eligible_players = [player for player in data if player["element_type"] in {1, 2}]
    player = max(eligible_players, key=lambda x: (x["clean_sheets"], x["minutes"]))
    return PlayerStat(name = player["web_name"], value = player["clean_sheets"], code = player["code"])

def get_most_bonus_points(data: List[Dict[str, Any]]) -> PlayerStat:
    player = max(data, key=lambda x: x["bonus"])
    return PlayerStat(name = player["web_name"], value = player["bonus"], code = player["code"])
