import React from 'react';
import {
    IonContent, IonHeader, IonLabel, IonSearchbar, IonItem, IonList, IonButtons, IonRadioGroup ,IonRadio, IonButton, IonLoading, IonIcon, IonModal, IonToolbar
} from '@ionic/react';
import { CandidateRegisterActions } from './modules/CandidateRegisterActions';
// import './RegisterEvent.scss';
import { close } from 'ionicons/icons';


interface ContainerProps {
    dismissModal: any;
    showModal: boolean;
    selectCandidate:any
    eventId:any;
}

interface ContainerState {
    showModal: boolean;
    errMsg: boolean;
    loading: boolean;
    search: any;
    users: any;
    selectedCandidate:any
}

class SearchCandidate extends React.Component<ContainerProps, ContainerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showModal: props.showModal,
            errMsg: false,
            loading: false,
            search:'',
            users: [],
            selectedCandidate:{}
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.showModal !== this.state.showModal) {
            this.setState({ showModal: nextProps.showModal });
        }
    }

    setShowModal = (showModal: boolean) => {
        this.props.dismissModal(showModal);
        this.setState({ showModal });
    }

    modalOnDidDismiss = (showModal: boolean) => {
        this.setState({ showModal,search: '',users:[] });
    }

    searchCandidate = (e: any) => {
        var value = e.target.value
        if (value.length >= 3) {
            const req = {'searchData': value,EventID:this.props.eventId }
            CandidateRegisterActions.candidateSearch(req).then((res: any) => {
                this.setState({
                    users: res.data, search: value,loading:false
                })
            })
        }
        if (value.length === 0) {
            this.setState({ users: [], search: value })
        }
    }

    handleCandidateList=(e:any)=>{
     const value=JSON.parse(e)
     this.setState({selectedCandidate:value})
    }

    submit = () => {
        this.props.selectCandidate(this.state.selectedCandidate)
    }

    render() {
        const { showModal,loading,search,users } = this.state;
        return (
            <div className="organizerModel">
                <IonModal
                    isOpen={showModal}
                    cssClass='modalContent organizerModel'
                    onDidDismiss={() => this.modalOnDidDismiss(false)}
                >
                    <IonHeader translucent>
                        <IonToolbar className="model_title" color="primary">Search Candidate
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
                                    <IonSearchbar placeholder="Search Candidate" onIonChange={this.searchCandidate} value={search} ></IonSearchbar>
                                </IonToolbar>
                            </IonItem>
                            {users.map((list: any) =>
                                   <IonRadioGroup  key={list.ID} >
                                   <IonItem >
                                       <IonLabel>{list.EmpName}</IonLabel>
                                       <IonRadio slot="start" value={list.EmpName} onClick={() => this.handleCandidateList(JSON.stringify(list))} />
                                   </IonItem>
                               </IonRadioGroup>
                            )}
                            </IonList>
                        <div className='modalBtn'>
                            <IonButton className='' onClick={this.submit}>Submit</IonButton>
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

export default SearchCandidate;
