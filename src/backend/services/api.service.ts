import axios, { AxiosInstance } from "axios";
import moment from "moment";
// import { Logger } from "../common/utils/logger";
import * as sdk from "@huyleminh/nodejs-sdk";
import { APP_CONFIG } from "../configs";

/**
 * @description This service is a proxy agent that helps app to connect to API Gateway API
 * - Current solution supports RSA request only
 */
export class ApiService {
    private _axiosInstance: AxiosInstance;

    constructor() {
        this._axiosInstance = axios.create({
            baseURL: APP_CONFIG.apiGateway,
        });

        this._axiosInstance.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                const { response } = error;

                if (!response) {
                    console.error(error.message);
                    return Promise.reject({ status: 504, data: { code: 504, message: "Gateway Timeout" } });
                }

                // if request is unauthorized and this error is caused by developer - missing fields in header when calling gateway
                const { status, data } = response;
                if (status === 401 && data.code !== 4011) {
                    console.error(JSON.stringify(response.data));
                    return Promise.reject({ status: 500, data: { code: 500, message: "Internal Server Error" } });
                }

                return Promise.reject({ status: response.status, data: response.data });
            }
        );
    }

    async getRequestAsync(path: string, headers = {}) {
        const baseHeaders = this._generateBaseHeaders("GET", path);

        const result = await this._axiosInstance.get(path, {
            headers: {
                ...headers,
                ...baseHeaders,
                "User-Agent": APP_CONFIG.backendAgent,
            },
        });
        return result;
    }

    async postJsonRequestAsync(path: string, body: any, headers = {}) {
        const baseHeaders = this._generateBaseHeaders("POST", path, body);

        const result = await this._axiosInstance.post(path, body, {
            headers: {
                ...headers,
                ...baseHeaders,
                "Content-Type": "application/json+text",
                "User-Agent": APP_CONFIG.backendAgent,
            },
        });
        return result;
    }

    async putJsonRequestAsync(path: string, body: any, headers = {}) {
        const baseHeaders = this._generateBaseHeaders("PUT", path, body);

        const result = await this._axiosInstance.put(path, body, {
            headers: {
                ...headers,
                ...baseHeaders,
                "Content-Type": "application/json+text",
                "User-Agent": APP_CONFIG.backendAgent,
            },
        });
        return result;
    }

    async deleteRequestAsync(path: string, headers = {}) {
        const baseHeaders = this._generateBaseHeaders("DELETE", path);

        const result = await this._axiosInstance.delete(path, {
            headers: {
                ...headers,
                ...baseHeaders,
                "User-Agent": APP_CONFIG.backendAgent,
            },
        });
        return result;
    }

    private _generateBaseHeaders(method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", path: string, body?: any) {
        // generate signature
        const currentTime = moment().format("YYYY-MM-DDTHH:mm:ssZ");
        const resourceUri = path.replace(/(\?.+)|\?/, "");

        const signSetting = {
            privateKey: APP_CONFIG.rsa.privateKey,
            passphrase: APP_CONFIG.rsa.passphrase,
            payload: body,
            headers: {
                requestTime: currentTime,
                httpMethod: method,
                clientId: APP_CONFIG.clientId,
                resourceUri,
            },
        };

        const signer = new sdk.RsaSigner(signSetting);
        const signature = signer.generateSignature();

        return {
            "Client-Id": APP_CONFIG.clientId,
            "Request-Time": currentTime,
            "Resource-Uri": resourceUri,
            "Service-Slug": APP_CONFIG.slug,
            Signature: `algorithm=RSA-SHA256, signature=${signature}`,
        };
    }
}
