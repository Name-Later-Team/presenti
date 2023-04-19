import { APP_CONFIG } from "backend/configs";
import nextSession from "next-session";

export type UserSessionData = { anonymousId: string };

export const getServerSideSession = nextSession<{ user: UserSessionData }>({
    name: APP_CONFIG.cookie.name,
    autoCommit: false,
    cookie: {
        path: APP_CONFIG.cookie.path,
        httpOnly: true,
        secure: APP_CONFIG.cookie.secure,
        sameSite: true,
        maxAge: APP_CONFIG.cookie.maxAge,
    },
});
