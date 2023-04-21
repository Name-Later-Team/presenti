import { getOrSetUserAnonymousIdentifier } from "backend/common/libs";
import { SocketApiService } from "backend/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(404).send({ code: 404, message: "Not Found" });
        return;
    }

    try {
        const userIdentifier = getOrSetUserAnonymousIdentifier(req, res);

        const socketService = new SocketApiService();
        const response = await socketService.postJsonRequestAsync("/v1/audience/tickets", { userIdentifier });

        res.status(response.status).send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
}
