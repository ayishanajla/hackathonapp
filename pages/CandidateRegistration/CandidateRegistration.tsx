import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import {
  IonContent, IonPage, IonList, IonItem, IonLabel, IonInput, IonButton, IonLoading, IonToast, IonToggle, IonAlert, IonSelect,IonIcon 
} from '@ionic/react';
import DateTime from '../../components/commonUI/DateTime';
import { CandidateRegisterActions } from './modules/CandidateRegisterActions';
import SkillListMenu from '../../components/commonUI/SkillListMenu';
import EventList from '../../components/commonUI/EventList';
import Gender from '../../components/commonUI/Gender';
import CandidatePhoto from './CandidatePhoto';
import SearchCandidate from './SearchCandidate'
import {searchOutline} from 'ionicons/icons';
import './CandidateRegistration.scss';

interface ContainerProps {
  history: any;
  location: any;
}
interface ContainerState {
  candidateRegister: any;
  formIsValid: boolean;
  loading: boolean;
  showToast: boolean;
  candidateView:boolean;
  candidateObject:any;
  toastMsg: string;
  toastcolor: string;
  eventSkillList: any;
  checked: boolean;
  imgErr: string; 
  addSkill:string;
  showSearchModal:boolean;
}

const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};

const candidateForm = {
  empId: inputField,
  empName: inputField,
  empContactNo: inputField,
  empEmail: inputField,
  empExp: inputField,
  date: inputField,
  empRelaventExp: inputField,
  eventName: inputField,
  skillset: inputField,
  gender: inputField,
}

class CandidateRegistration extends React.Component<ContainerProps, ContainerState> {
  imageRef: React.RefObject<HTMLDivElement>
  constructor(props: any) {
    super(props);
    this.state = {
      formIsValid: false,
      loading: false,
      showToast: false,
      toastMsg: '',
      toastcolor:"primary",
      eventSkillList: [],
      candidateRegister: { ...candidateForm },
      checked: false,
      candidateView:false,
      candidateObject:{},
      imgErr: '',
      addSkill:'',
      showSearchModal:false

    }
    this.imageRef = React.createRef();

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
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    if (inputType === "email") {
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  onEventChange = (e: any) => {
    this.inputFieldChange(e);
  }
  onGenderChange= (e: any) =>{
    this.inputFieldChange(e);
  }

  contactNoFieldChange=(e:any)=>{
    const value=e.target.value
    const eventId=this.state.candidateRegister.eventName.value
    if(value.length==10){
    if(eventId.length!==0){
      this.validateCandidateNo(e,eventId)
    }
    else{
      this.setState({showToast:true,toastMsg:"please select event",toastcolor:"danger"})
    }
  }
 
  }

  validateCandidateNo=(e:any,eventId:any)=>{
    const contact=this.state.candidateRegister.empContactNo.value
    const value=e.target.value
      var reqObj={
        ContactNo:value,
        EventID:eventId
      }
      {value!==contact&&
      CandidateRegisterActions.validateCandidateNo(reqObj).then((response: any) => {
        if(response.data==0){
          this.inputFieldChange(e);
        }
        else{
          this.inputFieldChange(e);
          this.setState({candidateView:true, candidateObject:response.data})

        }
       
      })
    }
  

  }

  skillFieldChange=(e:any)=>{
    this.setState({addSkill:e.target.value})
  }
  getDataUrl(img: any) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL('image/jpeg');
    }
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

  inputFieldChange = (e: any) => {
    const targetName: string = e.target.name;
    const targetValue: string = e.target.value;
    const targetType: string = e.target.type;
    const updatedCandidateForm = {
      ...this.state.candidateRegister
    };
    const updatedFormElement = {
      ...updatedCandidateForm[targetName]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType);
    updatedCandidateForm[targetName] = updatedFormElement;
    if (!this.state.checked && !updatedCandidateForm["empId"].valid) {
      const updatedEmpElement = {
        ...updatedCandidateForm["empId"]
      };
      updatedEmpElement.value = "";
      updatedEmpElement.valid = true
      updatedCandidateForm["empId"] = updatedEmpElement;
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedCandidateForm) {
      formIsValid = updatedCandidateForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ candidateRegister: updatedCandidateForm, formIsValid });
  }

