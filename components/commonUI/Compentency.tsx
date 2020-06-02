import React, {Fragment} from 'react';
import { IonTextarea, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip, IonIcon } from '@ionic/react';
import './css/SkillListMenu.css'
import clients from '../../common/clients';

interface ContainerProps {
  onEventChange: any;
  showCompentencyChips: boolean;
  selectedValue: any;
  isCompentency: boolean;
  eventcompentencyList: any;
  eventDisabled: boolean;
}

interface ContainerState {
  selectedCompentency: any;
  showCompentencyChips: boolean;
  compentencySetList: any;
  eventcompentencyList: any;
}

class competancyList extends React.Component<ContainerProps, ContainerState> {
  compentencyList: never[];
  constructor(props: any) {
    super(props);
    this.state = {
      selectedCompentency: props.selectedValue,
      showCompentencyChips: !!props.showCompentencyChips,
      compentencySetList: [],
      eventcompentencyList: []
    };
    this.compentencyList = [];
  }

  componentDidMount() {
    this.getCompentencySetList().then((response: any) => {
        if(this.props.isCompentency) {
          this.setState({ compentencySetList:  response});
          this.compentencyList = response;
        }else {
          this.setState({ compentencySetList: response });

        }
    })
    }

  getCompentencySetList = async () => {
    try {
        const response = await clients.competancyList.get('');
        return (response.data.arrRes);
    }
    catch (error) {
        return (error.response);
    }
}

  componentWillReceiveProps(nextProps: any){
    if(nextProps.selectedValue !== this.state.selectedCompentency) {
      if(this.state.compentencySetList.length !== 0) {
         this.setState({ selectedCompentency: nextProps.selectedValue });
      }
    }
    if(nextProps.eventcompentencyList !== this.state.eventcompentencyList && nextProps.isCompentency) {
      const eventSkillArr = this.compentencyList.filter((list: any) => nextProps.eventcompentencyList.includes(list.SkillId));
      this.setState({ compentencySetList: eventSkillArr });
    }
  }

  compentencyOnChange = (e: any) => {
    this.setState({
      selectedCompentency: e.detail.value
    });
    this.props.onEventChange(e);
  }

  onIconClick = (value: string) => {
    const { selectedCompentency } = this.state;
    const filteredItems = selectedCompentency.filter((item: any) => item !== value);
    this.setState({ selectedCompentency: filteredItems });
  }

  render() {
    const { selectedCompentency, showCompentencyChips, compentencySetList } = this.state;
    return (
      <Fragment>
        <IonItem disabled={this.props.eventDisabled}>
          <IonLabel>Compentency Rating</IonLabel>
          <IonSelect name='competancy' multiple={true} value={selectedCompentency} onIonChange={this.compentencyOnChange} placeholder="Select Compentency">
            {
              compentencySetList.map((item: any) =>
              item.CompetancyName !==""? <IonSelectOption key={item.ID} value={item.ID}>{item.CompetancyName}</IonSelectOption>: null
              )
            }
          </IonSelect>
        </IonItem>
        {showCompentencyChips && selectedCompentency.length > 0 && <div className='skillSetContainer'>

          {selectedCompentency.map((value: any, index: number) =>
            (
              value !== 'others' &&
              <IonChip outline color="dark" key={index}>
                <IonLabel>{compentencySetList.filter((item: any) => item.ID === value)[0].CompetancyName}</IonLabel>
                {!this.props.eventDisabled && <IonIcon onClick={() => this.onIconClick(value)} name="close-circle"></IonIcon>}
              </IonChip>
            )
          )}
          {
            selectedCompentency.indexOf('others') >= 0 &&
            <IonTextarea placeholder="Enter other skill set details..."></IonTextarea>
          }
        </div>}
      </Fragment>
    );
  }
}

export default competancyList;