from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from endpoints.league import router as league_router
from endpoints.players import router as players_router

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "https://fpl-dashboard.com",
    "https://fpldashboardv2-fe.onrender.com/",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players_router)
app.include_router(league_router)