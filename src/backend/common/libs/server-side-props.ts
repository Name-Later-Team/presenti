import { GetServerSidePropsContext } from "next";
import { v4 } from "uuid";
import { UserSessionData, getServerSideSession } from "./session";

/**
 * @description Get user data from session and initiate if not exist. This function must be call in all page to ensure user session value
 */
export async function getUserSessionDataAsync(context: GetServerSidePropsContext) {
    const { req, res } = context;

    const session = await getServerSideSession(req, res);

    if (!session.user) {
        session.user = {} as UserSessionData;
    }

    if (!session.user || !session.user.anonymousId) {
        // init user anonymous session id
        session.user.anonymousId = v4();
        await session.commit();
    }

    return session.user;
}
