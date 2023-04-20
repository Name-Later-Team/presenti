export interface IPaginationMetadata {
    page: number;
    pageSize: number;
    totalRecord: number;
}

export interface IBaseResponse<T> {
    code: number;
    message: string;
    data?: T;
    errors?: any;
}

export interface IAccessTokenResponse {
    accessToken: string;
    expiresIn: number;
}

export interface IOptionsResponse {
    id: number;
    label: string;
    type: string;
    position: number;
    isCorrectAnswer: boolean;
    metadata: any;
}

export interface ISlideDetailResponse {
    question: string;
    questionDescription: string;
    isActive: boolean;
    hideInstructionBar: boolean;
    textSize: number;
    slideType: string;
    extrasConfig: string;
    questionImageUrl: string | null;
    questionVideoEmbedUrl: string | null;
    speakerNotes: string;
    id: number;
    position: number;
    presentationIdentifier: string;
    choices: IOptionsResponse[];
}

export interface IPresentationDetailResponse {
    closedForVoting: boolean;
    identifier: string;
    name: string;
    ownerDisplayName: string;
    pace: {
        mode: string;
        state: string;
        active_slide_id: number;
        counter: number;
    };
    totalSlides: number;
}
