import fpl_api_clients

async def get_matches():
    response = await fpl_api_clients.get_fpl_details()
    return response["matches"]

async def get_standings():
    response = await fpl_api_clients.get_fpl_details()
    return response["standings"]

async def get_transactions():
    response = await fpl_api_clients.get_fpl_transactions()
    return response["transactions"]

async def get_choices():
    response = await fpl_api_clients.get_fpl_choices()
    return response["choices"]

async def get_upcoming_gameweek():
    response = await fpl_api_clients.get_fpl_game()
    week = response["current_event"]

    if response["current_event_finished"]:
        week = response["next_event"]

    return week

async def get_league_entries():
    response = await fpl_api_clients.get_fpl_details()
    return response["league_entries"]

async def get_entry_names():
    league_entries = await get_league_entries()
    entry_names = {entry["id"]: entry["entry_name"] for entry in league_entries}
    return entry_names