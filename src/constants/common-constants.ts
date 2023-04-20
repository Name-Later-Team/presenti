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
    CANNOT_FIND_SLIDE: 4004,
    CANNOT_FIND_CHOICE: 4009,

    // 401: UNAUTHORIZED
    INVALID_TOKEN: 4011,
    MISSING_TOKEN: 4012,

    // 403: FORBIDDEN
    CANNOT_JOIN_NOT_PRESENTING_PRESENTATION: 4035,
    CANNOT_INTERACT_WITH_IDLE_SLIDE: 4036,
    CLOSED_VOTING: 4037,
    MULTIPLE_ANSWER_DISABLED: 4038,
    SLIDE_VOTING_DISABLED: 4039,
    DISABLED_VOTE_SAME_SESSION: 40310,
};

// define all success notifications
export const SUCCESS_NOTIFICATION = {};

// define all info notifications
export const INFO_NOTIFICATION = {
    DISABLED_VOTE_SAME_SESSION: "Bạn đã bầu chọn cho câu hỏi này rồi",
};

// define all error notifications
export const ERROR_NOTIFICATION = {
    VALIDATION_ERROR: "Có lỗi trong yêu cầu đã gửi",
    CANNOT_FIND_PRESENTATION: "Không tìm thấy bài trình bày đã yêu cầu",
    CANNOT_FIND_SLIDE: "Không tìm thấy trang chiếu đã yêu cầu",
    JOIN_VOTING_PROCESS: "Có lỗi xảy ra khi gửi yêu cầu tham gia bầu chọn",
    NOT_PRESENTING_PRESENTATION: "Bài trình bày này đang không được chiếu",
    FETCH_PRESENTATION_DETAIL: "Có lỗi xảy ra khi gửi yêu cầu lấy chi tiết bài trình bày",
    FETCH_SLIDE_DETAIL: "Có lỗi xảy ra khi gửi yêu cầu lấy chi tiết trang chiếu",
    VOTE_PROCESS: "Có lỗi xảy ra khi gửi bầu chọn của bạn",
    CLOSED_VOTING: "Bài trình bày này đã đóng chức năng bầu chọn",
    MULTIPLE_ANSWER_DISABLED: "Bài trình bày này không cho phép bầu chọn nhiều phương án",
    SLIDE_VOTING_DISABLED: "Không thể bầu chọn cho câu hỏi này",
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
