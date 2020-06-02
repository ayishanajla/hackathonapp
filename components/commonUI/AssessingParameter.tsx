import React, {Fragment} from 'react';
import { IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import clients from '../../common/clients';

interface ContainerProps {
  onEventChange: any;
  selectedValue: any;
}

interface ContainerState {
  assessingParameter: any;
  assessingParameterList:any;
}
class AssessingParameter extends React.Component<ContainerProps, ContainerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      assessingParameter: props.selectedValue,
      assessingParameterList:[]
    }

  }

  componentDidMount() {
    this.getAssessList().then((response: any) => {
      this.setState({ assessingParameterList:  response.arrRes,assessingParameter:this.props.selectedValue});
    })
    }

    getAssessList = async () => {
    try {
        let data={event_id:0}
        const response = await clients.AssessList.post('', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
}


  componentWillReceiveProps(nextProps: any){
    if(nextProps.selectedValue !== this.state.assessingParameter) {
        this.setState({ assessingParameter: nextProps.selectedValue });
    }
  }

  assessingPrmtrOnChange = (e: any) => {
    this.setState({
      assessingParameter: e.detail.value
    });
     this.props.onEventChange(e);
  }

  render() {
    const { assessingParameter, assessingParameterList } = this.state;
    // console.log(assessingParameter)
    return (
        <Fragment>
          <IonLabel>Assessing Parameter</IonLabel>
          <IonSelect name='assessingParameter' value={assessingParameter} multiple={true} placeholder="Select Parameter" onIonChange={this.assessingPrmtrOnChange}>
          {assessingParameterList.map((list: any) =>
            <IonSelectOption key={list.AssId} value={list.AssId}>{list.AssName}</IonSelectOption>
          )}
          </IonSelect>
        </Fragment>
    );

  }
};

export default AssessingParameter;
