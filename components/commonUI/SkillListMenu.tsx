import React, {Fragment} from 'react';
import { IonTextarea, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip, IonIcon } from '@ionic/react';
import './css/SkillListMenu.css'
import clients from '../../common/clients';

interface ContainerProps {
  onEventChange: any;
  showSkillChips: boolean;
  selectedValue: any;
  isCandidateSkill: boolean;
  eventSkillList: any;
  eventDisabled: boolean;
}

interface ContainerState {
  selectedSkillSet: any;
  showSkillChips: boolean;
  skillSetList: any;
  eventSkillList: any;
}

class SkillListMenu extends React.Component<ContainerProps, ContainerState> {
  skillList: never[];
  constructor(props: any) {
    super(props);
    this.state = {
      selectedSkillSet: props.selectedValue,
      showSkillChips: !!props.showSkillChips,
      skillSetList: [],
      eventSkillList: []
    };
    this.skillList = [];
  }

  componentDidMount() {
    this.getSkillSetList().then((response: any) => {
        if(this.props.isCandidateSkill) {
          this.setState({ skillSetList:  response.arrRes});
          this.skillList = response.arrRes;
        }else {
          this.setState({ skillSetList: response.arrRes });

        }
    })
    }

  getSkillSetList = async () => {
    try {
        const response = await clients.skillSetList.get('');
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
}

  componentWillReceiveProps(nextProps: any){
    if(nextProps.selectedValue !== this.state.selectedSkillSet) {
      if(this.state.skillSetList.length !== 0) {
         this.setState({ selectedSkillSet: nextProps.selectedValue });
      }
    }
    if(nextProps.eventSkillList !== this.state.eventSkillList && nextProps.isCandidateSkill) {
      const eventSkillArr = this.skillList.filter((list: any) => nextProps.eventSkillList.includes(list.SkillId));
      this.setState({ skillSetList: eventSkillArr });
    }
  }

  skillOnChange = (e: any) => {
    this.setState({
      selectedSkillSet: e.detail.value
    });
    this.props.onEventChange(e);
  }

  onIconClick = (value: string) => {
    const { selectedSkillSet } = this.state;
    const filteredItems = selectedSkillSet.filter((item: any) => item !== value);
    this.setState({ selectedSkillSet: filteredItems });
  }

  render() {
    const { selectedSkillSet, showSkillChips, skillSetList } = this.state;
    return (
      <Fragment>
        <IonItem disabled={this.props.eventDisabled}>
          <IonLabel>Skill List</IonLabel>
          <IonSelect name='skillset' multiple={true} value={selectedSkillSet} onIonChange={this.skillOnChange} placeholder="Select skills">
            {
              skillSetList.map((item: any) =>
              item.Skills !==""? <IonSelectOption key={item.SkillId} value={item.SkillId}>{item.Skills}</IonSelectOption>: null
              )
            }
          </IonSelect>
        </IonItem>
        {showSkillChips && selectedSkillSet.length > 0 && <div className='skillSetContainer'>

          {selectedSkillSet.map((value: any, index: number) =>
            (
              value !== 'others' &&
              <IonChip outline color="dark" key={index}>
                <IonLabel>{skillSetList.filter((item: any) => item.SkillId === value)[0].Skills}</IonLabel>
                {!this.props.eventDisabled && <IonIcon onClick={() => this.onIconClick(value)} name="close-circle"></IonIcon>}
              </IonChip>
            )
          )}
          {
            selectedSkillSet.indexOf('others') >= 0 &&
            <IonTextarea placeholder="Enter other skill set details..."></IonTextarea>
          }
        </div>}
      </Fragment>
    );
  }
}

export default SkillListMenu;