import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import {
    IonContent, IonIcon, IonPage, IonSelect,
    IonSelectOption, IonList, IonItem, IonLabel, IonInput,
    IonButton, IonLoading, IonToast,
} from '@ionic/react';
import clients from '../../common/clients';
import AddUser from './AddUser';
import { addOutline,  trashOutline } from 'ionicons/icons';
import { PanelRegisterActions } from './modules/PanelRegisterActions';
import './PanelRegistration.scss';
import Header from '../Header/Header';

interface ContainerProps {
    history: any;
    location: any;
}
interface ContainerState {
    panelRegister: any;
    formIsValid: boolean;
    loading: boolean;
    showToast: boolean;
    toastMsg: string;
    EventDetailsList: any;
    searchedText: any;
    clientName: any,
    clientId:any;
    showUserModal: boolean;
    userList: any
}

const inputField = {
    value: '',
    validation: {
        required: true
    },
    valid: false
};

const panelForm = {
    eventName: inputField,
}

class PanelRegistration extends React.Component<ContainerProps, ContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formIsValid: false,
            loading: false,
            showToast: false,
            toastMsg: '',
            EventDetailsList: [],
            userList: [],
            clientName: '',
            panelRegister: { ...panelForm },
            searchedText: '',
            clientId:'',
            showUserModal: false,
        }
    }

    componentDidMount() {
        this.getEventList();
    }


    getEventList = async () => {
        try {
            const response = await clients.eventList.get('');
            this.setState({ EventDetailsList: response.data.arrRes });
        }
        catch (error) {
            return (error.response);
        }
    }


    checkValidity(inputValue: any, rules: any, inputType: any) {
        let value = '';
        if (inputValue) value = inputValue.toString();
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    eventFieldChange = (e: any) => {
        var id = e.target.value, clientName='',clientId='',userList= Array()
        const targetName: string = e.target.name;
        const targetValue: string = id;
        const targetType: string = e.target.type;
        const updatedCandidateForm = {
            ...this.state.panelRegister
        };
        const updatedFormElement = {
            ...updatedCandidateForm[targetName]
        };
        updatedFormElement.value = targetValue;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType);
        updatedCandidateForm[targetName] = updatedFormElement;
        const reqObj = {
            eventId: id
        }
        PanelRegisterActions.geClientDetailsById(reqObj).then((response: any) => {
            clientId=response.arrRes[0].ClientId
            clientName = response.arrRes[0].ClientName
            PanelRegisterActions.getPanelList(reqObj).then((res: any) => {
                 if (res.errCode === 200) {
                   userList=res.arrRes 
                }
                 let formIsValid = true;
                 for (let inputIdentifier in updatedCandidateForm) {
                     formIsValid = updatedCandidateForm[inputIdentifier].valid && formIsValid;
                 }
                this.setState({ panelRegister: updatedCandidateForm, formIsValid, clientName: clientName,clientId:clientId,userList:userList});
            })

        })
    }


    submitPanel = () => {
        if (this.state.userList.length !== 0) {
            this.submitPanelReg()
        }
        else {
            this.setState({
                loading: false,
                showToast: true,
                toastMsg: 'Please Select User'
            })
        }
    }

    submitPanelReg = () => {
        const user_id = sessionStorage.getItem("user_id")
        const formData: any = {};
        const { panelRegister } = this.state;
        const resetRegisterPanel = {
            ...panelRegister
        };
        for (let inputIdentifier in resetRegisterPanel) {
            formData[inputIdentifier] = resetRegisterPanel[inputIdentifier].value;
            resetRegisterPanel[inputIdentifier].value = '';
            resetRegisterPanel[inputIdentifier].valid = false;
        }
        const userList = this.state.userList.map((list: any) => {
            return list.user_id;
        })
        var dateTime = new Date()
        var date = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
        const reqObj = {
            ClientId: this.state.clientId,
            EventId: formData.eventName,
            UserID: userList,
            CreatedDate: date,
            CreatedBy: user_id,
            UpdatedBy: user_id,
            UpdatedDate: date,
        }
        this.setState({ loading: true })
        PanelRegisterActions.registerPanel(reqObj).then((response: any) => {
            this.setState({
                panelRegister: { ...resetRegisterPanel },
                loading: false,
                showToast: true,
                userList:[],
                clientName:'',
                clientId:'',
                toastMsg: 'Panel Registered successfully.'
            })

        })
        this.props.history.push('/homePage');
    }

    toastOnDismiss = () => {
        this.setState({ showToast: false });
    }

    goToBack = () => {
        this.props.history.goBack();
    }

    viewUserList = () => {
        this.setState({ showUserModal: true });
    }

    dismissUserModal = (showUserModal: boolean) => {
        this.setState({ showUserModal });
    }

    addUser = (data: any) => {
        this.setState({ userList: data, showUserModal: false });
    }

    removeUser = (e: any) => {
        this.setState({
            userList: this.state.userList.filter(function (val: any) { return val.user_id !== e.user_id })
        })
    }





    render() {
        const { userList, formIsValid, loading, toastMsg, showToast, panelRegister, EventDetailsList, showUserModal, clientName } = this.state;
        if (sessionStorage.getItem('isAdmin') === null) {
            return (<Redirect to="/home" />);
        }
        else {
            return (
                <IonPage className='panelRegContainer'>
                    <Header headerName="Panel Registration" showBackBtn={true} isAdminStatus={this.props} />
                    <IonContent>
                        <IonList>
                            <IonItem>
                                <IonLabel> Event</IonLabel>
                                <IonSelect name='eventName' value={panelRegister.eventName.value} onIonChange={this.eventFieldChange}>
                                    {EventDetailsList.map((list: any) =>
                                        <IonSelectOption key={list.EventId} value={list.EventId}>{list.Name}</IonSelectOption>
                                    )}
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                                <IonLabel className='ionLabel' position="fixed"> Client</IonLabel>
                                <IonInput
                                    inputmode='text'
                                    name='addSkill'
                                    value={clientName}
                                    disabled
                                />

                            </IonItem>
                            <IonItem>
                                <div className='organizerwrapper' >
                                    <IonButton className='appButton' onClick={this.viewUserList}>User
                       <IonIcon icon={addOutline} /> </IonButton>
                                </div>
                            </IonItem>
                            {userList.map((list: any) =>
                                <IonItem key={list.user_id}>
                                    <IonLabel><h3>{list.first_name} {list.last_name}</h3></IonLabel>
                                    <IonIcon icon={trashOutline} color="danger" onClick={() => this.removeUser(list)} />
                                </IonItem>)}
                        </IonList>
                    </IonContent>
                    <IonLoading
                        isOpen={loading}
                        message={'Please wait...'}
                    />

                    <div className='panelRegCntrlPanel'>
                        {/* <IonButton className='appButton' onClick={this.goToBack}>Back</IonButton> */}
                        <IonButton className='appButton' disabled={!formIsValid} onClick={this.submitPanel}>Submit</IonButton>
                    </div>
                    <AddUser showModal={showUserModal} dismissModal={this.dismissUserModal} addUser={this.addUser} userList={userList} />
                    <IonToast
                        isOpen={showToast}
                        message={toastMsg}
                        onDidDismiss={this.toastOnDismiss}
                        duration={1000}
                        cssClass='toastMessage'
                    />
                </IonPage>
            );
        }
    }
}

export default PanelRegistration;
