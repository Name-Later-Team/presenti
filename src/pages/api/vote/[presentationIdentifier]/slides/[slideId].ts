// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOrSetUserAnonymousIdentifier } from "backend/common/libs";
import { ApiService } from "backend/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { presentationIdentifier, slideId } = req.query;
    if (!presentationIdentifier || !presentationIdentifier) {
        res.status(404).send({ code: 404, message: "Not Found" });
        return;
    }

    if (req.method !== "POST") {
        res.status(404).send({ code: 404, message: "Not Found" });
        return;
    }

    const userId = getOrSetUserAnonymousIdentifier(req, res);

    const apiService = new ApiService();
    const promise: Promise<any> = apiService.postJsonRequestAsync(
        `/presentation/v1/audience/presentations/${presentationIdentifier}/slides/${slideId}/vote`,
        {
            userId,
            ...req.body,
        }
    );

    try {
        const response = await promise;

        res.status(response.status).send(response.data);
    } catch (error: any) {
        res.status(error.status).send(error.data);
    }
}