  submitCandidateReg = () => {
    const user_id = sessionStorage.getItem("user_id")
    const formData: any = {};
    const { candidateRegister } = this.state;
    const resetCandidateData = {
      ...candidateRegister
    };
    for (let inputIdentifier in resetCandidateData) {
      formData[inputIdentifier] = resetCandidateData[inputIdentifier].value;
      resetCandidateData[inputIdentifier].value = '';
      resetCandidateData[inputIdentifier].valid = false;
    }
    var dateTime = new Date(), imageSrc, imageBase64
    // var date = moment(dateTime).format("YYYY-MM-DD HH:mm:ss")
    const startdate = new Date(formData.date);
    // const startdateTime = startdate.toLocaleTimeString();
    const startdateFormat = `${startdate.getFullYear()}-${startdate.getMonth() + 1}-${startdate.getDate()}`
    var checked=!this.state.checked
    var empId=formData.empId
      if(empId.length==0){
        empId=0
      }

    var reqObj = {
      EmpID: empId,
      EventID: formData.eventName,
      EmpName: formData.empName,
      Skills: formData.skillset,
      StartDate: startdateFormat,
      ContactNo: formData.empContactNo,
      EmailId: formData.empEmail,
      isExternal: checked,
      Expereince: formData.empExp,
      RelevantExperience: formData.empRelaventExp,
      CreatedDate: dateTime,
      UpdatedDate:dateTime,
      CreatedBy: user_id,
      UpdatedBy:user_id,
      Gender: formData.gender,
      AddSkills:this.state.addSkill
    }
    if (this.imageRef.current && this.imageRef.current.children && this.imageRef.current.children[0].children[0].tagName === 'IMG') {
      imageSrc = this.imageRef.current.children[0].children[0];
      imageBase64 = this.getDataUrl(imageSrc);
      var pair = { candidateImage: imageBase64 && imageBase64.replace('data:image/jpeg;base64,', '') }
      reqObj = { ...reqObj, ...pair }
    }
    this.setState({ loading: true });   
    CandidateRegisterActions.candidateRegister(reqObj).then((response: any) => {
      if(response.errCode!=404)
      {
        this.setState({
          candidateRegister: { ...resetCandidateData },
          loading: false,
          showToast: true,
          toastcolor:"primary",
          toastMsg: 'Candidate Registered successfully.',
          formIsValid: false,
          imgErr: ''
        });
        document.dispatchEvent(new CustomEvent("removePhoto", {
          detail: { removePhoto: true }
        }))
        this.props.history.push('/homePage');
      }
      else{
        this.setState({
          loading: false,
          showToast: true,
          toastcolor:"danger",
          toastMsg: response.status,
          formIsValid: false,
          imgErr: ''
        });

      }
  
    });

  }

  toastOnDismiss = () => {
    this.setState({ showToast: false });
  }

  dismissSearchModal = (showSearchModal : boolean) => {
    this.setState({ showSearchModal });
  }

  viewCandidate=()=>{
    const myObject=this.state.candidateObject
    const eventId=this.state.candidateRegister.eventName.value
    console.log(myObject)
     var checked=false
    const updatedFormElement = {
      empId: { value: myObject.EmpID, validation: { required: true }, valid: true },
      empName: { value: myObject.EmpName, validation: { required: true }, valid: true },
      eventName: { value: eventId, validation: { required: true }, valid: true },
      empContactNo: { value: myObject.ContactNo, validation: { required: true }, valid: true },
      empEmail: { value: myObject.EmailId, validation: { required: true }, valid: true },
      empExp: { value: myObject.Expereince, validation: { required: true }, valid: true },
      date: { value: myObject.StartDate, validation: { required: true }, valid: true },
      empRelaventExp: { value: myObject.RelevantExperience, validation: { required: true }, valid: true },
      skillset: { value: myObject.Skills, validation: { required: true }, valid: true },
      gender: { value: myObject.Gender, validation: { required: true }, valid: true }
    }
    // const eventSkill = selectedEvent.Skills.map((list: any) => list.trim());
    // this.setState({ eventSkillList: eventSkill });
    myObject.isExternal=="0"?checked=true:checked=false
    this.setState({candidateView:false,candidateRegister:updatedFormElement,checked:checked})
  }

  cancelAlert=()=>{
    const setContactNo = {
      target: {
        name: 'empContactNo',
        value: ""
      }
    }
    this.setState({candidateView:false,showToast:true,toastMsg:"Please Enter New Mobile No",toastcolor:"danger"})
    this.inputFieldChange(setContactNo);
  }

  viewCandidateModel=()=>{
    const eventId=this.state.candidateRegister.eventName.value
    if(eventId.length!==0){
      this.setState({showSearchModal:true})
    }
    else{
      this.setState({showToast:true,toastMsg:"please select event",toastcolor:"danger"})
    }
  }

  selectCandidate=(e:any)=>{
    const myObject=e
    const eventId=this.state.candidateRegister.eventName.value
     var checked=false
     const updatedFormElement = {
      empId: { value: myObject.EmpID, validation: { required: true }, valid: true },
      empName: { value: myObject.EmpName, validation: { required: true }, valid: true },
      eventName: { value: eventId, validation: { required: true }, valid: true },
      empContactNo: { value: myObject.ContactNo, validation: { required: true }, valid: true },
      empEmail: { value: myObject.EmailId, validation: { required: true }, valid: true },
      empExp: { value: myObject.Expereince, validation: { required: true }, valid: true },
      date: { value: myObject.StartDate, validation: { required: true }, valid: true },
      empRelaventExp: { value: myObject.RelevantExperience, validation: { required: true }, valid: true },
      skillset: { value: myObject.Skills, validation: { required: true }, valid: true },
      gender: { value: myObject.Gender, validation: { required: true }, valid: true }
    }
    myObject.isExternal=="0"?checked=true:checked=false
    this.setState({showSearchModal:false,candidateRegister:updatedFormElement,checked:checked})
  }

