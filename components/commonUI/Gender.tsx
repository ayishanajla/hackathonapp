import React, { Fragment } from 'react';
import { IonLabel, IonSelect, IonSelectOption, IonItem } from '@ionic/react';
import clients from '../../common/clients';
interface ContainerProps {
  onGenderChange: any;
  selectedValue: any;
}

interface ContainerState {
  genderValue: string;
  genderList: any;
}
class Gender extends React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      genderValue: props.selectedValue,
      genderList: ['Male', 'Female']
    }
  }  
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.selectedValue !== this.state.genderValue) {
      this.setState({ genderValue: nextProps.selectedValue });
    }
  }

  onChangeGender = (e: any) => {
    this.props.onGenderChange(e);
  }

  render() {
    return (
        <Fragment>
        <IonItem>
          <IonLabel>Gender</IonLabel>
          <IonSelect name='gender' value={this.state.genderValue} placeholder="Select Gender" onIonChange={this.onChangeGender}>
          {this.state.genderList.map((list: any) =>
            <IonSelectOption key={list} value={list}>{list}</IonSelectOption>
          )}
          </IonSelect>
        </IonItem>
      </Fragment>
    
    );
  }
}

export default Gender;
