import { IonAlert, IonLoading, IonContent, IonHeader, IonPage, IonTitle, IonList, IonItem, IonLabel, IonInput, IonButton, IonToast, IonButtons, IonIcon, IonToggle } from '@ionic/react';
import React from 'react';
import { personOutline, eyeOutline, eyeOffOutline, atOutline, callOutline, flagOutline, fingerPrintOutline } from 'ionicons/icons';
import { Redirect } from 'react-router-dom';
import { SignUpActions } from './modules/SignUpActions';
import './SignUp.scss';
import logo from '../../common/images/digitalAnalytics.png';
import moment from 'moment';
interface ContainerProps {
  history: any;
  isAdmin: boolean;
  
}
interface ContainerState {
  showErrorTost: boolean;
  errorMessage: string;
  sucessMessage: string;
  signUpDetails: any;
  formIsValid: boolean;
  IsPwdValid: boolean;
  inValidUser: boolean;
  showPasswordEye: boolean;
  showCPasswordEye: boolean;
  checked: boolean;
  showToast: boolean;
  passcode: any;
  sapID: any;
  c_password:any;
  showLoading: boolean;
  showAlert: boolean;
}
const inputField = {
  value: '',
  validation: {
    required: true
  },
  valid: false
};
const signUpForm = {
  firstName: inputField,
  lastName: inputField,
  emailId: inputField,
  contactNo: inputField,
  password: inputField,
}

class SignUp extends  React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
      super(props);
      this.state = {
        inValidUser: false,
        showErrorTost: false,
        errorMessage: '',
        sucessMessage:'',
        formIsValid: false,
        signUpDetails: { ...signUpForm },
        showPasswordEye: false,
        showCPasswordEye: false,
        checked: false,
        showToast: false,
        passcode:"",
        sapID:'',
        c_password: '',
        IsPwdValid: false,
        showLoading: false,
        showAlert: false
      }
  }
  toastOnDismiss = () => {
    this.setState({ showErrorTost: false });
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
        const pattern = /^[0-9]{10}$/;
        isValid = pattern.test(value) && isValid
    }
    if (inputType === "number") {
      const pattern = /^[0-9]{10}$/;
      isValid = pattern.test(value) && isValid

    }
    if (inputType === "email") {
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      isValid = pattern.test(value) && isValid
    }
    if (inputType === "contactNo") {
      const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      isValid = pattern.test(value) && isValid
  }

    return isValid;
}


  inputFieldChange = (e: any) => {
    const targetName: string = e.target.name;
    const targetValue: string = e.target.value;
    const targetType: string = e.target.type;
    const updatedSignUpForm = {
      ...this.state.signUpDetails
    };
    const updatedFormElement = {
      ...updatedSignUpForm[targetName]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType);
    updatedSignUpForm[targetName] = updatedFormElement;
   
    let formIsValid = true;
    for (let inputIdentifier in updatedSignUpForm) {
      formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ signUpDetails: updatedSignUpForm, formIsValid });
  }
  
  sucessLogin = () =>{
    this.setState({showLoading: true,  showToast: false, errorMessage:""});
        const formData: any = {};
        const { signUpDetails } = this.state;
        const resetRegSignUp = {
            ...signUpDetails
        };
        for (let inputIdentifier in resetRegSignUp) {
            formData[inputIdentifier] = resetRegSignUp[inputIdentifier].value;
           // resetRegSignUp[inputIdentifier].value = '';
           // resetRegSignUp[inputIdentifier].valid = false;
        }
        var dateTime = new Date()
        var date = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
        const reqObj = {
            isAdmin : this.state.passcode === "12345" ? true: false,
            UserSAPID : this.state.sapID === "" ? "0" : this.state.sapID,
            UserFirstName : formData.firstName,
            UserLastName : formData.lastName,
            UserEmail : formData.emailId,
            UserMobile : formData.contactNo,
            UserPassword : formData.password,   
            CreatedDate: date,
            CreatedBy: '1',
            UpdatedBy: '1',
            UpdatedDate: date,          
        } 
        SignUpActions.signUpDetails(reqObj).then((response: any) => {   
         if(response.errCode === 200){ 
          for (let inputIdentifier in resetRegSignUp) {           
            resetRegSignUp[inputIdentifier].value = '';
            resetRegSignUp[inputIdentifier].valid = false;
          }
             this.setState({
                signUpDetails: { ...resetRegSignUp },
                showLoading: false,  
                showToast: true,             
                sucessMessage: response.message,
                sapID:"",
                passcode:"",
                c_password:"",
                showCPasswordEye: false,
                showPasswordEye: false
             })
             setTimeout(this.loginPage,1200);
             // this.loginPage();
         }   
         else{  
          this.setState({showToast: true, errorMessage:response.message});
            }            
        })  
        this.setState({showToast: false});
  }
  checkSignUpCredentials = (e:any) =>{
    if(this.state.c_password !== this.state.signUpDetails.password.value ){
      this.setState({showToast: true, errorMessage:"Password Not Matching"});
    }
    else{
      this.setState({showAlert : true});
      }
}
loginPage = () => {
  this.setState({showToast : false, signUpDetails: { ...signUpForm }, showCPasswordEye: false, showPasswordEye: false, c_password: '', passcode:'', sapID:'', checked: false});
    this.props.history.push('/home');

}
showHidePassword = ()=>{
  if(this.state.showPasswordEye){
  this.setState({ showPasswordEye: false});
  }
  if(!this.state.showPasswordEye){
    this.setState({ showPasswordEye: true});
    }
}
showHideCPassword =() =>{
  if(this.state.showCPasswordEye){
    this.setState({ showCPasswordEye: false});
    }
    if(!this.state.showCPasswordEye){
      this.setState({ showCPasswordEye: true});
      }
}
changeToggle = (e: any) => {
  this.setState({ checked: e.detail.checked });
}
passcodeCheck =(e: any) =>{
  this.setState({ passcode: e.target.value});
   /* if(this.state.passcode !== "12345"){   
      this.setState({    
        showToast: false,
        errorMessage: ""
        });
    }
    else{
      this.setState({    
      showToast: true,
      errorMessage: "Please enter valid passcode else you will be registerd as USER"
      });  
    }*/
}
sapIdchange = (e: any) => {
  this.setState({ sapID: e.target.value });
}
checkPassword = (e: any) => {
  this.setState({ c_password: e.target.value });
  if(this.state.c_password !== ""){    
    this.setState({    
      showToast: false,
      errorMessage: "",
      IsPwdValid: true
      });
  }
  else{
    this.setState({    
     // showToast: true,
    //  errorMessage: "Password Not Matching",
      IsPwdValid: false
       });
  }  
}

