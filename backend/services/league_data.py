from typing import Dict, List
from services.util import get_choices, get_entry_names, get_league_entries, get_matches, get_standings, get_transactions, get_upcoming_gameweek
from models.manager import Manager

async def weekly_total_points() -> Dict[str, Dict[int, int]]:
    entry_names = await get_entry_names()
    gameweek = await get_upcoming_gameweek()
    matches = await get_matches()

    result = {name: {week: 0 for week in range(1, gameweek + 1)} for name in entry_names.values()}

    for match in matches:
        event = match["event"]
        if event > gameweek:
            break

        league_entry_1 = match["league_entry_1"]
        league_entry_1_points = match["league_entry_1_points"]
        league_entry_2 = match["league_entry_2"]
        league_entry_2_points = match["league_entry_2_points"]

        result[entry_names[league_entry_1]][event] = league_entry_1_points
        result[entry_names[league_entry_2]][event] = league_entry_2_points

    return result

async def weekly_win_loss_points() -> Dict[str, Dict[int, int]]:
    entry_names = await get_entry_names()
    matches = await get_matches()
    points = await weekly_total_points()
    
    result = {name: {week: 0 for week in points[name]} for name in points}

    for match in matches:
        event = match["event"]
        if not match["finished"]:
            continue
        league_entry_1 = entry_names[match["league_entry_1"]]
        league_entry_2 = entry_names[match["league_entry_2"]]

        league_entry_1_points = match["league_entry_1_points"]
        league_entry_2_points = match["league_entry_2_points"]

        if league_entry_1_points > league_entry_2_points:
            result[league_entry_1][event] = 3
            result[league_entry_2][event] = 0
        elif league_entry_1_points < league_entry_2_points:
            result[league_entry_1][event] = 0
            result[league_entry_2][event] = 3
        else:
            result[league_entry_1][event] = 1
            result[league_entry_2][event] = 1

    return result

async def weekly_trades() -> Dict[str, Dict[int, int]]:
    transactions = await get_transactions()
    league_entries = await get_league_entries()
    teams = {entry["entry_id"]: entry["entry_name"] for entry in league_entries}

    gameweek = await get_upcoming_gameweek()
    result = {team_name: {week: 0 for week in range(1, gameweek + 1)} for team_name in teams.values()}

    for transaction in transactions:
        event = transaction["event"]
        team_id = transaction["entry"]
        team_name = teams.get(team_id)

        if team_name and transaction["result"] == "a":
            result[team_name][event] += 1

    return result

async def point_differential() -> Dict[str, int]:
    entry_names = await get_entry_names()
    standings = await get_standings()

    team_diffs = {}
    for team in standings:
        team_name = entry_names[team["league_entry"]]
        diff = team["points_for"] - team["points_against"]
        team_diffs[team_name] = diff

    return dict(sorted(team_diffs.items(), key=lambda item: item[1], reverse=True))

async def pick_order() -> Dict[str, int]:
    choices = await get_choices()

    pick_order_dict = {}
    for choice in choices:
        if choice["round"] == 1:
            pick_order_dict[choice["entry_name"]] = choice["pick"]

    return pick_order_dict

async def combined_table() -> List[Manager]:
    total_points = await weekly_total_points()
    win_loss_points = await weekly_win_loss_points()
    trades = await weekly_trades()
    point_diffs = await point_differential()
    pick_order_dict = await pick_order()

    teams = set(total_points.keys()) | set(win_loss_points.keys()) | set(trades.keys()) | set(point_diffs.keys())
    
    result = []
    for team in teams:
        team_stats = Manager(
            team_name=team,
            total_points_scored=sum(total_points.get(team, {}).values()),
            points=sum(win_loss_points.get(team, {}).values()),
            total_trades=sum(trades.get(team, {}).values()),
            point_difference=point_diffs.get(team, 0),
            pick=pick_order_dict.get(team, 0),

        )
        result.append(team_stats)

    # Sort by total points
    result.sort(key=lambda x: x.points, reverse=True)

    return result