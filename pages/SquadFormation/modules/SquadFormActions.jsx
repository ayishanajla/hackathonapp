import clients from '../../../common/clients';

export const SquadFormActions = {

     
    getSquadList: async (data) => {
        try {
            const response = await clients.squadList.post('',data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getCandidateList: async (data) => {
        try {
            const response = await clients.candidateListClient.post('',data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getSquadCandidateList: async (data) => {
        try {
            const response = await clients.squadCandidatesList.post('',data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    addSquad: async (data) => {
        try {
            const response = await clients.addSquad.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    squadCandidatesInsert: async (data) => {
        try {
            const response = await clients.squadCandidatesInsert.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    editSquadImage: async (data) => {
        try {
            const response = await clients.editSquadImage.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    }
   
   
}
