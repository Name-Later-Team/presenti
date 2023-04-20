import { HttpService } from "./http-service";

export default class SocketService {
    static postAuthenticationTicketAsync(body: any = {}) {
        return HttpService.post<{
            ticket: string;
        }>(`/api/tickets`, body);
    }
}
