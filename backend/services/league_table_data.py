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
            ManagerWeeklyTrades(id=entry_id, team_name=team_name, trades=[0] * (gameweek - 1))
            for entry_id, team_name in teams.items()
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

        trades_list.sort(key=lambda x: x.team_name)
        return trades_list
    
    except Exception as e:
        logger.error(f"Unable to get weekly trades list: {e}")
        return []

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

        trades = await get_weekly_trades()
        if not trades:
            logger.error(f"Failed to get weekly trades data for league table.")
            return result 

        pick_order_dict = await get_pick_order()

        # Create a map for quick access to trades by team name
        trades_map = {trade.team_name: trade for trade in trades}

        for team in standings:
            team_name = entry_names.get(team["league_entry"])
            if not team_name:
                continue

            trade_data = trades_map.get(team_name)
            total_trades = sum(trade_data.trades) if trade_data else 0

            team_stats = Manager(
                id=team["league_entry"],
                team_name=team_name,
                total_points_scored=team["points_for"],
                points=team["matches_drawn"] + (team["matches_won"] * 3),
                total_trades=total_trades,
                point_difference=team["points_for"] - team["points_against"],
                pick=pick_order_dict.get(team_name, 0),
                position=team["rank"],
                wins=team["matches_won"],
                draws=team["matches_drawn"],
                losses=team["matches_lost"],
            )
            result.append(team_stats)
            
        result.sort(key=lambda x: (x.points, x.total_points_scored), reverse=True)

        return result
    
    except Exception as e:
        logger.error(f"Unable to get the league table: {e}")
        return result