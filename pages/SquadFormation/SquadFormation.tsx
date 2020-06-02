import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import { IonRadioGroup, IonContent, IonBadge, IonRadio, IonPage, IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonInput, IonButton, IonLoading, IonToast, IonAvatar, IonCheckbox, IonToolbar, IonSearchbar } from '@ionic/react';
import { SquadFormActions } from './modules/SquadFormActions';
import clients from '../../common/clients';
import CandidatePhoto from './CandidatePhoto';
import moment from 'moment';
import Avatar from './account.svg'
import './SquadFormation.scss';

interface ContainerProps {
    history: any;
    location: any;
}
interface ContainerState {
    squadRegister: any;
    squadId: any;
    formIsValid: boolean;
    loading: boolean;
    showToast: boolean;
    toastMsg: string;
    toastColor: string;
    eventDetailsList: any;
    squadList: any;
    checked: boolean;
    candidateList: any;
    candidateView: boolean;
    search: any;
    selectedCandidate: any;
    imgErr: string;
    selected: any;
    selectedSquad: any;
    squadTeamImg:any;
}

const inputField = {
    value: '',
    validation: {
        required: true
    },
    valid: false
};

const squadForm = {
    eventName: inputField,
    squadName: inputField,
}



class SquadFormation extends React.Component<ContainerProps, ContainerState> {
    imageRef: React.RefObject<HTMLDivElement>

    constructor(props: any) {
        super(props);
        this.state = {
            formIsValid: false,
            loading: false,
            showToast: false,
            toastMsg: '',
            toastColor: 'primary',
            squadId: '',
            selectedCandidate: [],
            squadList: [],
            eventDetailsList: [{ EventId: "1", Name: "hackathon" }, { EventId: "2", Name: "test" }],
            candidateList: [{ EmpID: "1", EmpName: "Marc" }, { EmpID: "2", EmpName: "Mary" }, { EmpID: "3", EmpName: "Aan" }],
            squadRegister: { ...squadForm },
            candidateView: false,
            search: '',
            imgErr: '',
            checked: false,
            selected: '',
            selectedSquad: '',
            squadTeamImg:'',

        }
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.getEventList();
    }


    getEventList = async () => {
        try {
            const response = await clients.eventList.get('');
            this.setState({ eventDetailsList: response.data.arrRes, loading: false });
        }
        catch (error) {
            return (error.response);
        }
    }

    getSquadList = (data: any) => {
        if (!this.state.loading) {
            this.setState({ loading: true })
            SquadFormActions.getSquadList(data).then((response: any) => {
                this.setState({ squadList: response.arrRes, loading: false });
            })
        }
    }


