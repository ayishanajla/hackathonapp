import clients from '../../../common/clients';

export const RegisterEventActions = {

    getEventByUser: async (data) => {
        try {
            const response = await clients.eventByUser.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getAdminBySearch: async (data) => {
        try {
            const response = await clients.searchAdminListDetails.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },

    registerEvent: async (data) => {
        try {
            const response = await clients.registerEvent.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    editEvent: async (data) => {
        try {
            const response = await clients.editEvent.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    geClientDetailsList: async () => {
        try {
            const response = await clients.clientDetailsList.get('');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },

    addClientDetails: async (data) => {
        try {
            const response = await clients.addClient.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    
    closeEvent: async (data) => {
        try {
            const response = await clients.closeEvent.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    }
}
