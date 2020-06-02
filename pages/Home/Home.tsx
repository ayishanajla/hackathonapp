import { IonContent, IonPage, IonTitle, IonList, IonItem, IonLabel, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
import './Home.scss';
import Header from '../Header/Header';
import { starHalfOutline, statsChartOutline, schoolOutline, calendarOutline, clipboardOutline, chatbubbleEllipsesOutline, peopleOutline, ellipsisHorizontalCircleOutline, gitBranchOutline, trendingUpOutline } from 'ionicons/icons';
const Home = (props: any) => {
  const isAdmin = sessionStorage.getItem('isAdmin'); //return value as string
  
  const goToRegisterPanel = () => {
    props.history.push('/registerPanel');
  }
  const goToRegisterEvent = () => {
    props.history.push('/registerEvent');
  }
  const goToCandidateReg = () => {
    props.history.push('/candidateReg');
  }
  const goToFeedback = () => {
    props.history.push('/candidateSelection');
  }
  const goToSquad = () => {
    props.history.push('/squadFormation');
  }
  const goToEventStatus = () => {
    props.history.push('/eventStatus');
  }
  const goToMore = () => {
    props.history.push('/more');
  }
  const goToReport = () => {
    props.history.push('/report');
  }
  const goToClientFeedback = () =>{
    props.history.push('/clientFeedback');
  }
  
  return (
    <IonPage className='homePageWrapper'>
      { (isAdmin === 'true' ||  isAdmin === 'false') && isAdmin !== null ?
      <Header headerName="Hacker Anchor" showBackBtn={false} isAdminStatus ={props} /> : ''}
      <IonContent>
        <IonList>
        { isAdmin === 'true' && isAdmin !== null ?
        <>       
          <IonItem mode='md' detail button onClick={goToRegisterEvent}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={calendarOutline} color="primary"/>         
                 <IonTitle className = "font-16">Register Event </IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>
          <IonItem mode='md' detail button onClick={goToCandidateReg}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={peopleOutline} color="primary"/>         
                 <IonTitle className = "font-16">Candidate Registration </IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>
         
          <IonItem mode='md' detail button onClick={goToRegisterPanel}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={gitBranchOutline} color="primary"/>         
                 <IonTitle className = "font-16">Panel Registration</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>
          <IonItem mode='md' detail button onClick={goToSquad}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline} color="primary"/>         
                 <IonTitle className = "font-16">Squad Formation</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>
          <IonItem mode='md' detail button onClick={goToFeedback}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={clipboardOutline} color="primary"/>         
                 <IonTitle className = "font-16">Candidate Feedback</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>

          <IonItem mode='md' detail button onClick={goToEventStatus}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={statsChartOutline} color="primary"/>         
                 <IonTitle className = "font-16">Event Status</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>
          <IonItem mode='md' detail button onClick={goToReport}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={schoolOutline} color="primary"/>         
                 <IonTitle className = "font-16">Report</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>

          <IonItem mode='md' detail button onClick={goToMore}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={ellipsisHorizontalCircleOutline} color="primary"/>         
                 <IonTitle className = "font-16">More</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>         
          </> : isAdmin === 'false' && isAdmin !== null ?
          <>
            <IonItem mode='md' detail button onClick={goToSquad}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline} color="primary"/>         
                 <IonTitle className = "font-16">Squad Formation</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>
          <IonItem mode='md' detail button onClick={goToClientFeedback}>             
            <IonLabel>
            <IonButtons slot="start">              
                 <IonIcon slot="icon-only" icon={starHalfOutline} color="primary"/>         
                 <IonTitle className = "font-16">Event Feedback</IonTitle>
                </IonButtons>
              </IonLabel>
          </IonItem>      
          </> : '' }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
