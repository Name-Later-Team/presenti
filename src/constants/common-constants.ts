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
    VALIDATION_ERROR: 4001,
    CANNOT_FIND_PRESENTATION: 4002,

    // 401: UNAUTHORIZED
    INVALID_TOKEN: 4011,
    MISSING_TOKEN: 4012,

    // 403: FORBIDDEN
    CANNOT_JOIN_NOT_PRESENTING_PRESENTATION: 4035,
    INVALID_RESOURCE_PERMISSION: 4038,
};

// define all success notifications
export const SUCCESS_NOTIFICATION = {};

// define all error notifications
export const ERROR_NOTIFICATION = {
    VALIDATION_ERROR: "Có lỗi trong yêu cầu đã gửi",
    CANNOT_FIND_PRESENTATION: "Không tìm thấy bài trình bày đã yêu cầu",
    JOIN_VOTING_PROCESS: "Có lỗi xảy ra khi gửi yêu cầu tham gia bầu chọn",
    NOT_PRESENTING_PRESENTATION: "Bài trình bày này đang không được chiếu",
};

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
