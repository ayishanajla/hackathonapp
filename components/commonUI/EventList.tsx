import React, { Fragment } from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import clients from '../../common/clients';
import './css/SkillListMenu.css'

interface ContainerProps {
  onEventListChange: any;
  selectedValue: string;
}

interface ContainerState {
  eventNameList: any;
  eventList: any;
}

class EventList extends React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      eventNameList: props.selectedValue,
      eventList: []
    };
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

  componentWillReceiveProps(nextProps: any){
    if(nextProps.selectedValue !== this.state.eventNameList) {
        this.setState({ eventNameList: nextProps.selectedValue });
    }
  }

  onEventNameChange = (e: any) => {
    const eventListArr = this.state.eventList.find((list: any) => list.EventId === e.detail.value);
    this.setState({
      eventNameList: e.detail.value
    });
    this.props.onEventListChange(e, eventListArr);
  }

  render() {
    const { eventNameList, eventList } = this.state;
    return (
      <Fragment>
        <IonItem>
          <IonLabel>Event Name</IonLabel>
          <IonSelect name='eventName' value={eventNameList} onIonChange={this.onEventNameChange} placeholder="Select event name">
            {eventList.map((item: any) =>
              <IonSelectOption key={item.Name} value={item.EventId}>{item.Name}</IonSelectOption>
            )}
          </IonSelect>
        </IonItem>
      </Fragment>
    );
  }
}

export default EventList;