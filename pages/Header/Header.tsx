import { IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonAlert } from '@ionic/react';
import React, { Fragment, useState } from 'react';
import { arrowBackOutline, powerOutline } from 'ionicons/icons';

const Header = (props: any) => {
  const [showAlert, setShowAlert] = useState(false);

  const logOut = () => {
    sessionStorage.clear();
    props.isAdminStatus.history.push('/home');
  }

  const goBack = () => {
    props.isAdminStatus.history.goBack();
  }
  
  return (
    <Fragment>
      <IonToolbar className='homeHeader' color="primary">
        {props.showBackBtn && <IonButtons slot="start">
          <IonButton onClick={goBack}>
            <IonIcon slot="icon-only" icon={arrowBackOutline} />
          </IonButton>
        </IonButtons>}
       {props.showLogoutIcon && <IonButtons slot="end">
          <IonButton onClick={() => setShowAlert(true)}>
            <IonIcon slot="icon-only" icon={powerOutline} />
          </IonButton>
        </IonButtons>}
        <IonTitle>{props.headerName}</IonTitle>
      </IonToolbar>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Confirm!'}
        message={'Are you sure you want to <strong>Logout</strong>?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {}
          },
          {
            text: 'Confirm',
            handler: () => logOut()
          }
        ]}
      />
    </Fragment>
  );
};

Header.defaultProps = {
  showLogoutIcon: true
};

export default Header;
