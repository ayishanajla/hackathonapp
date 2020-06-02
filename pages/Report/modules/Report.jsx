import clients from '../../../common/clients';

export const PanelRegisterActions = {
    geClientDetailsList: async () => {
        try {
            const response = await clients.clientDetailsList.get('');
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
    registerPanel: async (data) => {
        try {
            const response = await clients.registerPanel.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },


}
