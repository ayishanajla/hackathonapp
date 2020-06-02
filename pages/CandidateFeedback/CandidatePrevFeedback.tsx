import React, { Fragment } from 'react';
import { IonList, IonListHeader, IonItemGroup, IonItemDivider, IonLabel, IonIcon, IonContent, IonText } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import './CandidateFeedback.scss';


interface ContainerState {
  sprintFBList: any;
}

interface ContainerProps {
  candidateFeedbackList: any;
  currentCandidate: any;
}

class CandidatePrevFeedback extends React.Component<ContainerProps, ContainerState> {

  constructor(props: any) {
    super(props);
    const updateList = props.candidateFeedbackList.map((list: any, index: number) => {
      return Object.assign(list, { isOpen: false, index });
    });
    this.state = {
      sprintFBList: updateList
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.candidateFeedbackList !== this.state.sprintFBList) {
      const updateList = nextProps.candidateFeedbackList.map((list: any, index: number) => {
        return Object.assign(list, { isOpen: false, index });
      });
      this.setState({ sprintFBList: updateList });
    }
  }

  showSprintFeedback = (list: any) => {
    const { sprintFBList } = this.state;
    const updateSprintFB = [...sprintFBList];
    const listIndex = updateSprintFB.findIndex((item: any) => item.index === list.index);
    updateSprintFB[listIndex].isOpen = !sprintFBList[listIndex].isOpen;
    this.setState({ sprintFBList: updateSprintFB });
  }

  render() {
    const { sprintFBList } = this.state;
    return (
      <IonContent>
        <IonList mode='ios'>
          <IonListHeader className='listHeader'>Feedback Details - Name: {this.props.currentCandidate.EmpName}</IonListHeader>
          <IonItemGroup>
            {sprintFBList.length === 0 && 
            <IonText color="danger" className='nofeedback'>
              <h3>Currently no Feedback submitted for this candidate.</h3></IonText>
            }
            {sprintFBList.length > 0 && sprintFBList.map((list: any, index: number) =>
              <Fragment>
                <IonItemDivider key={`feedback${list.index}`} onClick={() => this.showSprintFeedback(list)}>
                  <IonLabel className='sprintLabel'>{list.sprintLevel}</IonLabel>
                  {!list.isOpen && <IonIcon slot="end" icon={chevronDownOutline}></IonIcon>}
                  {list.isOpen && <IonIcon slot="end" icon={chevronUpOutline}></IonIcon>}
                </IonItemDivider>
                {list.isOpen &&
                  <div className='sprintScoreWrapper'>
                    <IonLabel className='scoreTextLabel'>Scores:</IonLabel>
                    {list.AssesmentParams.map((val: any, index: number) =>
                       <div className='scoreItemList'>
                       <IonLabel>{val.ParamName}:</IonLabel>
                       <IonLabel className='scoreTextLabel'>{val.ParamValue}</IonLabel>
                     </div>
                    )}
                 
                    <div className='commentListItem'>
                      <IonLabel className='scoreTextLabel'>Comments:</IonLabel>
                      <p className='comment'>{list.feedbackTxt}</p>
                    </div>
                  </div>
                }
              </Fragment>
            )
            }
          </IonItemGroup>
        </IonList>

      </IonContent>
    )
  }
}

export default CandidatePrevFeedback;