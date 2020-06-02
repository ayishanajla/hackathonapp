import React from 'react';
import { Redirect } from 'react-router-dom'
import {
  IonContent, IonPage, IonItem, IonList, IonLabel, IonInput, IonButton, IonLoading,
  IonToast, IonSelect, IonSelectOption, IonFabButton, IonFab, IonIcon
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import clients from '../../common/clients';
import SkillListMenu from '../../components/commonUI/SkillListMenu';
import LevelOfAssessment from '../../components/commonUI/LevelOfAssessment';
import AssessingParameter from '../../components/commonUI/AssessingParameter';
import CompetancyMenu from '../../components/commonUI/Compentency'
import DateTime from '../../components/commonUI/DateTime';
import Duration from '../../components/commonUI/Duration';
import EventLocation from '../../components/commonUI/EventLocation';
import AddClient from './AddClient';
import AddOrganizer from './AddOrganizer';
import { RegisterEventActions } from './modules/RegisterEventActions';
import './RegisterEvent.scss';
import { add, trashOutline,pencil,closeOutline } from 'ionicons/icons';
import Header from '../Header/Header';

interface ContainerProps {
  history: any;
}
interface ContainerState {
  registerEvent: any;
  updatedEvent:any;
  formIsValid: boolean;
  loading: boolean;
  showToast: boolean;
  toastMsg: string;
  clientDetailsList: any;
  showModal: boolean;
  showOrgnizerModal: boolean;
  organizerList: any;
  updatedOrganizerList:any;
  deleteAlert: boolean;
  eventAssigned: boolean,
  eventId: any,
  selectedLevel: any,
  EventDetailsList: any,
  eventSkillList: any;
  edit:boolean;

}


const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};

const regEventForm = {
  eventName: inputField,
  eventLocation: inputField,
  clientName: inputField,
  date: inputField,
  duration: inputField,
  skillset: inputField,
  competancy:inputField,
  assessmentLevel: inputField,
  assessingParameter: inputField
}

