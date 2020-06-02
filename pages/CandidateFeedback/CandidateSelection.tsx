import React from 'react';
import { Redirect } from 'react-router-dom';
import { IonPage, IonList, IonContent, IonSelect, IonSelectOption, IonLabel, IonButton, IonItem } from '@ionic/react';
import { connect } from 'react-redux';
import { CandidateFBActions } from './modules/CandidateFBActions';
import clients from '../../common/clients';
import './CandidateFeedback.scss';
import Header from '../Header/Header';
interface ContainerProps {
  history: any;
  location: any;
  match: any;
  setCandidateSelection: any;
}

interface ContainerState {
  candidateSelection: any;
  formIsValid: boolean;
  loading: boolean;
  eventList: any;
  squadList: any;
  candidateList: any;
  sprintList: any;
}

const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};

const candidateInputField = {
  value: '',
  validation: {
    required: false
  },
  valid: true
};

const candidateForm = {
  eventName: inputField,
  squadName: inputField,
  sprintName: inputField,
  candidateName: candidateInputField,
}

class CandidateSelection extends React.Component<ContainerProps, ContainerState> {
  squadList: never[];
  constructor(props: any) {
    super(props);
    this.state = {
      formIsValid: false,
      loading: false,
      eventList: [],
      squadList: [],
      candidateList: [],
      sprintList: [],
      candidateSelection: { ...candidateForm }
    }

    this.squadList = [];
  }

  componentDidMount() {
    this.getEventList();
    this.getSquadList();
  }

  getEventList = async () => {
    try {
      const response = await clients.eventList.get('');
      this.setState({ eventList: response.data.arrRes });
    }
    catch (error) {
      return (error.response);
    }
  }

  getSquadList = async () => {
    try {
      const response = await clients.squadList.get('');
      this.squadList = response.data.arrRes;
      // this.setState({ squadList: response.data.arrRes });
    }
    catch (error) {
      return (error.response);
    }
  }

  onEventListChange = (e: any) => {
    const { eventList } = this.state;
    this.inputFieldChange(e);
    const selectedEventArr = eventList.find((list: any) => list.Name === e.target.value);
    const squadListArr = this.squadList.filter((list: any) => list.EventID === selectedEventArr.EventId);
    const sprintDetails = selectedEventArr.AssessmentScale.filter((list: any) => list.trim() && list !== '');
    const foundIndex = sprintDetails.findIndex((item: any) => item === "Final Assessment");
    sprintDetails[foundIndex] = 'Show and Tell assesment';
    if (sessionStorage.getItem('isAdmin') === 'true') {
      sprintDetails.push('Final Assessment');
    }
    this.setState({ squadList: squadListArr, sprintList: sprintDetails });
  }

  onSquadListChange = (e: any) => {
    this.candidateList(e.target.value);
    this.inputFieldChange(e);
  }

  candidateList = (squadId: string) => {
    const reqObj = {
      squad_id: squadId
    }
    CandidateFBActions.squadCandidateList(reqObj).then((response: any) => {
      if (response) {
        this.setState({ loading: false, candidateList: response.arrRes });
      } else {
        this.setState({ loading: false, candidateList: [] });
      }
    });
  }

  onCandidateChange = (e: any) => {
    this.inputFieldChange(e);
  }

  onSprintChange = (e: any) => {
    this.inputFieldChange(e);
  }

  checkValidity(inputValue: any, rules: any) {
    let value = '';
    if (inputValue) value = inputValue.toString();
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  }

  goToFeedback = () => {
    const { candidateList, candidateSelection, squadList, eventList } = this.state;
    const selectedEventArr = eventList.find((list: any) => list.Name === candidateSelection.eventName.value);
    const details = {
      candidateList: candidateList,
      candidateSelection: candidateSelection,
      squadList: squadList,
      eventDetails: selectedEventArr
    }
    this.props.setCandidateSelection(details);
    this.props.history.push('/candidateFeedback');
  }

  inputFieldChange = (e: any) => {
    const targetName: string = e.target.name;
    const targetValue: string = e.target.value;
    const updatedCandidateForm = {
      ...this.state.candidateSelection
    };
    const updatedFormElement = {
      ...updatedCandidateForm[targetName]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedCandidateForm[targetName] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedCandidateForm) {
      formIsValid = updatedCandidateForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ candidateSelection: updatedCandidateForm, formIsValid });
  }

  goToHome = () => {
    this.props.history.push('/homePage');
  }

  render() {
    const { formIsValid, squadList, sprintList, eventList, candidateList } = this.state;
    if (sessionStorage.getItem('isAdmin') === null) {
      return (<Redirect to="/home" />);
    }
    else {
      return (
        <IonPage className='feedbackContainer'>
          <Header headerName="Candidate Feedback" showBackBtn={true} isAdminStatus={this.props} />
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel>Event</IonLabel>
                <IonSelect className='eventList' name='eventName' onIonChange={this.onEventListChange} placeholder="Event Name">
                  {eventList.map((item: any) =>
                    <IonSelectOption key={item.Name} value={item.Name}>{item.Name}</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Squad</IonLabel>
                <IonSelect className='squadList' name='squadName' onIonChange={this.onSquadListChange} placeholder="Squad Name">
                  {squadList.map((item: any) =>
                    <IonSelectOption key={item.ID} value={item.ID}>{item.SquadName}</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Sprint</IonLabel>
                <IonSelect className='sprint' name='sprintName' onIonChange={this.onSprintChange} placeholder="Sprint Level">
                  {sprintList.map((item: any) =>
                    <IonSelectOption key={item} value={item}>{item}</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Candidate Name</IonLabel>
                <IonSelect className='candidateList' name='candidateName' onIonChange={this.onCandidateChange} placeholder="Candidate List">
                  {candidateList.map((item: any, index: number) =>
                    <IonSelectOption key={`${item.EmpName}${index}`} value={item.CandidateID}>{item.EmpName}</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>
            </IonList>
            
            <div className='candidateSelection'>
              <IonButton expand="block" disabled={!formIsValid} className='appButton' onClick={this.goToFeedback}>Proceed</IonButton>
            </div>
          </IonContent>
        </IonPage>
      )
    }
  }

}

const mapStateToProps = (state: any) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCandidateSelection: (data: any) => dispatch(CandidateFBActions.setCandidateSelection(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSelection);