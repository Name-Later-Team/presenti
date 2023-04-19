// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApiService } from "backend/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (!req.url) {
        res.status(404).send({});
        return;
    }

    const apiService = new ApiService();
    let promise: Promise<any> | null = null;

    switch (req.method) {
        case "GET": {
            promise = apiService.getRequestAsync(req.url.replace("/api", ""));
            break;
        }

        case "POST": {
            promise = apiService.postJsonRequestAsync(req.url.replace("/api", ""), req.body);
            break;
        }

        case "PUT": {
            promise = apiService.putJsonRequestAsync(req.url.replace("/api", ""), req.body);
            break;
        }

        case "DELETE": {
            promise = apiService.deleteRequestAsync(req.url.replace("/api", ""));
            break;
        }
    }

    if (!promise) {
        res.status(404).send({});
        return;
    }

    try {
        const response = await promise;

        res.status(response.status).send(response.data);
    } catch (error: any) {
        res.status(error.status).send(error.data);
    }
}
