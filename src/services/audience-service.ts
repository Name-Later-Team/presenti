import { HttpService } from "./http-service";

export default class AudienceService {
    static getPresentationFromVotingCodeAsync(votingCode: string) {
        return HttpService.get<any>(`/api/presentation/v1/audience/votingCodes/${votingCode}/presentation`);
    }
}
