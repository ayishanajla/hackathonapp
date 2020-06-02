import clients from '../../../common/clients';

export const ClientFeedbackActions = {
    clientFeedbackOnEvent: async (data) => {
        try {
            const response = await clients.clientFeedbackOnEvent.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
   
    geClientDetailsById: async (data) => {
        try {
            const response = await clients.clientDetailsList.post('',data);
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
}
