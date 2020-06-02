import { IonTitle, IonToolbar } from '@ionic/react';
import React, { Fragment } from 'react';

const ServerError = (props: any) => {

  
  return (
    <Fragment>
      <IonToolbar className='homeHeader' color="primary">
            <IonTitle>Server error</IonTitle>
      </IonToolbar>

    </Fragment>
  );
};


export default ServerError;
