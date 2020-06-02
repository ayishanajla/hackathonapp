import React from 'react';
import {
  IonContent, IonHeader, IonItem, IonLabel, IonInput, IonButtons, IonButton, IonIcon, IonModal, IonToolbar
} from '@ionic/react';
import { RegisterEventActions } from './modules/RegisterEventActions';
import './RegisterEvent.scss';
import { close } from 'ionicons/icons';

interface ContainerProps {
  dismissModal: any;
  showModal: boolean;
}

interface ContainerState {
  showModal: boolean;
  clientName: string;
  errMsg: boolean;
}

class AddClient extends React.Component<ContainerProps, ContainerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      showModal: props.showModal,
      clientName: '',
      errMsg: false
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if(nextProps.showModal !== this.state.showModal) {
      this.setState({ showModal: nextProps.showModal });
    }
  }

  setShowModal = (showModal: boolean) => {
    this.props.dismissModal(showModal);
    this.setState({ showModal });
  }

  modalOnDidDismiss= (showModal: boolean) => {
    this.setState({ showModal });
  }

  inputFieldChange = (e: any) => {
    this.setState({ clientName: e.target.value });
  }

  submitClientDetails = () => {
    if(this.state.clientName !== '') {
      const data = {
        ClientName: this.state.clientName,
        ClientStatus: 1
      }
      RegisterEventActions.addClientDetails(data).then((response: any) => {
        this.props.dismissModal(false);
        this.setState({ errMsg: false, showModal: false, clientName: '' });
      });
    } else {
      this.setState({ errMsg: true });
    }   
  }

  render() {
    const { showModal, clientName, errMsg } = this.state;
    return (
        <IonModal
          isOpen={showModal}
          cssClass='modalContent'
          onDidDismiss={() => this.modalOnDidDismiss(false)}
        >
          <IonHeader translucent>           
              <IonToolbar className="model_title" color="primary">Add Client
                <IonButtons slot="end">
                  <IonButton onClick={() => this.setShowModal(false)}>
                    <IonIcon icon={close} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>            
          </IonHeader>
          <IonContent fullscreen>
          <IonItem>
            <IonLabel position="floating">Client Name</IonLabel>
            <IonInput
              inputmode='text'
              name='clientName'
              value={clientName}
              onIonChange={this.inputFieldChange}
              required
            />
          </IonItem>
          {errMsg && 
            <p className='errMsg'>Please enter the client name.</p>
          }
          <div className='modalBtn'>
            <IonButton className='appButton' onClick={this.submitClientDetails}>Submit</IonButton>
          </div>
          </IonContent>
        </IonModal>
    )
  }

}

export default AddClient;
