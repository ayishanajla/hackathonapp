import { IonContent, IonPage, IonTitle, IonList, IonItem, IonLabel, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
const SquadImage = (props: any) => {  
  return (
   <>
   <img src ={props.image} style={{ borderRadius: '50%' }} height='200' width='200'/>              

   </>
  );
};

export default SquadImage;
