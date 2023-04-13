export const COMMON_CONSTANTS = {
    API_MESSAGE: {
        INTERNAL_ERROR: "Đã có lỗi trong quá trình xử lý, vui lòng liên hệ admin",
    },
    pagination: {
        limit: 10,
        defaultPage: 1,
        defaultTotal: 0,
    },
};

export const RESPONSE_CODE = {
    // 400: BAD REQUEST

    // 401: UNAUTHORIZED
    INVALID_TOKEN: 4011,
    MISSING_TOKEN: 4012,

    // 403: FORBIDDEN
    INVALID_RESOURCE_PERMISSION: 4038,
};

// define all success notifications
export const SUCCESS_NOTIFICATION = {};

// define all error notifications
export const ERROR_NOTIFICATION = {};

export const PRESENTATION_TYPE = {
    OWNER: "owner",
    COLLABORATOR: "collaborator",
};

export const SLIDE_TYPE = {
    MULTIPLE_CHOICE: "multiple_choice",
    HEADING: "heading",
    PARAGRAPH: "paragraph",
} as const;

export const PRESENTATION_PACE_STATES = {
    IDLE: "idle",
    PRESENTING: "presenting",
} as const;
