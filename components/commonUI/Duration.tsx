import React, { Fragment } from 'react';
import { IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import clients from '../../common/clients';
interface ContainerProps {
  onEventChange: any;
  selectedValue: any;
}

interface ContainerState {
  durationValue: string;
  durationList: any;
}
class Duration extends React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      durationValue: props.selectedValue,
      durationList: []
    }
  }


  componentDidMount() {
    this.getDurationList();
  }

  getDurationList = async () => {
    try {
      const response = await clients.durationList.get('');
      this.setState({ durationList: response.data.arrRes });
    }
    catch (error) {
      return (error.response);
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.selectedValue !== this.state.durationValue) {
      this.setState({ durationValue: nextProps.selectedValue });
    }
  }

  durationOnChange = (e: any) => {
    this.props.onEventChange(e);
  }

  render() {
    return (
      <Fragment>
        <IonLabel>Duration</IonLabel>
        <IonSelect name='duration' value={this.state.durationValue} placeholder="Select Duration" onIonChange={this.durationOnChange}>
          {this.state.durationList.map((list: any) =>
            <IonSelectOption key={list.DurationID} value={list.DurationID}>{list.Duration}</IonSelectOption>
          )}
        </IonSelect>
      </Fragment>
    );
  }
}

export default Duration;
