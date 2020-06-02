import axios from 'axios';

const registerEventClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/insertEventNew.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const editEventClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/editEventNew.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const candidateRegisterClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/registerCandidate.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const validateCandidateNo= axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/fetchDataByContactNo.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const candidateSearch=axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/candidateSearch.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
})


const candidateFBClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/squadFeedback.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const skillSetListClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/skillList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const AssessListClient=axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/OtherAssessList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const durationListClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/durationList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const assessingParamsListClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/assesscaleList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const clientDetailsList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/clientList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});
const competancyList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/competancyList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const eventListClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/RegEventList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const addSquad = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/addSquad.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const squadCandidatesInsert = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/squadCandidatesInsert.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const squadListClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/squadList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const squadCandidateListClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/candidateBySquadList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

const squadCandidatesList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/squadCandidatesList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const addClientClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/clientRegister.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});
const addCompetancy = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/addCompetancyLevel.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const candidateListClient =  axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/candidatesList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const EventByUser =  axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/EventByUserNew.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'
    }
});

const registerPanel = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/addPanelDetails.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'    }
});

const signUpDetails = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/signup.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'   }
});

const loginDetails = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/login.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'   }
});

const userListDetails = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/userList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'   }
});

const searchUserListDetails = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/userSearch.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'   }
});
const searchAdminListDetails= axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/adminList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'   }
});
const candidateFeedbackList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/clientFeedbackLists.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'   }
});

const CloseEvent = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/EventClosed.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});

const getPanelList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/panelList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});

const eventReportClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/reportListApi.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});
const editSquadImage = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/editSquadImg.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
}); 


const feedbackSummaryClient = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/fbSummary.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});

const addSkill = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/addSkill.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});

const addAssessment=axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/addOtherAssessment.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});

const clientFeedbackOnEvent = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/eventFeedback.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});
const addNewLocation = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/addLocation.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});
 const eventLocations = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/hackeranchor/locationList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain'}
});

const clients = {
    registerEvent: registerEventClient,
    editEvent:editEventClient,
    candidateRegister: candidateRegisterClient,
    validateCandidateNo:validateCandidateNo,
    candidateSearch,candidateSearch,
    candidateFB: candidateFBClient,
    skillSetList: skillSetListClient,
    AssessList: AssessListClient,
    durationList: durationListClient,
    clientDetailsList: clientDetailsList,
    competancyList:competancyList,
    assessingParamsList: assessingParamsListClient,
    eventList: eventListClient,
    squadList: squadListClient,
    addSquad:addSquad,
    squadCandidatesInsert:squadCandidatesInsert,
    squadCandidateList: squadCandidateListClient,
    eventLocations: eventLocations,
    addClient: addClientClient,
    addCompetancy:addCompetancy,
    candidateListClient: candidateListClient,
    registerPanel: registerPanel,
    squadCandidatesList:squadCandidatesList,
    signUpDetails : signUpDetails,
    loginDetails: loginDetails,
    eventByUser:EventByUser,
    userListDetails: userListDetails,
    candidateFeedbackList:candidateFeedbackList,
    closeEvent:CloseEvent,
    searchUserListDetails: searchUserListDetails,
    searchAdminListDetails:searchAdminListDetails,
    getPanelList:getPanelList,
    eventReport: eventReportClient,
    editSquadImage: editSquadImage,
    feedbackSummary: feedbackSummaryClient,
    addSkill: addSkill,
    addAssessment: addAssessment,
    clientFeedbackOnEvent: clientFeedbackOnEvent,
    addNewLocation: addNewLocation
}

export default clients;