from typing import List
from models import Player, ManagerSquad
from clients.fpl_data_fetchers import get_element_statuses, get_fantasy_player_data, get_league_entries
import logging

logger = logging.getLogger(__name__)

async def get_squad_data(manager_id: int) -> ManagerSquad:
    try:
        managers = await get_league_entries()
        if not managers:
            logger.error("Could not get league entries.")
            return ManagerSquad()
        
        player_ids = await get_player_id_list(manager_id)
        if not player_ids:
            logger.error(f"Could not find players with manager id: {manager_id}")
            return ManagerSquad()

        manager_name = None
        team_name = None
        for manager in managers:
            if manager["entry_id"] == manager_id:
                manager_name = f"{manager['player_first_name']} {manager['player_last_name']}"
                team_name = manager["entry_name"]

        squad = []
        for player_id in player_ids:
            player_info = await get_player_data(player_id)
            squad.append(player_info)
        
        squad.sort(key=lambda x: (x.total_points, x.minutes), reverse=True)

        manager_squad = ManagerSquad(
            manager_name = manager_name,
            team_name = team_name,
            squad = squad
        )

        return manager_squad
    
    except Exception as e:
        logger.error(f"Could not get manager squad data based on manager id: {manager_id}")
        return ManagerSquad()

async def get_player_id_list(manager_id: int) -> List[int]:
    try:
        player_ids = []

        player_status_data = await get_element_statuses()
        if not player_status_data:
            logger.error("Failed to get player status data for manager squad")
            return player_ids

        for player in player_status_data:
            if player["owner"] == manager_id:
                player_id = player["element"]
                player_ids.append(player_id)
        
        return player_ids
    
    except Exception as e:
        logger.error(f"Unable to get list of player ids for manager sqaud: {e}")
        return player_ids
    
async def get_player_data(player_id: int) -> Player:
    try:
        player_data = await get_fantasy_player_data()
        if not player_data:
            logger.error("Failed to get fantasy player data for get player data")
            return Player()

        for player in player_data:
            if player["id"] == player_id:
                player_position = None
                match player["element_type"]:
                    case 1: 
                        player_position = "GKP"
                    case 2:
                        player_position = "DEF"
                    case 3:
                        player_position = "MID"
                    case 4:
                        player_position = "FWD"

                filtered_player = Player(
                    name = player["web_name"],
                    position = player_position,
                    total_points = player["total_points"],
                    minutes = player["minutes"],
                    starts = player["starts"],
                    goals_scored = player["goals_scored"],
                    assists = player["assists"],
                    clean_sheets = player["clean_sheets"],
                    own_goals = player["own_goals"],
                    yellow_cards = player["yellow_cards"],
                    red_cards = player["red_cards"],
                    saves = player["saves"],
                    points_per_game = float(player["points_per_game"]),
                    bonus = player["bonus"],
                    penalties_order = player["penalties_order"],
                    expected_goals = float(player["expected_goals"]),
                    expected_assists = float(player["expected_assists"]),
                    expected_goals_conceded = float(player["expected_goals_conceded"]),
                    expected_goals_per_90 = float(player["expected_goals_per_90"]),
                    expected_assists_per_90 = float(player["expected_assists_per_90"]),
                    expected_goal_involvements_per_90 = float(player["expected_goal_involvements_per_90"]),
                    saves_per_90 = float(player["saves_per_90"]),
                    clean_sheets_per_90 = float(player["clean_sheets_per_90"]),
                    penalties_saved = player["penalties_saved"],
                    penalties_missed = player["penalties_missed"],
                    form = float(player["form"]),
                    bps = player["bps"],
                    influence = float(player["influence"]),
                    creativity = float(player["creativity"]),
                    threat = float(player["threat"])
                )

        return filtered_player

    except Exception as e:
        logger.error(f"Unable to get the player data for player_id: {player_id}. {e}")
        return Player()

