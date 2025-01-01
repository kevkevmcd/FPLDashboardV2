from clients.fpl_data_fetchers import get_entry_names, get_matches, get_upcoming_gameweek
from models import ManagerWeeklyPoints, ManagerMatchPoints, MatchPoints
from typing import List
import logging

logger = logging.getLogger(__name__)

async def weekly_total_points() -> List[ManagerWeeklyPoints]:

    try:
        gameweek = await get_upcoming_gameweek()
        if gameweek == 1:
            logger.info("Gameweek one, no top players yet.")
            return []
        
        entry_names = await get_entry_names()
        if not entry_names:
            logger.error("Failed to get entry names")
            return []
        
        matches = await get_matches()
        if not matches:
            logger.error("Failed to get matches")
            return []

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

        team_points_list.sort(key=lambda x: x.team_name)

        return team_points_list

    except Exception as e:
        logger.error(f"Unable to get list of weekly total points: {e}")
        return []

async def get_match_points_data() -> MatchPoints:
    try:
        gameweek = await get_upcoming_gameweek()
        if gameweek == 1:
            logger.info("Gameweek one, no top players yet.")
            return MatchPoints()
        
        entry_names = await get_entry_names()
        if not entry_names:
            logger.error("Failed to get entry names")
            return MatchPoints()
        
        matches = await get_matches()
        if not matches:
            logger.error("Failed to get matches")
            return MatchPoints()
        
        team_points_list = [
            ManagerMatchPoints(team_name=entry_name, gameweek_points=[])
            for entry_name in entry_names.values()
        ]

        # Create a map from team names to their respective ManagerMatchPoints object
        team_points_map = {team.team_name: team for team in team_points_list}

        # Track cumulative scores for each manager
        cumulative_points = {name: 0 for name in entry_names.values()}

        # Process each match
        for match in matches:
            if not match["finished"]:
                continue

            # Extract teams and their scores
            league_entry_1 = entry_names[match["league_entry_1"]]
            league_entry_2 = entry_names[match["league_entry_2"]]
            league_entry_1_points = match["league_entry_1_points"]
            league_entry_2_points = match["league_entry_2_points"]

            # Determine match result and assign points
            if league_entry_1_points > league_entry_2_points:
                league_entry_1_result = 3
                league_entry_2_result = 0
            elif league_entry_1_points < league_entry_2_points:
                league_entry_1_result = 0
                league_entry_2_result = 3
            else:
                league_entry_1_result = 1
                league_entry_2_result = 1

            # Update cumulative points for each team
            cumulative_points[league_entry_1] += league_entry_1_result
            cumulative_points[league_entry_2] += league_entry_2_result

            # Append the cumulative points to each team’s gameweek points
            team_points_map[league_entry_1].gameweek_points.append(cumulative_points[league_entry_1])
            team_points_map[league_entry_2].gameweek_points.append(cumulative_points[league_entry_2])

        # top 5 managers based on recent 4-week points
        recent_points = []
        for team in team_points_list:
            # Calculate the points in the last 4 weeks by finding the difference
            if len(team.gameweek_points) >= 4:
                recent_week_points = team.gameweek_points[-1] - team.gameweek_points[-5]
            else:
                recent_week_points = team.gameweek_points[-1]
            recent_points.append({
                "team_name": team.team_name,
                "cumulative_match_points": recent_week_points
            })

        # Sort recent points to find the top 5
        recent_points.sort(key=lambda x: x["cumulative_match_points"], reverse=True)
        top_managers = {team["team_name"]: team["cumulative_match_points"] for team in recent_points[:5]}

        # Sort team_points_list alphabetically for consistent ordering in the response
        team_points_list.sort(key=lambda x: x.team_name)

        # Return data in the MatchPoints structure
        return MatchPoints(
            manager_match_points=team_points_list,
            in_form_managers=top_managers
        )
    
    except Exception as e:
        logger.error(f"Unable to get match points data: {e}")
        return MatchPoints()