import React, { Fragment } from 'react';
import {
  IonContent, IonPage, IonSelect, IonSelectOption, IonLabel,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonLoading, IonButtons, IonButton, IonIcon, IonToast
} from '@ionic/react';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import moment from 'moment';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import jsPDF from 'jspdf';
import clients from '../../common/clients';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import Header from '../Header/Header';
import './Report.scss';
import { downloadOutline } from 'ionicons/icons';
interface ContainerProps {
}
interface ContainerState {
  eventList: any;
  loading: boolean;
  eventDetails: any;
  showToast: boolean;
  toastMsg: string;
}
const finalStatus = ['selected', 'onhold', 'rejected'];

class Report extends React.Component<ContainerProps, ContainerState> {
  parentRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.state = {
      eventList: [],
      loading: false,
      eventDetails: [],
      showToast: false,
      toastMsg: ''
    };
    this.parentRef = React.createRef();

  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getEventList();
  }


  getEventList = async () => {
    try {
      const response = await clients.eventList.get('');
      this.setState({ eventList: response.data.arrRes, loading: false });
    }
    catch (error) {
      this.setState({ loading: false });
      return (error.response);
    }
  }

  onEventListChange = (e: any) => {
    this.setState({ loading: true });
    const reqObj = {
      event_id: e.target.value
    };
    this.getEventDetails(reqObj);
  }

  getEventDetails = async (reqObj: any) => {
    try {
      const response = await clients.eventReport.post('', reqObj);
      this.setState({ loading: false, eventDetails: response.data });
    }
    catch (error) {
      return (error.response);
    }
  }

  downloadReport = () => {
    const { eventDetails } = this.state;
    this.setState({ loading: true });
    setTimeout(() => {
      const eventName = eventDetails.Hackathon_Details[0].EventName;
      Doc.createPdf(this.parentRef.current.bodyRef.current, eventName);
      this.setState({ loading: false });
    }, 1500);
  }

  download = async () => {
    const { eventDetails } = this.state;
    const doc = new jsPDF('p', 'pt', 'letter');
    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(18);
    doc.text('Event Details', 50, 50);

    doc.setLineWidth(1);
    doc.setDrawColor(211);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(50, 70, 492, 230, 10, 10, 'FD');

    doc.setFillColor(211, 211, 211);
    doc.roundedRect(50, 70, 492, 30, 0, 10, 'F');

    doc.setFontType("normal");
    doc.setFontSize(14);
    doc.text(60, 91, eventDetails.Hackathon_Details[0].EventName);
    doc.setFontSize(12);
    doc.text('Event Details:', 60, 120);
    doc.text('Client Name:', 60, 150);
    doc.text('Location:', 60, 180);
    doc.text('Date:', 60, 210);
    doc.text('Duration:', 60, 240);
    doc.text('Skills:', 60, 270);

    doc.setFontType("bold");
    doc.text(eventDetails.Hackathon_Details[0].ClientName, 200, 150);
    doc.text(eventDetails.Hackathon_Details[0].Location, 200, 180);
    doc.text(new Date(eventDetails.Hackathon_Details[0].Date).toLocaleDateString(), 200, 210);
    doc.text(eventDetails.Hackathon_Details[0].Duration, 200, 240);
    doc.text(eventDetails.Hackathon_Details[0].skill_name, 60, 290);
    let cardYPos = 30;
    eventDetails.candidate_lists.forEach((list: any, index: number) => {
      if (list.feedback.length > 0) {
        doc.addPage();
        if (index === 0) {
          doc.setFont("helvetica");
          doc.setFontType("normal");
          doc.setFontSize(18);
          doc.text('Candidate Feedbacks', 50, cardYPos + 20);
          cardYPos = cardYPos + 40;
        }
        doc.setLineWidth(1);
        doc.setDrawColor(211);
        doc.setFillColor(255, 255, 255);
        const fbStatus = list.feedback.filter((fb: any) => fb.finalStatus.trim().length > 0);
        doc.roundedRect(50, cardYPos, 492, (80 + (list.feedback.length * 130) + (fbStatus.length * 20)), 10, 10, 'FD');
        doc.setFillColor(211, 211, 211);
        doc.roundedRect(50, cardYPos, 492, 50, 0, 10, 'F');

        doc.setFontType("normal");
        doc.setFontSize(14);
        if (list.candidate_image.length > 0) {
          doc.addImage(`data:image/jpeg;base64,${list.candidate_image}`, 'JPEG', 60, cardYPos + 10, 35, 35);
        } else {
          doc.addImage('data:image/png;base64,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', 'PNG', 60, cardYPos + 8, 35, 35);
        }
        cardYPos = cardYPos + 21;
        doc.text(list.EmpName + ' - Ph.No: ' + list.ContactNo, 110, cardYPos);
        doc.setFontSize(12);
        doc.setTextColor(102, 102, 102);
        cardYPos = cardYPos + 21;
        doc.text('e-mail: ' + list.EmailId, 110, cardYPos);

        list.feedback.forEach((feedback: any, index: number) => {
          cardYPos = cardYPos + 28;
          doc.setTextColor(0, 0, 0);
          doc.setFontType("bold");
          doc.text(feedback.label + ' Scores:', 60, cardYPos);
          cardYPos = cardYPos + 20;
          doc.setFontType("normal");
          doc.text('Technical:', 60, cardYPos);
          doc.setFontType("bold");
          doc.text(feedback.technical_skill, 200, cardYPos);
          cardYPos = cardYPos + 20;
          doc.setFontType("normal");
          doc.text('Logical:', 60, cardYPos);
          doc.setFontType("bold");
          doc.text(feedback.logical_skill, 200, cardYPos);
          cardYPos = cardYPos + 20;
          doc.setFontType("normal");
          doc.text('Communication:', 60, cardYPos);
          doc.setFontType("bold");
          doc.text(feedback.communication_skill, 200, cardYPos);
          if (feedback.finalStatus.length > 0) {
            cardYPos = cardYPos + 20;
            doc.setFontType("normal");
            const statusLabel = finalStatus.indexOf(feedback.finalStatus) >= 0 ? 'Status:' : 'Compentency Rating:';
            doc.text(statusLabel, 60, cardYPos);
            doc.setFontType("bold");
            doc.text(feedback.finalStatus, 200, cardYPos);
          }
          cardYPos = cardYPos + 20;
          doc.setFontType("normal");
          doc.text('Comments:', 60, cardYPos);
          cardYPos = cardYPos + 20;
          doc.setFontType("bold");
          doc.text(feedback.comments, 60, cardYPos);
          cardYPos = cardYPos + 10;
          if (list.feedback.length - 1 > index) {
            doc.setLineWidth(1);
            doc.line(60, cardYPos, 530, cardYPos);
          }
        });
        cardYPos = 30;
      }
    });
    let pdfOutput = doc.output();
    var dateTime = moment(new Date()).format("YYYY-MM-DDHH:mm:ss");
    const { Filesystem } = Plugins;
    const fileName = `${eventDetails.Hackathon_Details[0].EventName}${dateTime}.pdf`;
    try {
      const result = await Filesystem.writeFile({
        path: fileName,
        data: pdfOutput,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
      const fileOpen = await FileOpener.open(`file:///storage/emulated/0/Documents/${fileName}`, 'application/pdf');
      console.log('Wrote file', fileOpen);
      this.setState({
        showToast: true,
        toastMsg: 'File downloaded successfully.'
      })
    } catch (e) {
      console.error('Unable to write file', e);
    }
    doc.save(`${fileName}.pdf`);
  }

  toastOnDismiss = () => {
    this.setState({ showToast: false });
  }

  render() {
    const { eventList, loading, eventDetails, showToast, toastMsg } = this.state;
    const eventListOptions = {
      header: 'Event List',
      translucent: true
    };
    return (
      <IonPage className='reportPage'>
        <IonContent>
          <Header headerName="Event Reports" showBackBtn={true} isAdminStatus={this.props} />
          <IonGrid className='eventSelection'>
            <IonRow>
              <IonCol className='colClass colClassLeft' size="4">Event List</IonCol>
              <IonCol className='colClass colClassRight' size="6">
                <IonSelect interfaceOptions={eventListOptions} className='eventList' name='eventName' onIonChange={this.onEventListChange} placeholder="Event Name">
                  {eventList.map((item: any) =>
                    <IonSelectOption key={item.Name} value={item.EventId}>{item.Name}</IonSelectOption>
                  )}
                </IonSelect>
                {eventDetails.Hackathon_Details && <IonButtons className='downloadBtn'>
                  <IonButton onClick={this.download}>
                    <IonIcon slot="icon-only" icon={downloadOutline} />
                  </IonButton>
                </IonButtons>}
              </IonCol>
            </IonRow>
          </IonGrid>
          {eventDetails.Hackathon_Details && <Fragment>
            <h3 className='candidateListLabel'>Event Details</h3>
            <IonCard className='candidateCard'>
              <IonCardHeader className='candidateHeader'>
                <IonCardTitle className='title'>{eventDetails.Hackathon_Details[0].EventName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className='sprintScoreWrapper'>
                <IonLabel className='scoreTextLabel'>Event Details:</IonLabel>
                <div className='eventData'>
                  <IonLabel className='eventTitle'>Client Name:</IonLabel>
                  <IonLabel className='scoreTextLabel'>{eventDetails.Hackathon_Details[0].ClientName}</IonLabel>
                </div>
                <div className='eventData'>
                  <IonLabel className='eventTitle'>Location:</IonLabel>
                  <IonLabel className='scoreTextLabel'>{eventDetails.Hackathon_Details[0].Location}</IonLabel>
                </div>
                <div className='eventData'>
                  <IonLabel className='eventTitle'>Date:</IonLabel>
                  <IonLabel className='scoreTextLabel'>{new Date(eventDetails.Hackathon_Details[0].Date).toLocaleDateString()}</IonLabel>
                </div>
                <div className='eventData'>
                  <IonLabel className='eventTitle'>Duration:</IonLabel>
                  <IonLabel className='scoreTextLabel'>{eventDetails.Hackathon_Details[0].Duration}</IonLabel>
                </div>
                <div className='commentListItem'>
                  <IonLabel className='scoreTextLabel'>Skills:</IonLabel>
                  <p className='comment'>{eventDetails.Hackathon_Details[0].skill_name}</p>
                </div>
              </IonCardContent>
            </IonCard>

            {eventDetails.candidate_lists.map((list: any, index: number) =>
              (list.feedback.length > 0 &&
                <Fragment>
                  {index === 0 && <h3 className='candidateListLabel'>Candidate List</h3>}
                  <IonCard key={`${list.ContactNo}`} className='candidateCard'>
                    <IonCardHeader className='candidateHeader'>
                      {list.candidate_image.length > 0 ? <img src={`data:image/jpeg;base64,${list.candidate_image}`} style={{ borderRadius: '50%' }} height='50' width='50' alt='' />
                        : <img src='data:image/svg+xml;base64,ICAgIDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgaGVpZ2h0PScyMDAnIHdpZHRoPScyMDAnIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjYzVkYmZmIiBkPSJNMCAwaDUxMnY1MTJIMHoiLz48cGF0aCBkPSJNMjU2IDMwNGM2MS42IDAgMTEyLTUwLjQgMTEyLTExMlMzMTcuNiA4MCAyNTYgODBzLTExMiA1MC40LTExMiAxMTIgNTAuNCAxMTIgMTEyIDExMnptMCA0MGMtNzQuMiAwLTIyNCAzNy44LTIyNCAxMTJ2NTZoNDQ4di01NmMwLTc0LjItMTQ5LjgtMTEyLTIyNC0xMTJ6IiBmaWxsPSIjODJhZWZmIi8+PC9zdmc+Cg==' style={{ borderRadius: '50%' }} height='50' width='50' alt='' />
                      }
                      <div className='candidateInfo'>
                        <IonCardTitle className='title'>{list.EmpName} - Ph.No: {list.ContactNo}</IonCardTitle>
                        <IonCardSubtitle>Email: {list.EmailId}</IonCardSubtitle>
                      </div>
                    </IonCardHeader>
                    <IonCardContent className='sprintScoreWrapper'>
                      {list.feedback.map((feedback: any, index: number) =>
                        <div className='feedbackList' key={`feedback${index}`}>
                          <IonLabel className='scoreTextLabel'>{feedback.label} Scores:</IonLabel>
                          {feedback.AssesmentParam.map((list: any, index: number) =>
                          <div className='scoreItemList'>
                            <IonLabel className='scoreLabel'>{list.ParamName}:</IonLabel>
                          <IonLabel className='scoreTextLabel'>{list.ParamValue}</IonLabel>
                          </div>)}
                          {feedback.finalStatus.length>0 &&
                               <div className='scoreItemList'>
                               <IonLabel className='scoreLabel'>Status</IonLabel>
                               <IonLabel className='scoreTextLabel'><b>{feedback.finalStatus}</b></IonLabel>
                             </div>}
                          {/* {feedback.finalStatus.length > 0 &&
                            <div className='scoreItemList'>
                              <IonLabel className='scoreLabel'>{finalStatus.indexOf(feedback.finalStatus) >= 0 ? 'Status:' : 'Compentency Rating:'}</IonLabel>
                              <IonLabel className='scoreTextLabel'>{feedback.finalStatus}</IonLabel>
                            </div>
                          } */}
                          <div className='commentListItem'>
                            <IonLabel className='scoreTextLabel scoreLabel'>Comments:</IonLabel>
                            <p className='comment'>{feedback.comments}</p>
                          </div>
                        </div>
                      )}
                    </IonCardContent>
                  </IonCard>
                </Fragment>
              )
            )}
          </Fragment>
          }
        </IonContent>
        <IonLoading
          isOpen={loading}
          message={'Please wait...'}
        />
        <IonToast
          isOpen={showToast}
          message={toastMsg}
          onDidDismiss={this.toastOnDismiss}
          duration={1000}
          cssClass='toastMessage'
        />
      </IonPage>
    );
  }
}

export default Report;
