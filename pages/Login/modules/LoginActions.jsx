import clients from '../../../common/clients';

export const LoginActions = {    
    loginDetails: async (data) => {
        try {
            const response = await clients.loginDetails.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
}

