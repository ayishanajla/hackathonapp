import * as actionTypes from "../../../common/actionTypes/feedback.actiontype";

export const initialState = {
      candidateList : [],
      candidateSelection: {},
      squadList: [],
      eventDetails: {}
};


export const feedbackReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionTypes.CANDIDATE_SELECTION:
        return {
            ...state,
            candidateList : action.payload.candidateList,
            candidateSelection : action.payload.candidateSelection,
            squadList: action.payload.squadList,
            eventDetails: action.payload.eventDetails
        };
        default:
        return state;
    }
}