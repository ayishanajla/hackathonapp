import clients from '../../../common/clients';

export const PanelRegisterActions = {
    geClientDetailsById: async (data) => {
        try {
            const response = await clients.clientDetailsList.post('',data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getEventList: async () => {
        try {
            const response = await clients.eventList.get('');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getPanelList: async (data) => {
        try {
            const response = await clients.getPanelList.post('',data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    registerPanel: async (data) => {
        try {
            const response = await clients.registerPanel.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getUserBySearch: async (data) => {
        try {
            const response = await clients.searchUserListDetails.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },

}
