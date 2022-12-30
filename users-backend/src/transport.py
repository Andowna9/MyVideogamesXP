from fastapi import status
from fastapi_users.authentication import CookieTransport

class AutoRedirectCookieTransport(CookieTransport):
    async def get_login_response(self, token, response):
        await super().get_login_response(token, response)
        response.status_code = status.HTTP_302_FOUND
        response.headers["Location"] = "http://localhost:3000/"