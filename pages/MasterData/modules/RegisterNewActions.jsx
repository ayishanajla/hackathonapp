import clients from '../../../common/clients';

export const RegisterNewActions = {   
    addClientDetails: async (data) => {
        try {
            const response = await clients.addClient.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    addCompetancyDetails: async (data) => {
        try {
            const response = await clients.addCompetancy.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    addSkillDetails: async (data) => {
        try {
            const response = await clients.addSkill.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    addAssessment: async (data) => {
        try {
            const response = await clients.addAssessment.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    addNewLocation: async (data) => {
        try {
            const response = await clients.addNewLocation.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    }
}

