import { IonButton } from '@ionic/react';
import React from 'react';

const Logout = (props: any) => {
  const logOut = () => {
   sessionStorage.clear();
  }  
  return (   
    <IonButton className='appButton' onClick={logOut}>Logout</IonButton>        
  );
};

export default Logout;
