from services.util import get_entry_names, get_matches, get_upcoming_gameweek
from models.managerweeklypoints import ManagerWeeklyPoints
from models.managermatchpoints import ManagerMatchPoints
from typing import List

async def weekly_total_points() -> List[ManagerWeeklyPoints]:
    entry_names = await get_entry_names()
    matches = await get_matches()

    # Initialize the list of ManagerWeeklyPoints
    team_points_list = [
        ManagerWeeklyPoints(team_name=entry_name, points_by_gameweek=[])
        for entry_name in entry_names.values()
    ]

    # Create a map from team names to their respective ManagerWeeklyPoints object
    team_points_map = {team.team_name: team for team in team_points_list}

    for match in matches:
        if not match["finished"]:
            continue

        league_entry_1 = entry_names[match["league_entry_1"]]
        league_entry_1_points = match["league_entry_1_points"]
        league_entry_2 = entry_names[match["league_entry_2"]]
        league_entry_2_points = match["league_entry_2_points"]

        # Append points for both teams in the current match using the map
        team_points_map[league_entry_1].points_by_gameweek.append(league_entry_1_points)
        team_points_map[league_entry_2].points_by_gameweek.append(league_entry_2_points)

    return team_points_list

async def weekly_win_loss_points() -> List[ManagerMatchPoints]:
    entry_names = await get_entry_names()
    matches = await get_matches()

    team_points_list = [
        ManagerMatchPoints(team_name=entry_name, gameweek_points=[])
        for entry_name in entry_names.values()
    ]

    # Create a map from team names to their respective ManagerMatchPoints object
    team_points_map = {team.team_name: team for team in team_points_list}

    # Dictionary to track the cumulative score
    cumulative_points = {name: 0 for name in entry_names.values()}

    for match in matches:
        if not match["finished"]:
            continue

        league_entry_1 = entry_names[match["league_entry_1"]]
        league_entry_2 = entry_names[match["league_entry_2"]]

        league_entry_1_points = match["league_entry_1_points"]
        league_entry_2_points = match["league_entry_2_points"]

        # Determine win/loss/draw and add the points
        if league_entry_1_points > league_entry_2_points:
            league_entry_1_result = 3
            league_entry_2_result = 0
        elif league_entry_1_points < league_entry_2_points:
            league_entry_1_result = 0
            league_entry_2_result = 3
        else:
            league_entry_1_result = 1
            league_entry_2_result = 1

        # Add current week points to cumulative points
        cumulative_points[league_entry_1] += league_entry_1_result
        cumulative_points[league_entry_2] += league_entry_2_result

        # Append cumulative points for the current week using the map
        team_points_map[league_entry_1].gameweek_points.append(cumulative_points[league_entry_1])
        team_points_map[league_entry_2].gameweek_points.append(cumulative_points[league_entry_2])

    return team_points_list