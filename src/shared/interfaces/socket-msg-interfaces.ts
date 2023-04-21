export interface IChangeSlideSocketMsg {
    presentationIdentifier: string;
    pace: {
        mode: string;
        active_slide_id: number;
        state: string;
        counter: number;
    };
}

export interface IQuitSlideSocketMsg {
    presentationIdentifier: string;
}

export interface IPresentActionSocketMsg {
    presentationIdentifier: string;
    pace: {
        mode: string;
        active_slide_id: number;
        state: string;
        counter: number;
    };
}