render(){  
  const { showAlert, formIsValid, signUpDetails, errorMessage, sucessMessage, showPasswordEye, showCPasswordEye, checked, IsPwdValid} = this.state;
  if(sessionStorage.getItem('isAdmin') !== null){
    return (<Redirect to="/homePage" />);
  }
  else{
return (
    <IonPage className='signUpContainer'>
       <img alt='logo' className='img_center' src={logo} />
      <IonHeader className='appHeader'>
        <IonTitle>Register New Account</IonTitle>        
      </IonHeader>     
      <IonContent>
        <IonList>
        <IonItem>
              <IonLabel>Internal</IonLabel>
              <IonToggle checked={checked} onIonChange={this.changeToggle} />
            </IonItem>
            {checked && 
            <IonItem>
            <IonLabel className='ionLabel' position="floating">SAP ID</IonLabel>
            <IonInput
               inputmode='numeric'
               name='sapID'
               type='number'
               value={this.state.sapID}
               onIonChange={this.sapIdchange}                
            />
             <IonButtons slot="end">
               <IonIcon slot="icon-only" icon={flagOutline} color="primary"/>
             </IonButtons> 
          </IonItem>            
           }
        <IonItem>
              <IonLabel className='ionLabel' position="floating">First Name</IonLabel>
              <IonInput
                inputmode='text'
                name='firstName'
                value= {signUpDetails.firstName.value}
                onIonChange={this.inputFieldChange}
                required
              />
               <IonButtons slot="end">
                 <IonIcon slot="icon-only" icon={personOutline} color="primary"/>
               </IonButtons> 
            </IonItem>
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Last Name</IonLabel>
              <IonInput
                inputmode='text'
                name='lastName'
                value= {signUpDetails.lastName.value}
                onIonChange={this.inputFieldChange}
                required
              />
               <IonButtons slot="end">
                 <IonIcon slot="icon-only" icon={personOutline} color="primary"/>
               </IonButtons> 
            </IonItem>
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Email</IonLabel>
              <IonInput
                inputmode='email'
                name='emailId'
                type='email'
                value= {signUpDetails.emailId.value}
                onIonChange={this.inputFieldChange}
                required
              />
              <IonButtons slot="end">
                 <IonIcon slot="icon-only" icon={atOutline} color="primary"/>
               </IonButtons> 
            </IonItem>
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Contact No</IonLabel>
              <IonInput
                inputmode='tel'
                name='contactNo'
                type='number'
                value= {signUpDetails.contactNo.value}
                onIonChange={this.inputFieldChange}
                required
              />
              <IonButtons slot="end">
                 <IonIcon slot="icon-only" icon={callOutline} color="primary"/>
               </IonButtons>                
            </IonItem>
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Password</IonLabel>
              <IonInput                
                type={!showPasswordEye ? 'password' : 'text' }
                name='password'
                value= {signUpDetails.password.value}
                onIonChange={this.inputFieldChange}
                required
              />
             <IonButtons slot="end">
              <div className="eye_button" onClick= {this.showHidePassword}>
                 <IonIcon slot="icon-only" icon={showPasswordEye ? eyeOutline : eyeOffOutline} color="primary"/>
                 </div>
                </IonButtons>
            </IonItem>   
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Confirm Password</IonLabel>
              <IonInput                
                type={!showCPasswordEye ? 'password' : 'text' }
                name='c_password'
                value= {this.state.c_password}
                onIonChange={this.checkPassword}
                required
              />
             <IonButtons slot="end">
              <div className="eye_button" onClick= {this.showHideCPassword}>
                 <IonIcon slot="icon-only" icon={showCPasswordEye ? eyeOutline : eyeOffOutline} color="primary"/>
                 </div>
                </IonButtons>
            </IonItem> 
            <IonItem>
              <IonLabel className='ionLabel' position="floating">Passcode</IonLabel>
              <IonInput
                type='password'
                name='passcode'
                value= {this.state.passcode}
                onIonChange={this.passcodeCheck}                
              />
              <IonButtons slot="end">
                 <IonIcon slot="icon-only" icon={fingerPrintOutline} color="primary"/>
               </IonButtons>                     
            </IonItem>     
            {/* this.state.showToast ? <p className = "errorMessage">{this.state.errorMessage}</p>: '' */ }     
          </IonList>
          <div className='loginCntrlPanel'>              
          <IonButton className='appButton' disabled={!formIsValid || !IsPwdValid} onClick={this.checkSignUpCredentials}>Sign Up</IonButton>          
          </div>    
         
          <p className='txtCenter'> 
          <IonButton className='appButton' fill="clear" onClick ={this.loginPage}  >Already have an account? Click Here.</IonButton>
          </p>
          
      </IonContent>
      
      <div className ="toastMessage">
      <IonToast
        isOpen={this.state.showToast}
        message={errorMessage !== ""? errorMessage : sucessMessage}
        onDidDismiss={this.toastOnDismiss}
        duration={1000}
        cssClass={ errorMessage !== "" ? 'toastErrorMessage': "toastMessage"}
      />
        <IonLoading
          isOpen={this.state.showLoading}
          onDidDismiss={() => this.setState({showLoading :false})}
          message={'Please wait...'}
          duration={2000}
      />
      </div>
      <div className="sss">
      <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => this.setState({showAlert: false})}
          header={'Alert'}
         // subHeader={'Subtitle'}
          message={this.state.passcode === "12345" ? 'You will be Registerd As Admin' :  'You will be Registerd As User'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Okay',
              handler: () => {
                this.sucessLogin();
              }
            }
          ]}
        />
      </div>
      </IonPage>
    
    );
  }
  };
}
export default SignUp;