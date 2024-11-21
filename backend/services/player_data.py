from services.util import get_player_data
from models.topplayer import TopPlayer
from typing import List, Dict

async def get_top_players() -> List[TopPlayer]:
    data = await get_player_data()
    # Filter players based on form and minutes
    filtered_players = [
        {
            "id": player["id"],
            "name": f"{player['first_name']} {player['second_name']}",
            "form": float(player["form"]),
            "points_per_game": float(player["points_per_game"]),
            "total_points": player["total_points"]
        }
        for player in data
        if float(player["form"]) > 6 and player["minutes"] > 0
    ]

    # Sort by form descending, then by points_per_game descending
    sorted_players = sorted(
        filtered_players,
        key=lambda player: (player["form"], player["points_per_game"]),
        reverse=True
    )

    # Get the top 10 players after sorting
    top_10_players = sorted_players[:10]

    # Convert each player dictionary to a TopPlayer model instance
    top_10_in_form = [TopPlayer(**player) for player in top_10_players]

    return top_10_in_form