import React from 'react';
import {
  IonContent, IonHeader, IonItem, IonLabel, IonInput, IonButtons, IonButton, IonLoading, IonIcon, IonModal, IonToolbar, IonToast
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { RegisterNewActions } from './modules/RegisterNewActions';
interface ContainerProps {
  dismissModal: any;
  showModal: boolean;
  name: any
}

interface ContainerState {
  showModal: boolean;
  paramName: string;
  ParamValue:string;
  errMsg: boolean;
  showLoading: boolean;
  showToast: boolean;
  toastMsg: string;

}

class AddModel extends React.Component<ContainerProps, ContainerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      showModal: props.showModal,
      paramName: '',
      ParamValue:'',
      errMsg: false,
      showToast: false,
      showLoading: false,
      toastMsg: ''

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
    this.setState({ showModal, errMsg: false });
    this.props.dismissModal(showModal);
  }

  inputFieldChange = (e: any) => {
    this.setState({ paramName: e.target.value });
  }

  inputParamValueChange= (e: any) => {
    this.setState({ ParamValue: e.target.value });
  }


  
  submitDetails = () => {
    if (this.state.paramName !== '') {
      this.setState({ showLoading: true });
      const user_id = sessionStorage.getItem("user_id")
      if (this.props.name == "Competancy") {
        const user_id = sessionStorage.getItem("user_id")
        const data = {
          CompetancyName: this.state.paramName,
          CreatedBy: user_id
        }
        RegisterNewActions.addCompetancyDetails(data).then((response: any) => {
          this.props.dismissModal(false);
          this.setState({ errMsg: false, showModal: false, paramName: '', showLoading: false });
        });
      }
    
      if (this.props.name == "Client") {
        const data = {
          ClientName: this.state.paramName,
          ClientStatus: 1
        }
        RegisterNewActions.addClientDetails(data).then((response: any) => {
          this.props.dismissModal(false);
          this.setState({ errMsg: false, showModal: false, paramName: '', showLoading: false });
        });
      }

      if (this.props.name == "Skill") {
        const data = {
          skillName: this.state.paramName,
        }
        RegisterNewActions.addSkillDetails(data).then((response: any) => {
          this.props.dismissModal(false);
          this.setState({ errMsg: false, showModal: false, paramName: '', showLoading: false });
        });
      }

      if (this.props.name == "Location") {
        navigator.geolocation.getCurrentPosition((position) => {
          const data = {
            LocName: this.state.paramName,
            LocLatitude: position.coords.latitude,
            LocLongitude: position.coords.longitude,
            CreatedBy: 1
          }
          RegisterNewActions.addNewLocation(data).then((response: any) => {
            console.log(response);
              if (response.errCode === 200) {
                this.setState({ errMsg: false, showModal: false, paramName: '', showLoading: false,toastMsg:"Saved Sucessfully",showToast: false });
                this.props.dismissModal(false);

              }
          });
        });

      }

      if (this.props.name == "Assessment") {
        const data = {
          AssessName: this.state.paramName,
          AssessValue: this.state.ParamValue,
          createdBy:user_id,
        }
        RegisterNewActions.addAssessment(data).then((response: any) => {
          this.props.dismissModal(false);
          this.setState({ errMsg: false, showModal: false, paramName: '', showLoading: false });
        });
      }

    }
    else {
      this.setState({ errMsg: true });
    }
  }

  toastOnDismiss = () => {
    this.setState({ showToast: false });
  }

  render() {
    const { showModal, paramName, errMsg, showToast, toastMsg,ParamValue } = this.state;
    const { name } = this.props
    return (
      <IonModal
        isOpen={showModal}
        cssClass='modalContent'
        animated={false}
        onDidDismiss={() => this.modalOnDidDismiss(false)}
      >
        <IonHeader translucent>
          <IonToolbar className="model_title" color="primary">Add {name}
            <IonButtons slot="end">
              <IonButton onClick={() => this.setShowModal(false)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonItem>
            <IonLabel position="floating">{name} Name</IonLabel>
            <IonInput
              inputmode='text'
              name={name}
              value={paramName}
              onIonChange={this.inputFieldChange}
              required
            />
          </IonItem>
          {name=="Assessment"&&
          <IonItem>
            <IonLabel position="floating"> Value</IonLabel>
            <IonInput
              inputmode='text'
              value={ParamValue}
              onIonChange={this.inputParamValueChange}
              required
            />
          </IonItem>}
          {errMsg &&
            <p className='errMsg'>Please enter the {name} name.</p>
          }
          <div className='modalBtn'>
            <IonButton onClick={this.submitDetails}>Submit</IonButton>
          </div>
        </IonContent>
        <IonLoading
          isOpen={this.state.showLoading}
          onDidDismiss={() => this.setState({ showLoading: false })}
          message={'Please wait...'}
        />
        <IonToast
          isOpen={showToast}
          message={toastMsg}
          onDidDismiss={this.toastOnDismiss}
          duration={2000}
          cssClass='toastMessage'
        />
      </IonModal>
    )
  }

}

export default AddModel;
