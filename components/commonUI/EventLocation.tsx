import React, { Fragment } from 'react';
import { IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import clients from '../../common/clients';
interface ContainerProps {
  onEventChange: any;
  selectedValue: any;
}

interface ContainerState {
  eventLocationValue: string;
  eventLocation: any;
}
class EventLocation extends React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      eventLocationValue: props.selectedValue,
      eventLocation: []
    }
  }


  componentDidMount() {
    this.getEventList().then((response: any) => {
      this.setState({ eventLocation: response.arrRes,eventLocationValue: this.props.selectedValue });
    })
  }

  getEventList = async () => {
    try {
      const response = await clients.eventLocations.get('');
      return (response.data);

    }
    catch (error) {
      return (error.response);
    }
  }

 

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.selectedValue !== this.state.eventLocationValue) {
      console.log("hai")
      this.setState({ eventLocationValue: nextProps.selectedValue });
    }
  }

  durationOnChange = (e: any) => {
    this.props.onEventChange(e);
  }

  render() {
    return (
      <Fragment>
        <IonLabel>Event Location</IonLabel>
        <IonSelect  name='eventLocation' value={this.state.eventLocationValue} placeholder="Select Location" onIonChange={this.durationOnChange}>
          {this.state.eventLocation.map((list: any) =>
            <IonSelectOption key={list.loc_id} value={list.loc_name}>{list.loc_name}</IonSelectOption>
          )}
        </IonSelect>
      </Fragment>
    );
  }
}

export default EventLocation;
