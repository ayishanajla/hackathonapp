import React from 'react';
import {
    IonContent, IonHeader, IonLabel, IonSearchbar, IonItem, IonList, IonButtons, IonCheckbox, IonButton, IonLoading, IonIcon, IonModal, IonToolbar
} from '@ionic/react';
import { RegisterEventActions } from './modules/RegisterEventActions';
import './RegisterEvent.scss';
import { close } from 'ionicons/icons';
import './RegisterEvent.scss';

interface ContainerProps {
    dismissModal: any;
    showModal: boolean;
    addorganizer: any
    selectedUsers:any
}

interface ContainerState {
    showModal: boolean;
    clientName: string;
    errMsg: boolean;
    users: any;
    search: any;
    selectedUsers: any
    loading: boolean;


}

class AddOrganizer extends React.Component<ContainerProps, ContainerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showModal: props.showModal,
            clientName: '',
            search: '',
            errMsg: false,
            users: [],
            selectedUsers: props.selectedUsers,
            loading: false

        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.showModal !== this.state.showModal) {
            this.setState({ showModal: nextProps.showModal,selectedUsers:nextProps.selectedUsers  });
        }
        else{
            this.setState({selectedUsers:this.props.selectedUsers})
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
            // this.setState({loading:true})
            const req = { 'emp_name': value }
            RegisterEventActions.getAdminBySearch(req).then((res: any) => {
                this.setState({
                    users: res.arrRes, search: value,loading:false
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
                selectedUsers: this.state.selectedUsers.filter(function (val: any) { return val.user_id !== e.target.value.user_id })
            })
        }
    }

    submitClientDetails = () => {
        this.modalOnDidDismiss(false)
        this.props.addorganizer(this.state.selectedUsers)
    }

    render() {
        const { showModal, search, users, selectedUsers,loading } = this.state;
        // console.log(selectedUsers)
        return (
            <div className="organizerModel">
                <IonModal
                    isOpen={showModal}
                    cssClass='modalContent organizerModel'
                    onDidDismiss={() => this.modalOnDidDismiss(false)}
                >
                    <IonHeader translucent>
                        <IonToolbar className="model_title" color="primary">Add Organizer
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
                        <IonLoading
            isOpen={loading}
            message={'Please wait...'}
          />
                    </IonContent>
                </IonModal>
            </div>
        )
    }

}

export default AddOrganizer;
