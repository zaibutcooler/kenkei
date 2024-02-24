from fastapi import FastAPI
from app.api.notifications import router as notification_router

app = FastAPI()

app.include_router(notification_router)
