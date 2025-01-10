import clients.fpl_api_clients as fpl_api_clients

async def get_matches():
    response = await fpl_api_clients.get_fpl_details()

    if "standings" not in response:
        return []    

    return response["matches"]

async def get_standings():
    response = await fpl_api_clients.get_fpl_details()

    if "standings" not in response:
        return []    

    return response["standings"]

async def get_transactions():
    response = await fpl_api_clients.get_fpl_transactions()

    if "transactions" not in response:
        return []    

    return response["transactions"]

async def get_choices():
    response = await fpl_api_clients.get_fpl_choices()
    
    if "choices" not in response:
        return []

    return response["choices"]

async def get_upcoming_gameweek():
    response = await fpl_api_clients.get_fpl_game()

    if "current_event" not in response:
        return None

    week = response["current_event"]

    if response["current_event_finished"]:
        week = response["next_event"]

    return week

async def get_league_entries():
    response = await fpl_api_clients.get_fpl_details()

    if "league_entries" not in response:
        return []

    return response["league_entries"]

async def get_league_info():
    response = await fpl_api_clients.get_fpl_details()

    if "league" not in response:
        return []
    
    return response["league"]

async def get_entry_names():
    league_entries = await get_league_entries()
    entry_names = {entry["id"]: entry["entry_name"] for entry in league_entries}
    return entry_names

async def get_player_data():
    response = await fpl_api_clients.get_fpl_player_data()

    if "elements" not in response:
        return []

    return response["elements"]

async def get_element_statuses():
    response = await fpl_api_clients.get_element_status_data()

    if "element_status" not in response:
        return []    

    return response["element_status"]

async def get_fantasy_player_data():
    response = await fpl_api_clients.get_fantasy_static_elements()

    if "elements" not in response:
        return []    

    return response["elements"]