import { IonSelectOption, IonSelect, IonTextarea, IonLoading, IonContent, IonPage, IonList, IonItem, IonLabel, IonInput, IonButton, IonToast, IonIcon, IonButtons } from '@ionic/react';
import React from 'react';
import { ClientFeedbackActions } from './modules/ClientFeedbackActions';
import { Redirect } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import Header from '../Header/Header';
import './ClientFeedback.scss';
import EventList from '../../components/commonUI/EventList';
import clients from '../../common/clients';

interface ContainerProps {
  history: any;  
}
interface ContainerState {
  showToast: boolean;
  errorMessage: string;
  feedbackDetails: any;
  formIsValid: boolean;
  showLoading: boolean;
  rating: number;
  eventSkillList: any;
  clientDetailsList: any;  
  clientName: any;  
  clientId:any;
}

const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};
const feedbackForm = {
  comment: inputField,
  eventName: inputField
}
class ClientFeedback extends  React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
      super(props);
      this.state = {
        showToast: false,
        errorMessage: '',
        formIsValid: false,
        feedbackDetails: { ...feedbackForm },
        showLoading: false,
        rating: 1,
        eventSkillList: [],
        clientDetailsList: [],
        clientName: '',
        clientId:'',
      }
  }
 
  toastOnDismiss = () => {
    this.setState({ showToast: false });
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

  inputFieldChange = (e: any) => {
    const targetName: string = e.target.name;
    const targetValue: string = e.target.value;
    const targetType: string = e.target.type;
    const updateClientFeedbackForm = {
      ...this.state.feedbackDetails
    };
    const updatedFormElement = {
      ...updateClientFeedbackForm[targetName]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType);
    updateClientFeedbackForm[targetName] = updatedFormElement;
   
    let formIsValid = true;
    for (let inputIdentifier in updateClientFeedbackForm) {
      formIsValid = updateClientFeedbackForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ feedbackDetails: updateClientFeedbackForm, formIsValid });
  }
  
  submitFeedback = (e:any) =>{ 
    this.setState({showLoading: true});
    const formData: any = {};
        const { feedbackDetails } = this.state;
        const resetDetails = {
            ...feedbackDetails,
        };
       
        for (let inputIdentifier in resetDetails) {
            formData[inputIdentifier] = resetDetails[inputIdentifier].value;
            resetDetails[inputIdentifier].value = '';
            resetDetails[inputIdentifier].valid = false;
        }        
        
        const reqObj = {
            eventID :formData.eventName,
            clientID : this.state.clientId,
            ratingCnt: this.state.rating,
            txtComment : formData.comment,
            createdBy: 1
        }
       
        this.setState({ showLoading: true });
        ClientFeedbackActions.clientFeedbackOnEvent(reqObj).then((response: any) => {                 
            if(response.errCode === 200){
                this.setState({  
                    feedbackDetails: { ...resetDetails },                     
                     rating: 1,
                     clientName:'',
                     clientId:'',
                     showLoading: false,
                     showToast: true, 
                     errorMessage: 'Feedback saved Sucessfully!',
                     formIsValid: false
                    });
                  //  this.props.history.push('/homePage');
            }    
            else{
              this.setState({
                 showLoading: false,
                 showToast: true, 
                 errorMessage: 'Error in saving details.'                 
                });
            }               
        })
    }
    onEventListChange = (e: any, selectedEvent: any) => {
        var id = e.target.value, clientName='', clientId=''
        const targetName: string = e.target.name;
        const targetValue: string = id;
        const targetType: string = e.target.type;
        const updatedClientFdForm = {
            ...this.state.feedbackDetails
        };
        const updatedFormElement = {
            ...updatedClientFdForm[targetName]
        };
        updatedFormElement.value = targetValue;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType);
        updatedClientFdForm[targetName] = updatedFormElement;
        const reqObj = {
            eventId: id
        }
        ClientFeedbackActions.geClientDetailsById(reqObj).then((response: any) => {
            clientId = response.arrRes[0].ClientId
            clientName = response.arrRes[0].ClientName
            ClientFeedbackActions.getPanelList(reqObj).then((res: any) => {                 
                 let formIsValid = true;
                 for (let inputIdentifier in updatedClientFdForm) {
                     formIsValid = updatedClientFdForm[inputIdentifier].valid && formIsValid;
                 }
                this.setState({ feedbackDetails: updatedClientFdForm, formIsValid, clientName: clientName, clientId:clientId});
            })

        })    
      }
      
      onStarClick(nextValue:any, prevValue:any, name:any) {
      this.setState({rating: nextValue});
    }
  render(){
  const { formIsValid, feedbackDetails, showToast, errorMessage,  rating, clientName} = this.state;

  if (sessionStorage.getItem('isAdmin') === null) {
    return (<Redirect to="/home" />);
  }
  else {
    return (
    <IonPage className='clientFeedback'>
          <Header headerName="Event Feedback" showBackBtn={true} isAdminStatus={this.props} />
      <IonContent>         
        <IonList>
        <EventList selectedValue={feedbackDetails.eventName.value} onEventListChange={this.onEventListChange} />
      
              <IonItem>
                <IonLabel className='ionLabel' position="fixed"> Client</IonLabel>
                  <IonInput
                   className="ion-text-right"
                    inputmode='text'
                    name='addSkill'
                    value={feedbackDetails.eventName.value !== '' ? clientName: ''}
                    disabled
                  />

            </IonItem>
        
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Comment</IonLabel>
              <IonTextarea  
              name="comment"
              value= {feedbackDetails.comment.value}
              onIonChange={this.inputFieldChange}></IonTextarea>
             </IonItem>
            <IonItem>
          <IonLabel className='ionLabel' position="fixed">Rating</IonLabel>
          <IonLabel className='ionLabel starRating' >
          <div className="star">  
            <StarRatingComponent 
              name="rate1" 
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}
              starColor = '#fcc62a'
              emptyStarColor = '#fcc62a4a'
              
            />
      </div>
      </IonLabel>
      </IonItem>     
      </IonList>
          <div className='clientFeedbackButton'>              
            <IonButton className='appButton' disabled={!formIsValid} onClick={this.submitFeedback}>Submit</IonButton>
          </div>    
         
         
         
      </IonContent>
      <IonToast
        isOpen={showToast}
        message={errorMessage}
        onDidDismiss={this.toastOnDismiss}
        duration={2000}
        cssClass='toastMessage'
      />
       <IonLoading
          isOpen={this.state.showLoading}
          onDidDismiss={() => this.setState({showLoading :false})}
          message={'Please wait...'}
          duration={1000}
      />
      </IonPage>
    
    );
  }
  };
}
export default ClientFeedback;
