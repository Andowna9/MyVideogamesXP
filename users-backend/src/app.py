from fastapi import FastAPI

from src.db import create_db_and_tables
from src.schemas import UserCreate, UserRead, UserUpdate
from src.users import auth_backend, google_auth_backend, fastapi_users, google_oauth_client

from src.config import APP_SECRET

app = FastAPI(root_path='/api/accounts')

# Login/logout
app.include_router(
    fastapi_users.get_auth_router(auth_backend), 
    prefix="/auth/jwt", 
    tags=["auth"]
)

# Register
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

# Get/update users
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

# Google oauth2
app.include_router(
    fastapi_users.get_oauth_router(
        google_oauth_client,
        google_auth_backend,
        APP_SECRET,
        redirect_url="http://localhost/api/accounts/auth/google/callback",
        associate_by_email=True,
    ),
    prefix="/auth/google",
    tags=["auth"],
)

@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()