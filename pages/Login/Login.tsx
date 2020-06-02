import { IonLoading, IonContent, IonPage, IonList, IonItem, IonLabel, IonInput, IonButton, IonToast, IonIcon, IonButtons } from '@ionic/react';
import React from 'react';

import { personOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { Redirect } from 'react-router-dom';
import './Login.scss';
import logo from '../../common/images/digitalAnalytics.png';
import {LoginActions } from './modules/LoginActions';
interface ContainerProps {
  history: any;
  isAdmin: boolean;  
}
interface ContainerState {
  showToast: boolean;
  errorMessage: string;
  loginDetails: any;
  formIsValid: boolean;
  inValidUser: boolean;
  showPasswordEye: boolean;
  isAdmin: boolean;
  showLoading: boolean;
}
const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};
const candidateForm = {
  username: inputField,
  password: inputField,
}
class Login extends  React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
      super(props);
      this.state = {
        inValidUser: false,
        showToast: false,
        errorMessage: '',
        formIsValid: false,
        loginDetails: { ...candidateForm },
        showPasswordEye: false,
        isAdmin: false,
        showLoading: false
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
    const updatedCandidateForm = {
      ...this.state.loginDetails
    };
    const updatedFormElement = {
      ...updatedCandidateForm[targetName]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType);
    updatedCandidateForm[targetName] = updatedFormElement;
   
    let formIsValid = true;
    for (let inputIdentifier in updatedCandidateForm) {
      formIsValid = updatedCandidateForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ loginDetails: updatedCandidateForm, formIsValid });
  }
  
  checkLoginCredentials = (e:any) =>{ 
    this.setState({showLoading: true});
    const formData: any = {};
        const { loginDetails } = this.state;
        const resetRegSignUp = {
            ...loginDetails
        };
        for (let inputIdentifier in resetRegSignUp) {
            formData[inputIdentifier] = resetRegSignUp[inputIdentifier].value;
          //  resetRegSignUp[inputIdentifier].value = '';
          //  resetRegSignUp[inputIdentifier].valid = false;
        }        
        const reqObj = {
          userName : formData.username,
          password : formData.password,
        }
       LoginActions.loginDetails(reqObj).then((response: any) => {             
             if(response.errCode === 200){
               const resData = response.UserSet;
               resData.map((item:any) => {
                if(item.isAdmin === "1"){ 
                  const isAdminStatus = true;      
                  sessionStorage.setItem('username',item.first_name);
                  sessionStorage.setItem('isAdmin',JSON.stringify(isAdminStatus));    
                  sessionStorage.setItem('user_id',item.user_id); 
                  for (let inputIdentifier in resetRegSignUp) {
                    resetRegSignUp[inputIdentifier].value = '';
                    resetRegSignUp[inputIdentifier].valid = false;
                } 
                this.setState({ showPasswordEye: false});
                  this.props.history.push('/homePage');
                } 
                if(item.isAdmin === "0"){ 
                  const isAdminStatus = false;      
                  sessionStorage.setItem('username',item.first_name);
                  sessionStorage.setItem('isAdmin',JSON.stringify(isAdminStatus));
                  sessionStorage.setItem('user_id',item.user_id);   
                  for (let inputIdentifier in resetRegSignUp) {
                     resetRegSignUp[inputIdentifier].value = '';
                     resetRegSignUp[inputIdentifier].valid = false;
                 }   
                 this.setState({ showPasswordEye: false});
                  this.props.history.push('/homePage');
                }
              })
             }
             else{
              this.setState({ inValidUser: true, showToast: true, errorMessage: "Please Enter Valid Credentials"});
             }
        })
}
signUp = () =>{
  this.setState({ showPasswordEye: false, showLoading: true, loginDetails: {...candidateForm} });
  this.props.history.push('/signUp');  
}
showHidePassword = ()=>{
  if(this.state.showPasswordEye){
  this.setState({ showPasswordEye: false});
  }
  if(!this.state.showPasswordEye){
    this.setState({ showPasswordEye: true});
    }
}

componentDidMount(){
  if(sessionStorage.getItem('isAdmin') !== null){
    this.setState({ isAdmin: true});
  }  
  this.setState({  showToast: false });
}
render(){
  const { formIsValid, loginDetails, showToast, errorMessage, showPasswordEye, isAdmin} = this.state;
  if(isAdmin){
    return (<Redirect to="/homePage" />);
  }
  else{
  return (
    <IonPage className='loginContainer'>
      <IonContent>
      <div className="square">
        <div className="pic">
        <img alt='logo' className='img_center' src={logo} />   
        </div>
      </div>
     
        <IonList>
        <IonItem>
              <IonLabel className='ionLabel' position="floating">Username</IonLabel>
              <IonInput
                inputmode='text'
                name='username'
                value= {loginDetails.username.value}
                onIonChange={this.inputFieldChange}
                required
              />
               <IonButtons slot="end" className="abc">              
                 <IonIcon slot="icon-only" icon={personOutline} color="primary"/>                
                </IonButtons>            
            </IonItem>
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Password</IonLabel>
              <IonInput                
                type= {!showPasswordEye ? 'password' :"text"}
                name='password'
                value= {loginDetails.password.value}
                onIonChange={this.inputFieldChange}
                required
              />
              <IonButtons slot="end">
              <div className="eye_button" onClick= {this.showHidePassword}>
                 <IonIcon slot="icon-only" icon={showPasswordEye ? eyeOutline : eyeOffOutline} color="primary"/>
                 </div>
                </IonButtons>  
            </IonItem>         
          </IonList>
          <div className='loginCntrlPanel'>              
            <IonButton className='appButton' disabled={!formIsValid} onClick={this.checkLoginCredentials}>Log Me In</IonButton>
          </div>    
         
          <p className='txtCenter'>
          <IonButton className='appButton' fill="clear" onClick ={this.signUp}  >Register New Account Here !</IonButton>
          </p>
          { /* <p className='txtCenter'>For admin Username: Admin & pwd: Admin</p>
          <p className='txtCenter'>For User Username: test1223@hcl & pwd: test123456</p> */}
      </IonContent>
      <IonToast
        isOpen={showToast}
        message={errorMessage}
        onDidDismiss={this.toastOnDismiss}
        duration={2000}
        cssClass='toastErrorMessage'
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
export default Login;
