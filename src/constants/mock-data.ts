export const presentationDetail = {
    createdAt: "2023-04-01T10:25:19.077Z",
    updatedAt: "2023-04-12T09:29:04.293Z",
    name: "Demo",
    identifier: "977949fe-6fff-4388-9641-7426c9daa5fb",
    ownerIdentifier: "dfd0cdab-13b2-4fde-8462-9727286bcebd",
    ownerDisplayName: "Hua Hung",
    pace: {
        mode: "presenter",
        active_slide_id: 48,
        state: "idle",
        counter: 0,
    },
    closedForVoting: false,
    totalSlides: 5,
    slides: [
        {
            id: 48,
            slideType: "multiple_choice",
            position: 0,
        },
        {
            id: 75,
            slideType: "multiple_choice",
            position: 1,
        },
        {
            id: 76,
            slideType: "multiple_choice",
            position: 2,
        },
        {
            id: 77,
            slideType: "multiple_choice",
            position: 3,
        },
        {
            id: 78,
            slideType: "multiple_choice",
            position: 4,
        },
    ],
};

export const slideDetail = {
    id: 48,
    createdAt: "2023-04-01T10:25:19.082Z",
    updatedAt: "2023-04-10T17:16:02.617Z",
    presentationId: 48,
    presentationIdentifier: "977949fe-6fff-4388-9641-7426c9daa5fb",
    question: "Câu hỏi số 1",
    questionDescription: "",
    questionImageUrl: null,
    questionVideoEmbedUrl: null,
    slideType: "multiple_choice",
    speakerNotes: "",
    isActive: true,
    showResult: true,
    hideInstructionBar: false,
    extrasConfig: null,
    position: 0,
    textSize: 32,
    respondents: 0,
    selectedOption: "",
    options: [
        {
            key: 48,
            value: "Lựa chọn 1",
            type: "option",
            position: 0,
            metadata: null,
        },
        {
            key: 79,
            value: "Lựa chọn 2",
            type: "option",
            position: 1,
            metadata: null,
        },
        {
            key: 80,
            value: "Lựa chọn 3",
            type: "option",
            position: 2,
            metadata: null,
        },
    ],
    result: [
        {
            key: 48,
            value: 0,
        },
        {
            key: 79,
            value: 0,
        },
        {
            key: 80,
            value: 0,
        },
    ],
};

export const votingCode = {
    code: "09779355",
    isValid: true,
    expiresAt: "2023-04-14T09:19:23.531Z",
};
