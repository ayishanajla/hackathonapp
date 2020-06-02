import React from 'react';
import {
   IonPage, IonList, IonContent, IonSelect, IonSelectOption, IonLabel, IonItem, IonBadge, IonLoading
} from '@ionic/react';
import Header from '../Header/Header';
import clients from '../../common/clients';
import './EventStatus.scss';
interface ContainerProps {
  history: any;
  location: any;
  match: any;
}

interface ContainerState {
  eventList: any;
  feedbackSummary: any;
  loading: boolean;
}

class EventStatus extends React.Component<ContainerProps, ContainerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      eventList: [],
      feedbackSummary: {},
      loading: false
    }
  }

  componentDidMount() {
    this.getEventList();
  }

  getEventList = async () => {
    try {
      const response = await clients.eventList.get('');
      this.setState({ eventList: response.data.arrRes });
    }
    catch (error) {
      return (error.response);
    }
  }

  onEventListChange = async (e: any) => {
    try {
      const reqObj = {
        event_id: e.target.value
      }
      this.setState({ loading: true });
      const response = await clients.feedbackSummary.post('', reqObj);
      this.setState({ loading: false, feedbackSummary: response.data.resultArr });
    }
    catch (error) {
      // return (error.response);
      this.setState({ loading: false, feedbackSummary: {} });

    }
  }

  render() {
    const { eventList, feedbackSummary, loading } = this.state;
    return (
      <IonPage>
        <IonContent>
          <Header headerName="Event Status" showBackBtn={true} isAdminStatus={this.props} />
          <IonList>
            <IonItem>
              <IonLabel>Event</IonLabel>
              <IonSelect className='eventList' name='eventName' onIonChange={this.onEventListChange} placeholder="Event Name">
                {eventList.map((item: any) =>
                  <IonSelectOption key={item.Name} value={item.EventId}>{item.Name}</IonSelectOption>
                )}
              </IonSelect>
            </IonItem>
          </IonList>
          {feedbackSummary.SelectedEmp && <div className='eventStatus'>
            <IonList mode='ios'>
              <IonItem className='statusList'>
                <IonLabel color='success'>Selected</IonLabel>
                <IonBadge color='success' slot="end">{feedbackSummary.SelectedEmp}</IonBadge>
              </IonItem>
              <IonItem className='statusList'>
                <IonLabel color='danger'>Rejected</IonLabel>
                <IonBadge color="danger" slot="end">{feedbackSummary.RejectedEmp}</IonBadge>
              </IonItem>
              <IonItem className='statusList'>
                <IonLabel color='warning'>On Hold</IonLabel>
                <IonBadge color="warning" slot="end">{feedbackSummary.HoldEmp}</IonBadge>
              </IonItem>
              <IonItem className='statusList'>
                <IonLabel color='secondary'>In Progress</IonLabel>
                <IonBadge color="secondary" slot="end">{feedbackSummary.InprocessEmp}</IonBadge>
              </IonItem>
              <IonItem className='statusList'>
                <IonLabel color='dark'>Total</IonLabel>
                <IonBadge color="dark" slot="end">{feedbackSummary.TotalEmp}</IonBadge>
              </IonItem>
            </IonList>
          </div>}
        </IonContent>
        <IonLoading
          isOpen={loading}
          message={'Please wait...'}
        />
      </IonPage>
    )
  }
}

export default EventStatus;