    checkValidity(inputValue: any, rules: any, inputType: any) {
        let value = '';
        if (inputValue) value = inputValue.toString();
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    getDataUrl(img: any) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);      
            return canvas.toDataURL('image/jpeg');
        }
    }

    inputFieldChange = (e: any) => {
        const targetName: string = e.target.name;
        const targetValue: string = e.target.value;
        const targetType: string = e.target.type;
        if (targetName === "eventName") {
            var data = { eventID: targetValue }
            this.getSquadList(data);
        }

        const updatedSquadForm = {
            ...this.state.squadRegister
        };
        const updatedFormElement = {
            ...updatedSquadForm[targetName]
        };
        updatedFormElement.value = targetValue;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType);
        updatedSquadForm[targetName] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedSquadForm) {
            formIsValid = updatedSquadForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ squadRegister: updatedSquadForm, formIsValid });
    }

    eventFieldChange=(e:any)=>{
        if(e.target.value){
            this.inputFieldChange(e)
        }
    }

    handleCheckClick = (e: any) => {
        if (e.target.checked) {
            //append to array
            this.setState({
                selectedCandidate: this.state.selectedCandidate.concat([e.target.value])
            })
        }
        else {
            //remove from array
            this.setState({
                selectedCandidate: this.state.selectedCandidate.filter(function (val: any) { return val.ID !== e.target.value.ID })
            })
        }
    }

    

    handleSquadCheckClick = (e: any) => {
        var value = JSON.parse(e);
        var image=value.squad_team_img;        
        const base64 = value.squad_team_img !== "" ? 'data:image/jpeg;base64,'+image : "";
        if (value.ID !== this.state.squadId) {
            const updatedSquadForm = { ...this.state.squadRegister };
            const updatedFormElement = { ...updatedSquadForm['squadName'] };
            updatedFormElement.value = value.SquadName;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, '');
            updatedSquadForm['squadName'] = updatedFormElement;
            this.setState({ squadId: value.ID, squadRegister: updatedSquadForm, checked: true, selectedSquad: value.SquadName, squadTeamImg:base64
            })          
        }
        else {
            const updatedSquadForm = { ...this.state.squadRegister };
            const updatedFormElement = { ...updatedSquadForm['squadName'] };
            updatedFormElement.value = '';
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, '');
            updatedSquadForm['squadName'] = updatedFormElement;
            this.setState({ checked: false, selectedSquad: '', squadRegister: updatedSquadForm,squadId:'' })
        }
    }

    nextClick = () => {
        const formData: any = {};
        const { squadRegister } = this.state;
        const resetSquadData = {
            ...squadRegister
        };
        for (let inputIdentifier in resetSquadData) {
            formData[inputIdentifier] = resetSquadData[inputIdentifier].value;
        }
        var dateTime = new Date(), imageSrc, imageBase64
        var date = moment(dateTime).format("YYYY-MM-DD HH:mm:ss")
        var reqObj = {
            SquadID: this.state.squadId,
            SquadName: formData.squadName,
            EventID: formData.eventName,
            CreatedDate: date,
            CreatedBy: '1',
            UpdatedBy: '1',
            UpdatedDate: date,
        }       
        if (this.imageRef.current && this.imageRef.current.children && this.imageRef.current.children[0].children[0].tagName === 'IMG') {
            imageSrc = this.imageRef.current.children[0].children[0];
             imageBase64 = this.getDataUrl(imageSrc);
              var pair = { teamImg: imageBase64 && imageBase64.replace('data:image/jpeg;base64,', '') }
             reqObj = { ...reqObj, ...pair } 
        }                   
           // list of candidate
            const req = { 'event_id': formData.eventName }
            var toastMsg = '', selectedCandidate = this.state.selectedCandidate, showTost: false
            if (this.state.checked) {
                const request = { 'squad_name': formData.squadName }
                SquadFormActions.editSquadImage(reqObj).then((response: any) => {
                    if (response.errCode === 200) {
                    document.dispatchEvent(new CustomEvent("removePhoto", {
                        detail: { removePhoto: true }
                    }))
                    SquadFormActions.getSquadCandidateList(request).then((response: any) => {
                        this.getCandidatesEvent(req, this.state.squadId, resetSquadData, toastMsg, showTost, response.arrRes)
                    })
                }

                })
            }
            else {
                SquadFormActions.addSquad(reqObj).then((response: any) => {
                    if (response.errCode === 200) {
                        var toastMsg = 'Squad Created successfully', showTost = true
                        this.getCandidatesEvent(req, response.squadId, resetSquadData, toastMsg, showTost, selectedCandidate)
                    }
                    else {
                        this.setState({
                            loading: false,
                            showToast: true,
                            toastColor: "danger",
                            toastMsg: response.status,
                        });
                    }

                });

            }
    }

 

    getCandidatesEvent = (req: any, squadId: any, resetSquadData: any, toastMsg: any, showToast: any, selectedCandidate: any) => {
        this.setState({ loading: true })
        const squadName=this.state.squadRegister.squadName.value
        SquadFormActions.getCandidateList(req).then((res: any) => {
            var candidates= res.arrRes.filter(function (val: any) { return val.SquadName ===squadName||val.SquadName==null })
            this.setState({
                candidateList: candidates,
                squadRegister: { ...resetSquadData },
                selectedCandidate: selectedCandidate,
                loading: false,
                squadId: squadId,
                showToast: showToast,
                toastMsg: toastMsg,
                formIsValid: false,
                candidateView: true,
            });
        })
    }



    searchCandidates = (e: any) => {
        var value = e.target.value, id = this.state.squadRegister.eventName.value
        if (value.length >= 3 || value.length === 0) {
            const req = { 'emp_name': value, 'event_id': id }
            if (this.state.loading === false) {
                this.setState({ loading: true })
                SquadFormActions.getCandidateList(req).then((res: any) => {
                    this.setState({
                        loading: false, candidateList: res.arrRes, search: value
                    })
                })
            }
        }
    }

    submitSquad = () => {
        const formData = this.state.squadRegister
        const candidateList = this.state.selectedCandidate.map((list: any) => {
            return list.ID;
        });
        // var date = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
        const reqObj = {
            SquadID: this.state.squadId,
            CandidateID: candidateList,
            EventID: formData.eventName.value,
            isActive: true,
            CreatedBy: "1",
            UpdatedBy: "1",
        }
        if (this.state.selectedCandidate.length !== 0) {
            this.setState({ loading: true });
            SquadFormActions.squadCandidatesInsert(reqObj).then((res: any) => {
                if (res.errCode === 200) {
                    const { squadRegister } = this.state;
                    const resetSquadData = {
                        ...squadRegister
                    };
                    for (let inputIdentifier in resetSquadData) {
                        formData[inputIdentifier] = resetSquadData[inputIdentifier].value;
                        resetSquadData[inputIdentifier].value = '';
                        resetSquadData[inputIdentifier].valid = false;
                    }
                    this.setState({
                        toastMsg: "Squad Registered successfull",
                        showToast: true,
                        loading: false,
                        candidateView: false,
                        squadList: [],
                        squadRegister: { ...resetSquadData },
                    });
                    this.props.history.push('/homePage');
                }
                else {
                    this.setState({
                        loading: false,
                        showToast: true,
                        toastMsg: res.status,
                    });

                }

            })
        }
        else {
            this.setState({ toastMsg: "Please Select Candidate For Squad", showToast: true })
        }
    }

    toastOnDismiss = () => {
        this.setState({ showToast: false });
    }

    goToBack = () => {
        this.props.history.goBack();
    }
    goToCandidateReg = () => {
        this.props.history.push('/candidateReg');
    }

    render() {
        const { formIsValid, loading, toastMsg, toastColor, showToast, squadRegister, eventDetailsList, squadList, candidateView, candidateList, selectedCandidate, imgErr, checked, search,squadTeamImg } = this.state;
       
     if (sessionStorage.getItem('isAdmin') === null) {
            return (<Redirect to="/home" />);
        }
        else {
            return (
                <IonPage className='squadFormContainer'>
                    <Header headerName="Squad Registration" showBackBtn={true} isAdminStatus={this.props} />
                    {!candidateView ?
                        <IonContent>
                            <div ref={this.imageRef}>
                                <CandidatePhoto  fetchedImage= {squadTeamImg} />
                            </div>
                            {imgErr.length > 0 && <div className='imageErr'>{imgErr}</div>}
                            <IonList>
                                <IonItem>
                                    <IonLabel> Event</IonLabel>
                                    <IonSelect name='eventName' value={squadRegister.eventName.value} onIonChange={this.eventFieldChange}>
                                        {eventDetailsList.map((list: any) =>
                                            <IonSelectOption key={list.EventId} value={list.EventId}>{list.Name}</IonSelectOption>
                                        )}
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className='ionLabel' position="fixed">Squad Name</IonLabel>
                                    <IonInput
                                        inputmode='text'
                                        name='squadName'
                                        value={squadRegister.squadName.value}
                                        onIonChange={this.inputFieldChange}
                                        required
                                        disabled={checked}
                                    />
                                </IonItem>
                                {squadList.map((list: any) =>
                                    <IonRadioGroup value={this.state.selectedSquad} key={list.ID} >
                                        <IonItem >
                                            <IonLabel>{list.SquadName}</IonLabel>
                                            <IonRadio slot="start" value={list.SquadName} onClick={() => this.handleSquadCheckClick(JSON.stringify(list))} />
                                        </IonItem>
                                    </IonRadioGroup>
                                )}
                            </IonList>
                            <div className='squadFormCntrlPanel'>
                                <IonButton className='appButton' disabled={!formIsValid} onClick={this.nextClick}>Next</IonButton>
                            </div>
                        </IonContent>
                        :
                        <IonContent>
                            <IonList>
                                <IonItem>
                                    <IonToolbar>
                                        <IonSearchbar placeholder="Search Candidates" value={search} onIonChange={this.searchCandidates}></IonSearchbar>
                                    </IonToolbar>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Squad Name : <b>{squadRegister.squadName.value}</b>  </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Selected Count</IonLabel>
                                    <IonBadge>{selectedCandidate.length} </IonBadge>
                                </IonItem>
                                {candidateList.map((list: any) =>
                                    <IonItem key={list.ID}>
                                        <IonAvatar slot="start">
                                            <img src={Avatar} alt="AvatarImage" />
                                        </IonAvatar>
                                        <IonLabel>
                                            <h3>{list.EmpName}</h3>
                                            <p>{list.SkillName}</p>
                                        </IonLabel>
                                        {selectedCandidate.some((data: any) => data.ID === list.ID) ?
                                            <IonCheckbox name="selectedCandidateList" checked={true} value={list} onClick={this.handleCheckClick} />
                                            : <IonCheckbox name="selectedCandidateList" checked={false} value={list} onClick={this.handleCheckClick} />
                                        }
                                    </IonItem>
                                )}
                            </IonList>
                            <div className='squadFormCntrlPanel'> 
                                             
                                <IonButton className='appButton' disabled={false} onClick={this.submitSquad}>Submit</IonButton>
                            </div>                         
                               
                             {/*   <IonFab className="tooltip" vertical="bottom" horizontal="end" slot="fixed">
                                <span className="tooltiptext tooltip-left">Create Candidate</span>
                                <IonFabButton>
                                    <IonIcon icon={add} onClick={this.goToCandidateReg} />
                                </IonFabButton>
                                    </IonFab>  */}                         
                           
                        </IonContent>
                    }

                    <IonLoading
                        isOpen={loading}
                        message={'Please wait...'}
                    />
                    <IonToast
                        isOpen={showToast}
                        message={toastMsg}
                        color={toastColor}
                        onDidDismiss={this.toastOnDismiss}
                        duration={1000}
                        cssClass='toastMessage'
                    />
                </IonPage>
            );
        }
    }
}

export default SquadFormation;