class RegisterEvent extends React.Component<ContainerProps, ContainerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      registerEvent: { ...regEventForm },
      updatedEvent:{},
      formIsValid: false,
      loading: false,
      showToast: false,
      toastMsg: '',
      clientDetailsList: [],
      EventDetailsList: [],
      organizerList: [],
      showModal: false,
      showOrgnizerModal: false,
      deleteAlert: false,
      eventAssigned: false,
      eventId: '',
      selectedLevel: [],
      eventSkillList: [],
      updatedOrganizerList:[],
      edit:false

    }
  }

  componentDidMount() {
    this.geUserEventList();
    this.geClientDetailsList();
  }


  geClientDetailsList = async () => {
    
    try {
      const response = await clients.clientDetailsList.get('');
      this.setState({ clientDetailsList: response.data.arrRes });
    }
    catch (error) {
      return (error.response);
    }
  }

  geUserEventList =async () => {
    const req = { 'UserID': sessionStorage.getItem("user_id") };
    RegisterEventActions.getEventByUser(req).then((response: any) => {
      var assessmentScale = Array()
      if (response.arrRes && response.arrRes.length > 0) {
        const myObject = response.arrRes[0];
        const eventList = response.arrRes
        if(myObject){
          const assessingParameter = myObject.OtherAssessmentData.map((list: any) => {
            return list.OtherAssessmentId;
          })
        const competancyList = myObject.CompetancyData.map((list: any) => {
          return list.compentancyID;
        })
        const assessmentLevel=myObject.AssessmentScale.length-2
        const updatedFormElement = {
          eventName: { value: myObject.Name, validation: { required: true }, valid: false },
          eventLocation: { value: myObject.Location, validation: { required: true }, valid: false },
          clientName: { value: myObject.Client, validation: { required: true }, valid: false },
          date: { value: myObject.EventDate, validation: { required: true }, valid: false },
          duration: { value: myObject.Duration, validation: { required: true }, valid: false },
          skillset: { value: myObject.Skills.map((list: any) => list.trim()), validation: { required: true }, valid: false },
          competancy: { value: competancyList.map((list: any) => list.trim()), validation: { required: true }, valid: false },
          assessmentLevel: { value: assessmentLevel.toString(), validation: { required: true }, valid: false },
          assessingParameter: { value: assessingParameter, validation: { required: true }, valid: false }
        }
        myObject.AssessmentScale.map((list: any, index: any) => assessmentScale.push({ id: index, value: list, checked: true }));
        this.setState({ registerEvent: updatedFormElement, eventAssigned: true, eventId: myObject.EventId, organizerList: myObject.Organisers, EventDetailsList: eventList, selectedLevel:assessmentScale })
      }
    }
    })
  }



  checkValidity(inputValue: any, rules: any) {
    const value = inputValue.toString();
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

  onEventChange = (e: any) => {
    this.inputFieldChange(e);
  }

  eventFieldChange = (e: any) => {
    const myObject =e.target.value
    var assessmentScale = Array()
     const assessingParameter = myObject.OtherAssessmentData.map((list: any) => {
          return list.OtherAssessmentId;
        })
    const competancyList = myObject.CompetancyData.map((list: any) => {
      return list.compentancyID;
    })
    const assessmentLevel=myObject.AssessmentScale.length-2
    const updatedFormElement = {
      eventName: { value: myObject.Name, validation: { required: true }, valid: false },
      eventLocation: { value: myObject.Location, validation: { required: true }, valid: false },
      clientName: { value: myObject.Client, validation: { required: true }, valid: false },
      date: { value: myObject.EventDate, validation: { required: true }, valid: false },
      duration: { value: myObject.Duration, validation: { required: true }, valid: false },
      skillset: { value: myObject.Skills.map((list: any) => list.trim()), validation: { required: true }, valid: false },
      competancy: { value: competancyList.map((list: any) => list.trim()), validation: { required: true }, valid: false },
      assessmentLevel: { value: assessmentLevel.toString(), validation: { required: true }, valid: false },
      assessingParameter: { value: assessingParameter, validation: { required: true }, valid: false }
    }
    myObject.AssessmentScale.map((list: any, index: any) => assessmentScale.push({ id: index, value: list, checked: true }));
    this.setState({ registerEvent: updatedFormElement, eventAssigned: true, eventId: myObject.EventId,organizerList: myObject.Organisers,selectedLevel:assessmentScale})
  }

  inputFieldChange = (e: any) => {
    const targetName: string = e.target.name;
    const targetValue: string = e.target.value;
    const updatedRegForm = {
      ...this.state.registerEvent
    };
    const updatedFormElement = {
      ...updatedRegForm[targetName]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedRegForm[targetName] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedRegForm) {
      formIsValid = updatedRegForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ registerEvent: updatedRegForm, formIsValid });
  }

  submitEvent = () => {
    if (this.state.organizerList.length !== 0) {
      this.submitEventReg()
    }
    else {
      this.setState({
        loading: false,
        showToast: true,
        toastMsg: 'Please Select Organizer'
      })
    }
  }

  submitEventReg = () => {
    const user_id = sessionStorage.getItem("user_id")
    const formData: any = {};
    const { registerEvent } = this.state;
    const resetRegisterEvent = {
      ...registerEvent
    };
    for (let inputIdentifier in resetRegisterEvent) {
      formData[inputIdentifier] = resetRegisterEvent[inputIdentifier].value;
      resetRegisterEvent[inputIdentifier].value = '';
      resetRegisterEvent[inputIdentifier].valid = false;
    }
    const organizerList = this.state.organizerList.map((list: any) => {
      return list.user_id;
    })
    this.setState({ loading: true });
    const assessmentLevel = [];
    for (let i = 0; i < Number(formData.assessmentLevel) + 2; i++) {
      assessmentLevel.push(
        i === (Number(formData.assessmentLevel) + 1) ? 'Final Assessment' : `Sprint ${i}`,
      );
    }
    const eventdate = new Date(formData.date);
    const eventTime = eventdate.toLocaleTimeString();
    const eventdateFormat = `${eventdate.getFullYear()}-${eventdate.getMonth() + 1}-${eventdate.getDate()}`
    // const dateTime = new Date();
    // const date = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
    let reqObj = {
      EventName: formData.eventName,
      Location: formData.eventLocation,
      Client: formData.clientName,
      eventdate: `${eventdateFormat} ${eventTime}`,
      Duration: formData.duration,
      Skills: formData.skillset,
      CompetancyLevelData:formData.competancy,
      AssessmentScale: assessmentLevel,
      ProblemSolvingSkillTested: false,
      OtherAssessmentData:formData.assessingParameter,
      OrganizerData: organizerList,
      CreatedBy: user_id,
      UpdatedBy: user_id
    }
    if (!this.state.edit) {
      RegisterEventActions.registerEvent(reqObj).then((response: any) => {
        this.setState({
          registerEvent: { ...resetRegisterEvent },
          organizerList: [],
          loading: false,
          showToast: true,
          showOrgnizerModal: false,
          toastMsg: 'Event Registered successfully.'
        })
        this.componentDidMount()
        this.props.history.push('/homePage');
      })
    }
    else {
      var pair = { EventId:this.state.eventId  }
      reqObj = { ...reqObj, ...pair }
      RegisterEventActions.editEvent(reqObj).then((response: any) => {
        this.setState({
          registerEvent: { ...resetRegisterEvent },
          organizerList: [],
          loading: false,
          showToast: true,
          showOrgnizerModal: false,
          toastMsg: 'Event updated successfully.'
        })
        this.componentDidMount()
        this.props.history.push('/homePage');
      })
    }
  }


  toastOnDismiss = () => {
    this.setState({ showToast: false });
  }

  goToBack = () => {
    this.props.history.goBack();
  }

  addClient = () => {
    this.setState({ showModal: true });
  }
  vieworganizer = () => {
    this.setState({ showOrgnizerModal: true });
  }
  addorganizer = (data: any) => {
  //  console.log(data)
    this.setState({ organizerList: data, showOrgnizerModal: false });
  }

  addEvent = () => {
    const formData: any = {};
    const { registerEvent } = this.state;
    const resetRegisterEvent = {
      ...registerEvent
    };
    for (let inputIdentifier in resetRegisterEvent) {
      formData[inputIdentifier] = resetRegisterEvent[inputIdentifier].value;
      resetRegisterEvent[inputIdentifier].value = '';
      resetRegisterEvent[inputIdentifier].valid = false;
      this.setState({ eventAssigned: false, registerEvent: { ...resetRegisterEvent },organizerList:[],selectedLevel:[] })
    }
  }

  editevent=()=>{
     const RegForm = {
      ...this.state.registerEvent
    };
    const updatedRegForm = {...this.state.registerEvent};
     for (let inputIdentifier in RegForm) {
    const targetName: string = inputIdentifier;
    const targetValue: string = RegForm[inputIdentifier].value
     const updatedFormElement = {
      ...updatedRegForm[targetName]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedRegForm[targetName] = updatedFormElement;
  }
  let formIsValid = true;
    for (let inputIdentifier in updatedRegForm) {
      formIsValid = updatedRegForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ registerEvent: updatedRegForm,updatedEvent:RegForm, formIsValid,eventAssigned:false,edit:true,updatedOrganizerList:this.state.organizerList });
  }

  clearChanges=()=>{
    this.setState({registerEvent:this.state.updatedEvent,organizerList:this.state.updatedOrganizerList,eventAssigned:true, edit: false})
  }

  // showAlert = () => {
  //   this.setState({ deleteAlert: !this.state.deleteAlert });
  // }

  // closeEvent = () => {
  //   const formData: any = {};
  //   const { registerEvent } = this.state;
  //   const resetRegisterEvent = {
  //     ...registerEvent
  //   };
  //   for (let inputIdentifier in resetRegisterEvent) {
  //     formData[inputIdentifier] = resetRegisterEvent[inputIdentifier].value;
  //     resetRegisterEvent[inputIdentifier].value = '';
  //     resetRegisterEvent[inputIdentifier].valid = false;
  //   }
  //   var req = { EventID: this.state.eventId }
  //   RegisterEventActions.closeEvent(req).then((response: any) => {
  //     this.setState({ eventAssigned: false, registerEvent: { ...resetRegisterEvent, toastMsg: 'Event Closed successfully.', showToast: true } })
  //   })

  // }

  removeOrganizer = (e: any) => {
    this.setState({
      organizerList: this.state.organizerList.filter(function (val: any) { return val.user_id !== e.user_id })
    })
  }

  dismissModal = (showModal: boolean) => {
    this.geClientDetailsList();
    this.setState({ showModal });
  }

  dismissOrganizerModal = (showOrgnizerModal: boolean) => {
    this.setState({ showOrgnizerModal });
  }
  onEventListChange = (e: any, selectedEvent: any) => {
    if (selectedEvent) {
      this.inputFieldChange(e);
      const setEventDate = {
        target: {
          name: 'date',
          value: selectedEvent.EventDate
        }
      }
      const eventSkill = selectedEvent.Skills.map((list: any) => list.trim());
      this.setState({ eventSkillList: eventSkill });
      this.inputFieldChange(setEventDate);
    }

  }
  render() {
    const { registerEvent, formIsValid, loading, showToast, toastMsg, showModal, showOrgnizerModal, organizerList, eventAssigned, selectedLevel,edit } = this.state;
    if (sessionStorage.getItem('isAdmin') === null) {
      return (<Redirect to="/home" />);
    }
    else {
      return (
        <IonPage className='eventRegContainer'>
          <Header headerName="Event Registration" showBackBtn={true} isAdminStatus={this.props} />
          <IonContent>
            <IonList>
              <IonItem>
              <IonLabel position="fixed">Event Name</IonLabel>
              {!eventAssigned ? 
                <IonInput
                  inputmode='text'
                  name='eventName'
                  value={registerEvent.eventName.value}
                  onIonChange={this.inputFieldChange}
                  required
                />
               :
                <IonSelect slot="end" name='clientName'  placeholder={registerEvent.eventName.value}  onIonChange={this.eventFieldChange}>
                  {this.state.EventDetailsList.map((list: any) =>
                    <IonSelectOption key={list.EventId} value={list}>{list.Name}</IonSelectOption>
                  )}
                </IonSelect>
                }
                </IonItem>
              <IonItem disabled={eventAssigned}>
                <EventLocation selectedValue={registerEvent.eventLocation.value} onEventChange={this.onEventChange} />
              </IonItem>
              <IonItem>
                <div className='clientwrapper'>
                  <IonLabel className='clientLabel'>Client Name </IonLabel>
                </div>
                {/* <IonButton className='addClientBtn' onClick={this.addClient} fill="clear" color="dark"><IonIcon icon={addOutline} /></IonButton> */}

                <IonSelect slot="end" name='clientName' value={registerEvent.clientName.value} placeholder="Select Client Name" disabled={eventAssigned} onIonChange={this.inputFieldChange}>
                  {this.state.clientDetailsList.map((list: any) =>
                    <IonSelectOption key={list.ClientId} value={list.ClientId}>{list.ClientName}</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>
              <IonItem disabled={eventAssigned}><DateTime disabledField={false} selectedValue={registerEvent.date.value} onEventChange={this.onEventChange} /></IonItem>
              <IonItem disabled={eventAssigned}><Duration selectedValue={registerEvent.duration.value} onEventChange={this.onEventChange} /></IonItem>
              <SkillListMenu eventDisabled={eventAssigned} isCandidateSkill={false} eventSkillList={[]} selectedValue={registerEvent.skillset.value} showSkillChips={true} onEventChange={this.onEventChange} />
              <CompetancyMenu eventDisabled={eventAssigned} isCompentency={false}  eventcompentencyList={[]} selectedValue={registerEvent.competancy.value} showCompentencyChips={true} onEventChange={this.onEventChange} />
              <LevelOfAssessment disabled={eventAssigned} selectedValue={registerEvent.assessmentLevel.value} onEventChange={this.onEventChange} selected={selectedLevel} />
              <IonItem disabled={eventAssigned} ><AssessingParameter selectedValue={registerEvent.assessingParameter.value} onEventChange={this.onEventChange} /></IonItem>
              <IonItem>
                <div className='organizerwrapper' >
                  <IonButton disabled={eventAssigned} className='appButton' onClick={this.vieworganizer}>Organizer
                <IonIcon icon={addOutline} /> </IonButton>
                </div>
              </IonItem>
              {organizerList.map((list: any) =>
                <IonItem disabled={eventAssigned} key={list.user_id}>
                  <IonLabel><h3>{list.first_name}{list.last_name}</h3></IonLabel>
                  <IonIcon icon={trashOutline} color="danger"  onClick={() => this.removeOrganizer(list)} />
                </IonItem>)}
            </IonList>
            <div className='eventRegCntrlPanel'>
              {/* <IonButton className='appButton' onClick={this.goToBack}>Back</IonButton> */}
              <IonButton className='appButton' disabled={!formIsValid} onClick={this.submitEvent}>Submit</IonButton>
            </div>
            <IonFab className="editButton" vertical="bottom"  slot="fixed">
              <IonFabButton size="small" color={edit ? "danger" : "primary"}>
                {!edit?
                <IonIcon icon={pencil} onClick={this.editevent} />:
                <IonIcon icon={closeOutline} onClick={this.clearChanges} />}
              </IonFabButton>
            </IonFab>
            <IonFab className="addbutton" vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton size="small" >
                <IonIcon icon={add} onClick={this.addEvent} />
              </IonFabButton>
            </IonFab>
          </IonContent>
          <AddClient showModal={showModal} dismissModal={this.dismissModal} />
          <AddOrganizer showModal={showOrgnizerModal} dismissModal={this.dismissOrganizerModal} selectedUsers={this.state.organizerList} addorganizer={this.addorganizer} />
          <IonLoading
            isOpen={loading}
            message={'Please wait...'}
          />
          <IonToast
            isOpen={showToast}
            message={toastMsg}
            onDidDismiss={this.toastOnDismiss}
            duration={1000}
            cssClass='toastMessage'
          />
          {/* <IonAlert
            isOpen={deleteAlert}
            onDidDismiss={() => this.showAlert()}
            header={'Are you Sure You Want to Delete The Event!'}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
              },
              {
                text: 'Yes',
                handler: () => {
                  this.closeEvent()
                }
              }
            ]}
          /> */}

        </IonPage>
      );
    }
  }
}

export default RegisterEvent;