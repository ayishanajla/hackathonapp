import clients from '../../../common/clients';

export const CandidateRegisterActions = {
    candidateRegister: async (data) => {
        try {
            const response = await clients.candidateRegister.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    validateCandidateNo: async (data) => {
        try {
            const response = await clients.validateCandidateNo.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    candidateSearch: async (data) => {
        try {
            const response = await clients.candidateSearch.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    }
}
