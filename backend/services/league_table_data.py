import logging
from typing import Dict, List
from clients.fpl_data_fetchers import get_choices, get_entry_names, get_league_entries, get_standings, get_transactions, get_upcoming_gameweek
from models import Manager, ManagerWeeklyTrades

logger = logging.getLogger(__name__)

async def get_weekly_trades() -> List[ManagerWeeklyTrades]:
    try:
        gameweek = await get_upcoming_gameweek()
        transactions = await get_transactions()
        league_entries = await get_league_entries()

        if not gameweek or not transactions or not league_entries:
            logger.error(f"Failed to get data for weekly trades list. Gameweek:{gameweek}, Transactions: {transactions}, League Entries: {league_entries}")
            return []

        teams = {entry["entry_id"]: entry["entry_name"] for entry in league_entries}

        # Initialize the list of ManagerWeeklyTrades
        trades_list = [
            ManagerWeeklyTrades(team_name=team_name, trades=[0] * (gameweek - 1))
            for team_name in teams.values()
        ]

        # Create a map for quick access to ManagerWeeklyTrades objects by team name
        trades_map = {trade.team_name: trade for trade in trades_list}

        for transaction in transactions:
            event = transaction["event"]
            team_id = transaction["entry"]

            if event > (gameweek - 1):
                continue
            team_name = teams.get(team_id)

            if transaction["result"] == "a":
                team_trades = trades_map.get(team_name) 
                team_trades.trades[event - 1] += 1

        return trades_list
    
    except Exception as e:
        logger.error(f"Unable to get weekly trades list: {e}")
        return []

def get_point_differential(entry_names: Dict[int, str], standings: List[Dict[str, int]]) -> Dict[str, int]:
    team_diffs = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        diff = team["points_for"] - team["points_against"]
        team_diffs[team_name] = diff

    return dict(sorted(team_diffs.items(), key=lambda item: item[1], reverse=True))

def get_total_points_for(entry_names: Dict[int, str], standings: List[Dict[str, int]]) -> Dict[str, int]:
    team_points = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        points = team["points_for"]
        team_points[team_name] = points

    return dict(sorted(team_points.items(), key=lambda item: item[1], reverse=True))

def get_total_match_points(entry_names: Dict[int, str], standings: List[Dict[str, int]]) -> Dict[str, int]:
    team_match_points = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        total_match_points = team["matches_drawn"] + (team["matches_won"] * 3)
        team_match_points[team_name] = total_match_points

    return dict(sorted(team_match_points.items(), key=lambda item: item[1], reverse=True))

def get_manager_position(entry_names: Dict[int, str], standings: List[Dict[str, int]]) -> Dict[str, int]:
    positions = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        manager_rank = team["rank"]
        positions[team_name] = manager_rank

    return dict(sorted(positions.items(), key=lambda item: item[1], reverse=True))

async def get_pick_order() -> Dict[str, int]:
    try:
        pick_order_dict = {}

        choices = await get_choices()
        if not choices:
            logger.error("Failed to get choices data.")
            return pick_order_dict  

        for choice in choices:
            if choice["round"] == 1:
                pick_order_dict[choice["entry_name"]] = choice["pick"]

        return pick_order_dict
    
    except Exception as e:
        logger.error(f"Unable to get the pick order: {e}")
        return pick_order_dict

async def get_manager_data() -> List[Manager]:
    try:
        entry_names = await get_entry_names()
        standings = await get_standings()
        result = []

        if not entry_names or not standings:
            logger.error(f"Failed to get data necessary for league table. Entry Names:{entry_names}, Standings: {standings}")
            return result            

        total_points_data = get_total_points_for(entry_names, standings)
        match_points_data = get_total_match_points(entry_names, standings)
        point_diffs = get_point_differential(entry_names, standings)
        manager_ranks = get_manager_position(entry_names, standings)

        trades = await get_weekly_trades()
        pick_order_dict = await get_pick_order()

        for trade in trades:
            team_name = trade.team_name
            total_trades = sum(trade.trades)
            
            team_stats = Manager(
                team_name = team_name,
                total_points_scored = total_points_data.get(team_name, 0),
                points = match_points_data.get(team_name, 0),
                total_trades = total_trades,
                point_difference = point_diffs.get(team_name, 0),
                pick = pick_order_dict.get(team_name, 0),
                position = manager_ranks.get(team_name, 0)
            )
            result.append(team_stats)
            
        result.sort(key=lambda x: (x.points, x.total_points_scored), reverse=True)

        return result
    
    except Exception as e:
        logger.error(f"Unable to get the league table: {e}")
        return result