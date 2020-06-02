import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  IonPage, IonContent, IonButton, IonActionSheet, IonTextarea, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonToast, IonLoading, IonCard, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCardContent, IonRange, IonIcon, IonBadge, IonFooter, IonToolbar, IonTitle, IonSegment, IonSegmentButton, IonAlert
} from '@ionic/react';
// import DateTime from '../../components/commonUI/DateTime';
import { connect } from 'react-redux';
import { CandidateFBActions } from './modules/CandidateFBActions';
import CandidatePrevFeedback from './CandidatePrevFeedback';
import Avator from '../../common/images/avator';
import './CandidateFeedback.scss';
import Header from '../Header/Header';
import { analytics } from 'ionicons/icons';

interface ContainerState {
  base64Image: string;
  showActionSheet: boolean;
  loading: boolean;
  showToast: boolean;
  toastMsg: string;
  formIsValid: boolean;
  candidateFB: any;
  candidateList: any;
  assessList:any;
  otherAssessment:any;
  imgErr: string;
  feedbackSegment: string;
  candidateFeedbackList: any;
  compentencyRating: any;
  showAlert: boolean;
  alertMessage: string;
}
interface ContainerProps {
  history: any;
  location: any;
  match: any;
  candidateSelection: any;
  candidateList: any;
  squadList: any;
  eventDetails: any;
}

const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};

const feedbackField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};

const rangeField = {
  value: 1,
  validation: {
    required: true
  },
  valid: true
};

const candidateFBForm = {
  empId: inputField,
  techSkill: rangeField,
  logcSkill: rangeField,
  commSkill: rangeField,
  feedback: feedbackField,
  compentencyRating: inputField
}

class CandidateFeedback extends React.Component<ContainerProps, ContainerState> {
  imageRef: React.RefObject<HTMLDivElement>;
  squadDetails: any;
  candidateAssessList:any;
  eventName: any;
  currentSprint: any;
  candiateImage: any;
  currentCandidate: any;
  constructor(props: any) {
    super(props);
    this.state = {
      base64Image: '',
      showActionSheet: false,
      loading: false,
      showToast: false,
      toastMsg: '',
      candidateList: props.candidateList,
      assessList:[],
      otherAssessment:[],
      candidateFB: { ...candidateFBForm },
      formIsValid: false,
      imgErr: '',
      feedbackSegment: 'currentFeedback',
      candidateFeedbackList: [],
      compentencyRating: [],
      showAlert: false,
      alertMessage: ''
    };
    this.imageRef = React.createRef();
    this.squadDetails = this.props.squadList.find((list: any) => list.ID === this.props.candidateSelection.squadName.value);
    this.eventName = this.props.candidateSelection.eventName.value;
    this.currentSprint = this.props.candidateSelection.sprintName.value;
  }

  componentDidMount() {
    const { candidateFB } = this.state;
    const candidateData = this.props.candidateSelection.candidateName;
    if (candidateData.value !== null &&
      candidateData.value !== '') {
      const updateCandidate = {
        ...candidateFB
      };
      updateCandidate.empId.value = candidateData.value;
      updateCandidate.empId.valid = candidateData.valid;
      this.currentCandidate = this.props.candidateList.find((list: any) => list.CandidateID === candidateData.value);
      const competancyList = this.props.eventDetails.CompetancyData.map((list: any) => {
        return list.compentancyID;
      })
      updateCandidate.compentencyRating.value=competancyList
      this.candiateImage = this.currentCandidate.candidate_image;
      this.setState({ candidateFB: updateCandidate })

    } else if (this.props.candidateList.length > 0) {
      const updateCandidate = {
        ...candidateFB
      };
      updateCandidate.empId.value = this.props.candidateList[0].CandidateID;
      updateCandidate.empId.valid = true;
      this.currentCandidate = this.props.candidateList[0];
      this.candiateImage = this.currentCandidate.candidate_image;
      const competancyList = this.props.eventDetails.CompetancyData.map((list: any) => {
        return list.compentancyID;
      })
      updateCandidate.compentencyRating.value=competancyList
      this.setState({ candidateFB: updateCandidate });
    }
    this.AssessList(this.props.eventDetails.EventId);
      this.getCompentencySetList()
  }

  AssessList = (eventId: string) => {
    const reqObj = {
      event_id: eventId
    }
    CandidateFBActions.candidateAssessList(reqObj).then((response: any) => {
      this.setState({
        assessList: response.arrRes,
      });
    });
  }

  getCompentencySetList = () => {
    CandidateFBActions.competancyList().then((response: any) => {
      this.setState({
        compentencyRating: response.arrRes,
      });
    });
  }

