export const APP_CONFIG = {
    clientId: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    slug: process.env.APP_SLUG || "",
    backendAgent: process.env.BACKEND_AGENT || "",

    rsa: {
        privateKey: process.env.RSA_PRIVATE_KEY || "",
        passphrase: process.env.RSA_PASSPHRASE || "",
    },

    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
    },

    cookie: {
        name: process.env.COOKIE_NAME || "",
        secret: process.env.COOKIE_SECRET || "",
        path: process.env.COOKIE_PATH || "",
        secure: Boolean(process.env.COOKIE_SECURE).valueOf(),
        maxAge: process.env.COOKIE_MAX_AGE ? +process.env.COOKIE_MAX_AGE : undefined,
    },

    apiGateway: process.env.API_GATEWAY_URL || "",
    socketService: process.env.SOCKET_SERVICE_URL || "",
} as const;
