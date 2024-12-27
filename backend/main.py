from fastapi import FastAPI
from endpoints.league import router as league_router
from endpoints.players import router as players_router

app = FastAPI()

app.include_router(players_router)
app.include_router(league_router)