  submitCandidateFB = (status: string = '') => {
    const formData: any = {};
    const user_id = sessionStorage.getItem("user_id")
    const { candidateFB } = this.state;
    const resetCandidateData = {
      ...candidateFB
    };
    for (let inputIdentifier in resetCandidateData) {
      formData[inputIdentifier] = resetCandidateData[inputIdentifier].value;
      if (inputIdentifier === 'techSkill'
        || inputIdentifier === 'logcSkill'
        || inputIdentifier === 'commSkill') {
        resetCandidateData[inputIdentifier].value = 1;
        resetCandidateData[inputIdentifier].valid = true;
      } else if (inputIdentifier === 'empId') {
        const currentCandidateIndex = this.props.candidateList.findIndex((list: any) => list.CandidateID === resetCandidateData[inputIdentifier].value)
        if (this.props.candidateList.length > currentCandidateIndex + 1) {
          resetCandidateData[inputIdentifier].value = this.props.candidateList[currentCandidateIndex + 1].CandidateID;
          resetCandidateData[inputIdentifier].valid = true;
        }
      } else {
        resetCandidateData[inputIdentifier].value = '';
        resetCandidateData[inputIdentifier].valid = false;
      }
    }
    const reqObj = {
      squadID: this.squadDetails.ID,
      candidate_id: formData.empId,
      otherAssessment:this.state.otherAssessment,
      feedback: formData.feedback,
      sprintLevel: this.currentSprint,
      imageStr: this.candiateImage,
      finalStatus: this.currentSprint === 'Show and Tell assesment' ? formData.compentencyRating :status,
      eventID: this.props.squadList[0].EventID,
      userID:user_id
    }
    this.setState({ loading: true });
    CandidateFBActions.candidateFB(reqObj).then((response: any) => {
      if (response.status === 'Already Feedback submitted') {
        this.setState({
          candidateFB: { ...resetCandidateData },
          loading: false,
          showAlert: true,
          alertMessage: 'Feedback for this Candidate already submitted.',
          imgErr: ''
        });
      } else {
        this.setState({
          candidateFB: { ...resetCandidateData },
          loading: false,
          showToast: true,
          toastMsg: 'Feedback submitted successfully.',
          imgErr: ''
        });
      }
    });
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

  setShowActionSheet = (showActionSheet: boolean) => {
    this.setState({ showActionSheet });
  }

  showActionSheet = () => {
    this.setState({ showActionSheet: true });
  }

  changeSegment = (e: any) => {
    if (e.detail.value === 'prevFeedback') {
      this.setState({ loading: true });
      const reqObj = {
        event_id: this.props.squadList[0].EventID,
        candidate_id: this.state.candidateFB.empId.value
      };
      CandidateFBActions.candidateFeedbackList(reqObj).then((response: any) => {
        this.setState({
          candidateFeedbackList: response.arrRes,
          loading: false
        });
      });
    }
    this.setState({ feedbackSegment: e.detail.value });
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

  candidateOnChange = (e: any) => {
    const currentCandidate = this.props.candidateList.find((list: any) => list.CandidateID === e.target.value);
    if (currentCandidate) {
      this.candiateImage = currentCandidate.candidate_image;
    }
    this.inputFieldChange(e);
  }
  inputFieldChange = (e: any) => {
    const targetName: string = e.target.name;
    const targetValue: string = e.target.value;
    const updatedCandidateForm = {
      ...this.state.candidateFB
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
    this.setState({ candidateFB: updatedCandidateForm, formIsValid });
  }

  

  assessFieldChange=(id:any,e:any)=>{
    var otherAssessment=this.state.otherAssessment,value=e.target.value
    var obj={scaleID:id,scaleVAL:value}
    var newArray=[{scaleID:id,scaleVAL:value}]
    if(otherAssessment.length==0){
      this.setState({
       otherAssessment: this.state.otherAssessment.concat([obj])
    })
  }
    else{
    this.search(id,otherAssessment,value)
    }
  }  

  search = (key: any, arr: any, val: any) => {
    var array=arr
    const { length } = arr;
    const found = array.some((el: any) => el.scaleID === key);
    if (!found) array.push( { scaleID:key, scaleVAL: val })
    if(found){
       array.map((e:any,index:any) => (e.scaleID === key?array[index].scaleVAL=val:null))
     }
     this.setState({
      otherAssessment: array
   })
  }
    
    

  

  toastOnDismiss = () => {
    this.setState({ showToast: false });
  }

  goToBack = () => {
    this.props.history.goBack();
  }

  setShowAlert = (showAlert: boolean) => {
    this.setState({ showAlert });
  }

  render() {
    const {
      showToast, loading, toastMsg, candidateFB, candidateFeedbackList, compentencyRating,assessList,
      formIsValid, candidateList, feedbackSegment, showActionSheet, showAlert, alertMessage
    } = this.state;
    if (sessionStorage.getItem('isAdmin') === null) {
      return (<Redirect to="/home" />);
    }
    else {
      return (
        <IonPage className='feedbackContainer'>
          <Header headerName="Candidate Feedback" showBackBtn={true} isAdminStatus={this.props} />
          {feedbackSegment === 'prevFeedback' &&
            <div className='candidatePrevFeedback'><CandidatePrevFeedback currentCandidate={this.currentCandidate} candidateFeedbackList={candidateFeedbackList} /></div>
          }
          {feedbackSegment === 'currentFeedback' && <IonContent>
            <IonCard className='feedbackCard'>
              <IonCardHeader className='cardHeader'>
                {this.candiateImage &&
                  <img src={`data:image/jpeg;base64,${this.candiateImage}`} style={{ borderRadius: '50%' }} height='125' width='125' alt='' />
                }
                {(this.candiateImage === '' || this.candiateImage === undefined) &&
                  <Avator />
                }
                <IonCardTitle>{this.eventName}</IonCardTitle>
                <IonCardSubtitle>SQUAD: {this.squadDetails.SquadName}</IonCardSubtitle>
                <IonCardSubtitle>SPRINT: {this.currentSprint}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className='cardContent'>
                <IonItem>
                  <IonLabel>Candidate Name</IonLabel>
                  <IonSelect name='empId' value={candidateFB.empId.value} onIonChange={this.candidateOnChange}>
                    {candidateList.map((list: any, index: any) =>
                      <IonSelectOption key={`${list.EmpID}${index}`} value={list.CandidateID}>{list.EmpName}</IonSelectOption>
                    )}
                  </IonSelect>
                </IonItem>
                {this.props.eventDetails.TechSkillTested === "TRUE" &&
                assessList.map((list: any, index: any) =>
                  <IonItem key={`${list.AssId}${index}`}>
                    <div className='rangerContainer'>
                      <div className='rangerValue'>
                    <IonLabel>{list.AssName}</IonLabel>
                        <IonBadge color='primary'>{list.AssVal}</IonBadge>
                      </div>
                      <IonRange mode='ios' name='techSkill' onIonChange={(e) => this.assessFieldChange(list.AssId, e)} min={1} max={list.AssVal} step={1} snaps color="secondary" />
                    </div>
                  </IonItem>)}
                
               
                {this.currentSprint === "Show and Tell assesment" &&
                  <IonItem>
                  <IonLabel>Compentency Rating</IonLabel>
                  <IonSelect name='compentencyRating' value={candidateFB.compentencyRating.value} onIonChange={this.inputFieldChange}>
                    {compentencyRating.map((list: any, index: any) =>
                      <IonSelectOption key={`${list.ID}`} value={list.ID}>{list.CompetancyName}</IonSelectOption>
                    )}
                  </IonSelect>
                </IonItem>
                }
                <IonItem><IonTextarea placeholder="Candidate Feedback" value={candidateFB.feedback.value} name="feedback" onIonChange={this.inputFieldChange}></IonTextarea></IonItem>
                <div className='candidateFBCntrlPanel'>
                  <IonButton
                    className='appButton'
                    disabled={!formIsValid}
                    onClick={() => this.currentSprint === "Final Assessment" ? this.showActionSheet() : this.submitCandidateFB()}
                  >Submit</IonButton>
                  <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => this.setShowActionSheet(false)}
                    buttons={[{
                      text: 'Selected', handler: () => { this.submitCandidateFB('selected'); }
                    },
                    {
                      text: 'On Hold', handler: () => { this.submitCandidateFB('onhold'); }
                    },
                    // {
                    //   text: 'Drop Off', handler: () => { this.submitCandidateFB('dropOff'); }
                    // },
                    {
                      text: 'Rejected', handler: () => { this.submitCandidateFB('rejected'); }
                    },
                    {
                      text: 'Cancel', role: 'cancel'
                    }
                    ]}
                  >
                  </IonActionSheet>
                </div>
              </IonCardContent>
            </IonCard>
          </IonContent>}
          <IonLoading
            isOpen={loading}
            message={'Please wait...'}
          />
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => this.setShowAlert(false)}
            header={'Alert'}
            message={alertMessage}
            buttons={['OK']}
          />
          <IonToast
            isOpen={showToast}
            message={toastMsg}
            onDidDismiss={this.toastOnDismiss}
            duration={1000}
            cssClass='toastMessage'
          />
          <IonFooter>
            <IonToolbar>
              <IonSegment onIonChange={this.changeSegment} scrollable value={feedbackSegment} className='segmentWrapper'>
                <IonSegmentButton className='segmentBtn' value="prevFeedback">Prev Feedback</IonSegmentButton>
                <IonSegmentButton className='segmentBtn' value="currentFeedback">Feedback</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonFooter>
        </IonPage>
      )
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    candidateList: state.feedbackReducer.candidateList,
    candidateSelection: state.feedbackReducer.candidateSelection,
    squadList: state.feedbackReducer.squadList,
    eventDetails: state.feedbackReducer.eventDetails,

  }
}

export default connect(mapStateToProps, {})(CandidateFeedback);