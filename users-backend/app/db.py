from typing import AsyncGenerator, List

from fastapi import Depends
from fastapi_users.db import (
    SQLAlchemyBaseUserTableUUID, 
    SQLAlchemyUserDatabase,
    SQLAlchemyBaseOAuthAccountTableUUID
)
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import Column, String

from app.config import DATABASE_URL

Base: DeclarativeMeta = declarative_base()

class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass

class User(SQLAlchemyBaseUserTableUUID, Base):
    # username = Column(String(length=100), index=True, nullable=True)
    oauth_accounts: List[OAuthAccount] = relationship("OAuthAccount", lazy="joined")


engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)