import { PRESENTATION_PACE_STATES, SLIDE_TYPE } from "../../constants";

export type SlideType = (typeof SLIDE_TYPE)[keyof typeof SLIDE_TYPE];

export type PresentationPaceStateType = (typeof PRESENTATION_PACE_STATES)[keyof typeof PRESENTATION_PACE_STATES];
