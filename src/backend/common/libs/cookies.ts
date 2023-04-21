import { APP_CONFIG } from "backend/configs";
import Cookies from "cookies";
import { IncomingMessage, ServerResponse } from "http";
import { v4 } from "uuid";

export function getOrSetUserAnonymousIdentifier(req: IncomingMessage, res: ServerResponse<IncomingMessage>): string {
    const cookies = new Cookies(req, res, {
        keys: [APP_CONFIG.cookies.secret],
        secure: APP_CONFIG.cookies.secure,
    });

    const cookiesName = APP_CONFIG.cookies.name;
    let identifier = cookies.get(cookiesName, { signed: true });

    if (!identifier) {
        identifier = v4();
        cookies.set(cookiesName, identifier, {
            maxAge: APP_CONFIG.cookies.maxAge,
            httpOnly: true,
            path: APP_CONFIG.cookies.path,
            sameSite: true,
            signed: true,
            secure: APP_CONFIG.cookies.secure,
        });
    }

    return identifier;
}
