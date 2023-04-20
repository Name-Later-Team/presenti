import { IPresentationDetailResponse, ISlideDetailResponse } from "shared/interfaces";
import { HttpService } from "./http-service";

export default class AudienceService {
    static getPresentationFromVotingCodeAsync(votingCode: string) {
        return HttpService.get<any>(`/api/presentation/v1/audience/votingCodes/${votingCode}/presentation`);
    }

    static getPresentationDetailAsync(presentationIdentifier: string) {
        return HttpService.get<IPresentationDetailResponse>(
            `/api/presentation/v1/audience/presentations/${presentationIdentifier}`
        );
    }

    static getSlideDetailAsync(presentationIdentifier: string, slideId: string) {
        return HttpService.get<ISlideDetailResponse>(
            `/api/presentation/v1/audience/presentations/${presentationIdentifier}/slides/${slideId}`
        );
    }

    static postVotingOptions(
        presentationIdentifier: string,
        slideId: string,
        payload: { userId: string; choiceIds: number[] }
    ) {
        return HttpService.post<any>(
            `/api/presentation/v1/audience/presentations/${presentationIdentifier}/slides/${slideId}/vote`,
            payload
        );
    }
}
