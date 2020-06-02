import React, { Fragment } from 'react';
import { IonLabel, IonSelect, IonSelectOption, IonItem, IonCheckbox, IonList } from '@ionic/react';
import clients from '../../common/clients';

interface ContainerProps {
  onEventChange: any;
  selectedValue: any;
  selected:any;
  disabled:boolean;
  
}

interface ContainerState {
  selectedLevel: any;
  assessmentLevel: any;
  assessmentLevelList: any;
}

class LevelOfAssessment extends React.Component<ContainerProps, ContainerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      assessmentLevel: props.selectedValue,
      selectedLevel: props.selected,
      assessmentLevelList: []
    }
  }

  componentDidMount() {
    this.getAssessingParamsList().then((response: any) => {
      this.setState({ assessmentLevelList: response.arrRes,selectedLevel:this.props.selected,assessmentLevel:this.props.selectedValue});
    })
  }

  getAssessingParamsList = async () => {
    try {
      const response = await clients.assessingParamsList.get('');
      return (response.data);

    }
    catch (error) {
      return (error.response);
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.selectedValue !== this.state.assessmentLevel) {
      this.setState({ assessmentLevel: nextProps.selectedValue });
    }
    if (nextProps.selected !== this.props.selected) {
      this.setState({ selectedLevel: nextProps.selected });
    }
  }

  onLevelChange = (e: any) => {
    const selectedLevelCheck: any = [];
    if (Number(e.target.value) > 0) {
      for (let i = 0; i < Number(e.target.value) + 2; i++) {
      selectedLevelCheck.push({
        id: i,
        value: i === (Number(e.target.value) + 1) ? 'Final Assessment' : `Sprint ${i}`,
        checked: true
      });
    }
  }
    this.setState({ selectedLevel: selectedLevelCheck, assessmentLevel: e.target.value });
    this.props.onEventChange(e);
  }

  onSprintLevelChange = (e: any) => {
    const updateSelectedLevel = [...this.state.selectedLevel];
    updateSelectedLevel.find((list: any) => list.id === Number(e.detail.value)).checked = e.detail.checked;
    this.setState({ selectedLevel: updateSelectedLevel });
  }

  render() {
    const { selectedLevel, assessmentLevel, assessmentLevelList } = this.state;    
    // console.log(this.props.selectedValue)
    // console.log(assessmentLevel)
    return (
      <Fragment >
        <IonItem disabled={this.props.disabled}>
          <IonLabel>No of Sprint</IonLabel>
          <IonSelect name='assessmentLevel' value={assessmentLevel} placeholder="Select level" onIonChange={this.onLevelChange}>
            {
              assessmentLevelList.map((list: any) =>
                <IonSelectOption key={list.AssessmentId} value={list.AssessmentId}>{list.AssementScaleName}</IonSelectOption>
              )
            }
          </IonSelect>
        </IonItem>
        {selectedLevel.length > 0 && 
        <div>
          <IonList >
          { selectedLevel.map((list: any) => (
            <IonItem key={list.id} disabled={this.props.disabled}>
              <IonLabel>{list.value}</IonLabel>
              <IonCheckbox slot="end" checked={list.checked} value={list.id} onIonChange={this.onSprintLevelChange}/>
            </IonItem>
          ))}
          </IonList>
        </div>}
      </Fragment>
    );
  }
};

export default LevelOfAssessment;