  goToBack = () => {
    this.props.history.goBack();
  }
  changeToggle = (e: any) => {
    this.setState({ checked: e.detail.checked });
  }
  render() {
    const { formIsValid, loading, toastMsg,toastcolor, showToast, candidateRegister, checked, imgErr,addSkill,candidateView,showSearchModal} = this.state;
    const eventId=this.state.candidateRegister.eventName.value
    if (sessionStorage.getItem('isAdmin') === null) {
      return (<Redirect to="/home" />);
    }
    else {
      return (
        <IonPage className='candidateRegContainer'>
          <Header headerName="Candidate Registration" showBackBtn={true} isAdminStatus={this.props} />
          <IonContent>
            <div ref={this.imageRef}>
              <CandidatePhoto />
            </div>
            {imgErr.length > 0 && <div className='imageErr'>{imgErr}</div>}
            <IonList>
            <IonItem>
                <div >
                  <IonButton  className='appButton' onClick={this.viewCandidateModel} >Candidate
                <IonIcon icon={searchOutline} /> </IonButton>
                </div>
              </IonItem>
              <IonItem>
                <IonLabel>Internal</IonLabel>
                <IonToggle checked={checked} onIonChange={this.changeToggle} />
              </IonItem>
              {checked && <IonItem>
                <IonLabel position="fixed">SAP ID</IonLabel>
                <IonInput
                  inputmode='numeric'
                  name='empId'
                  type='number'
                  value={checked ? candidateRegister.empId.value : ""}
                  onIonChange={this.inputFieldChange}
                  required={!checked}
                  disabled={!checked}
                />
              </IonItem>}
              <IonItem>
                <IonLabel className='ionLabel' position="fixed">Name</IonLabel>
                <IonInput
                  inputmode='text'
                  name='empName'
                  value={candidateRegister.empName.value}
                  onIonChange={this.inputFieldChange}
                  required
                />
              </IonItem>             
              <Gender selectedValue={candidateRegister.gender.value} onGenderChange={this.onGenderChange} />
              <EventList selectedValue={candidateRegister.eventName.value} onEventListChange={this.onEventListChange} />
              <IonItem><DateTime disabledField={true} selectedValue={candidateRegister.date.value} onEventChange={this.onEventChange} /></IonItem>
              <SkillListMenu eventDisabled={false} isCandidateSkill={true} eventSkillList={this.state.eventSkillList} selectedValue={candidateRegister.skillset.value} showSkillChips={false} onEventChange={this.onEventChange} />
              <IonItem>
                <IonLabel className='ionLabel' position="fixed">Additional Skills</IonLabel>
                <IonInput
                  inputmode='text'
                  name='addSkill'
                  value={addSkill}
                  onIonChange={this.skillFieldChange}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Contact No</IonLabel>
                <IonInput
                  inputmode='numeric'
                  name='empContactNo'
                  value={candidateRegister.empContactNo.value}
                  onIonChange={this.contactNoFieldChange}
                  type='number'
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Email</IonLabel>
                <IonInput
                  inputmode='email'
                  name='empEmail'
                  value={candidateRegister.empEmail.value}
                  onIonChange={this.inputFieldChange}
                  type='email'
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Experience</IonLabel>
                <IonInput
                  inputmode='text'
                  name='empExp'
                  value={candidateRegister.empExp.value}
                  onIonChange={this.inputFieldChange}
                  type='number'
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Relavent Exp</IonLabel>
                <IonInput
                  inputmode='text'
                  name='empRelaventExp'
                  value={candidateRegister.empRelaventExp.value}
                  onIonChange={this.inputFieldChange}
                  type='number'
                  required
                />
              </IonItem>
              <SearchCandidate showModal={showSearchModal} selectCandidate={this.selectCandidate} dismissModal={this.dismissSearchModal} eventId={eventId}/>
            </IonList>
            <div className='candidateRegCntrlPanel'>
              {/* <IonButton className='appButton' onClick={this.goToBack}>Back</IonButton> */}
              <IonButton className='appButton' disabled={!formIsValid} onClick={this.submitCandidateReg}>Submit</IonButton>
            </div>
          </IonContent>
          <IonLoading
            isOpen={loading}
            message={'Please wait...'}
          />
          <IonToast
            isOpen={showToast}
            color={toastcolor}
            message={toastMsg}
            onDidDismiss={this.toastOnDismiss}
            duration={1000}
            cssClass='toastMessage'
          />
            <IonAlert
            isOpen={candidateView}
            header={'Candidate Found'}
            buttons={[
              {
                text: 'Cancel',
                handler: () => {
                  this.cancelAlert()
                }
              },
              {
                text: 'view',
                handler: () => {
                  this.viewCandidate()
                }
              }
            ]}
          />
        </IonPage>
      );
    }
  }
}

export default CandidateRegistration;
