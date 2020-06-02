import React from 'react';
import {
    IonContent, IonHeader, IonLabel, IonSearchbar, IonItem, IonList, IonButtons, IonCheckbox, IonButton, IonLoading, IonIcon, IonModal, IonToolbar
} from '@ionic/react';
import { PanelRegisterActions } from './modules/PanelRegisterActions';
import './PanelRegistration.scss';
import { close } from 'ionicons/icons';

interface ContainerProps {
    dismissModal: any;
    showModal: boolean;
    addUser: any
    userList:any;
}

interface ContainerState {
    showModal: boolean;
    clientName: string;
    errMsg: boolean;
    loading: boolean;
    users: any;
    search: any;
    selectedUsers: any

}

class AddUser extends React.Component<ContainerProps, ContainerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showModal: props.showModal,
            clientName: '',
            search: '',
            errMsg: false,
            loading: false,
            users: [],
            selectedUsers: props.userList
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.showModal !== this.state.showModal) {
            this.setState({ showModal: nextProps.showModal,selectedUsers:nextProps.userList });
        }
    }

    setShowModal = (showModal: boolean) => {
        this.props.dismissModal(showModal);
        this.setState({ showModal });
    }

    modalOnDidDismiss = (showModal: boolean) => {
        this.setState({ showModal, users: [], search: '' });
    }

    searchUsers = (e: any) => {
        var value = e.target.value
        if (value.length >= 3) {
            const req = { 'searchData': value }
            PanelRegisterActions.getUserBySearch(req).then((res: any) => {
                this.setState({
                   loading:false, users: res.userList, search: value
                })
            })
        
        }
        if (value.length === 0) {
            this.setState({ users: [], search: value })
        }
    }

    handleUserCheckClick = (e: any) => {
        if (e.target.checked) {
            //append to array
            this.setState({
                selectedUsers: this.state.selectedUsers.concat([e.target.value])
            })
        }
        else {
            //remove from array
            this.setState({
                selectedUsers: this.state.selectedUsers.filter(function (val: any) { return val.ID !== e.target.value.ID })
            })
        }
    }

    submitClientDetails = () => {
        this.modalOnDidDismiss(false)
        this.props.addUser(this.state.selectedUsers)

    }

    render() {
        const { showModal, loading, search, users, selectedUsers } = this.state;

        return (
            <div className="organizerModel">
                <IonModal
                    isOpen={showModal}
                    cssClass='modalContent organizerModel'
                    onDidDismiss={() => this.modalOnDidDismiss(false)}
                >
                    <IonHeader translucent>
                        <IonToolbar className="model_title" color="primary">Add Users
                        <IonButtons slot="end">
                                <IonButton onClick={() => this.setShowModal(false)}>
                                    <IonIcon icon={close} />
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent fullscreen>
                        <IonList>
                            <IonItem>
                                <IonToolbar>
                                    <IonSearchbar placeholder="Search Users" onIonChange={this.searchUsers} value={search} ></IonSearchbar>
                                </IonToolbar>
                            </IonItem>
                            {users.map((list: any) =>
                                <IonItem key={list.user_id}>
                                    <IonLabel>
                                        {list.first_name} {list.last_name}
                                    </IonLabel>
                                    {selectedUsers.some((data: any) => data.user_id === list.user_id) ?
                                        <IonCheckbox name="selectedUserList" checked={true} value={list} onClick={this.handleUserCheckClick} />
                                        : <IonCheckbox name="selectedUserList" checked={false} value={list} onClick={this.handleUserCheckClick} />
                                    }
                                </IonItem>
                            )}
                        </IonList>
                        <div className='modalBtn'>
                            <IonButton className='' onClick={this.submitClientDetails}>Submit</IonButton>
                        </div>
                    </IonContent>
                    <IonLoading
                        isOpen={loading}
                        message={'Please wait...'}
                    />
                </IonModal>
            </div>
        )
    }

}

export default AddUser;
