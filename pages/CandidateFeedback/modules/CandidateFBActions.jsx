import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/feedback.actiontype";

export const CandidateFBActions = {
    candidateFB: async (data) => {
        try {
            const response = await clients.candidateFB.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    squadList: async (data) => {
        try {
            const response = await clients.squadList.get('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    squadCandidateList: async (data) => {
        try {
            const response = await clients.squadCandidateList.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    setCandidateSelection: (data) => {
        return async (dispatch) => dispatch({
            type : actionTypes.CANDIDATE_SELECTION,
            payload : data
        });
    },
    candidateFeedbackList: async (data) => {
        try {
            const response = await clients.candidateFeedbackList.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    candidateAssessList: async (data) => {
        try {
            const response = await clients.AssessList.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    competancyList: async (data) => {
        try {
            const response = await clients.competancyList.get('');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    }
}
