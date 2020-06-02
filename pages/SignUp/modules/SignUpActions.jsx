import clients from '../../../common/clients';

export const SignUpActions = {    
    signUpDetails: async (data) => {
        try {
            const response = await clients.signUpDetails.post('', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },

}
