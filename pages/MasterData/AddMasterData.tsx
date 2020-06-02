import React from 'react';
import { Redirect } from 'react-router-dom'
import {
  IonContent, IonPage, IonTitle, IonItem, IonList, IonLabel,IonButtons, IonLoading, IonToast, IonIcon
} from '@ionic/react';
import { calendarOutline, peopleOutline, locationOutline,buildOutline,clipboardOutline,documentOutline } from 'ionicons/icons';
import AddModel from './AddModel'
import Header from '../Header/Header';

interface ContainerProps {
  history: any;
}
interface ContainerState {
  formIsValid: boolean;
  loading: boolean;
  showToast: boolean;
  toastMsg: string;
  clientDetailsList: any;
  showModel:boolean;
  name:string;
  inputList:any;
}


const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};



class RegisterEvent extends React.Component<ContainerProps, ContainerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      formIsValid: false,
      loading: false,
      showToast: false,
      toastMsg: '',
      clientDetailsList: [],
      showModel:false,
      name:'',
      inputList:[{orgName:'',SapId:''}]
    }
  }
  
  toastOnDismiss = () => {
    this.setState({ showToast: false });
  }

  goToBack = () => {
    this.props.history.goBack();
  }



  viewModel=(e:any)=>{
    this.setState({ showModel: true,name:e });
  }
  

  dismissModal = (showClientModal: boolean) => {
    this.setState({showModel:false });
  }

  render() {
    const {  loading, showToast, toastMsg,showModel,name } = this.state;
    if(sessionStorage.getItem('isAdmin') === null){
      return (<Redirect to="/home" />);
    }
    else{   
      return (
      <IonPage className='eventRegContainer'>
         <Header headerName="More" showBackBtn={true} isAdminStatus ={this.props} />       
        <IonContent>
          <IonList>
          <IonItem mode='md' detail-none button onClick={()=>{this.viewModel("Client")}}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={peopleOutline} color="primary"/>         
                 <IonTitle className = "font-16">Add Client</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem> 
         
          <IonItem mode='md' detail-none button onClick={()=>{this.viewModel("Location")}}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={locationOutline} color="primary"/>         
                 <IonTitle className = "font-16">Add Location</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>
           <IonItem mode='md' detail-none button onClick={()=>{this.viewModel("Skill")}}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={buildOutline} color="primary"/>         
                 <IonTitle className = "font-16">Add Skill</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem> 
          <IonItem mode='md'  detail-none button  onClick={()=>{this.viewModel("Competancy")}}>             
            <IonLabel>
            <IonButtons   slot="start">              
                 <IonIcon slot="icon-only" icon={documentOutline} color="primary"/>         
                 <IonTitle  className = "font-16">Add Competancy</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem> 
          <IonItem mode='md'  detail-none button  onClick={()=>{this.viewModel("Assessment")}}>             
            <IonLabel>
            <IonButtons   slot="start">              
                 <IonIcon slot="icon-only" icon={clipboardOutline} color="primary"/>         
                 <IonTitle  className = "font-16">Add Assessment</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>        
          </IonList>                  
        </IonContent>
        <AddModel showModal={showModel} name={name} dismissModal={this.dismissModal}/>

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
      </IonPage>
    );
    }
  }
}

export default RegisterEvent;