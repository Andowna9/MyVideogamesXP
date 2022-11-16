import os
from dotenv import load_dotenv

load_dotenv()

APP_SECRET = os.getenv("APP_SECRET")
DATABASE_URL = os.getenv("DATABASE_URL")

GOOGLE_OAUTH_CLIENT_ID = os.getenv("GOOGLE_OAUTH_CLIENT_ID")
GOOGLE_OAUTH_CLIENT_SECRET = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET")