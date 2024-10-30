from typing import Dict, List
from services.util import get_choices, get_entry_names, get_league_entries, get_standings, get_transactions, get_upcoming_gameweek
from models.manager import Manager
from models.managerweeklytrades import ManagerWeeklyTrades

async def weekly_trades() -> List[ManagerWeeklyTrades]:
    transactions = await get_transactions()
    league_entries = await get_league_entries()
    teams = {entry["entry_id"]: entry["entry_name"] for entry in league_entries}
    gameweek = await get_upcoming_gameweek()

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

async def point_differential() -> Dict[str, int]:
    entry_names = await get_entry_names()
    standings = await get_standings()

    team_diffs = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        diff = team["points_for"] - team["points_against"]
        team_diffs[team_name] = diff

    return dict(sorted(team_diffs.items(), key=lambda item: item[1], reverse=True))

async def total_points_for() -> Dict[str, int]:
    entry_names = await get_entry_names()
    standings = await get_standings()

    team_points = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        points = team["points_for"]
        team_points[team_name] = points

    return dict(sorted(team_points.items(), key=lambda item: item[1], reverse=True))

async def total_match_points() -> Dict[str, int]:
    entry_names = await get_entry_names()
    standings = await get_standings()

    team_match_points = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        total_match_points = team["matches_drawn"] + (team["matches_won"] * 3)
        team_match_points[team_name] = total_match_points

    return dict(sorted(team_match_points.items(), key=lambda item: item[1], reverse=True))

async def pick_order() -> Dict[str, int]:
    choices = await get_choices()

    pick_order_dict = {}
    for choice in choices:
        if choice["round"] == 1:
            pick_order_dict[choice["entry_name"]] = choice["pick"]

    return pick_order_dict

async def combined_table() -> List[Manager]:
    total_points_data = await total_points_for()
    match_points_data = await total_match_points()
    trades = await weekly_trades()
    point_diffs = await point_differential()
    pick_order_dict = await pick_order()

    result = []
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
        )
        result.append(team_stats)

    # Sort by points first, then by total_trades if points are the same
    result.sort(key=lambda x: (x.points, x.total_points_scored), reverse=True)

    return result