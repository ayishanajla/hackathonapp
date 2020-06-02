import { combineReducers } from "redux";
import { feedbackReducer } from '../pages/CandidateFeedback/modules/feedback.reducer';
export default combineReducers({
    feedbackReducer : feedbackReducer,
});
