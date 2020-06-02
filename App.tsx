import React, { Component } from "react";
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Provider} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from "./reducers/index";
import { PersistGate } from 'redux-persist/integration/react'
import Home from './pages/Home/Home';
import ServerError from './components/commonUI/ServerError'
import RegisterPanel from './pages/PanelRegistration/PanelRegistration';
import RegisterEvent from './pages/RegisterEvent/RegisterEvent';
import CandidateRegistration from './pages/CandidateRegistration/CandidateRegistration';
import CandidateFeedback from './pages/CandidateFeedback/CandidateFeedback';
import CandidateSelection from './pages/CandidateFeedback/CandidateSelection';
import SquadFormation from './pages/SquadFormation/SquadFormation';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import AddMasterData from './pages/MasterData/AddMasterData';
import Report from './pages/Report/Report';
import EventStatus from './pages/EventStatus/EventStatus';
import ClientFeedback from './pages/ClientFeedback/ClientFeedback'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.scss';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers)
const composeEnhancers = compose;

// let store = createStore(persistedReducer, 
//   applyMiddleware(thunk)
// );

let store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));

let persistor = persistStore(store)

class App extends Component {
  state = {
    isDisconnected: false
  }

  componentDidMount() {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    axios.get('http://proctor.eastus.cloudapp.azure.com/hackeranchor/RegEventList.php', { headers })
      .then(() => {
        this.setState({ isDisconnected: false })
      }).catch(() => this.setState({ isDisconnected: true })

      )
  }



  render(){
  return(
    !this.state.isDisconnected?
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
 <IonApp className='rootApp'>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/registerPanel" component={RegisterPanel} />
        <Route path="/home" component={Login} />
        <Route path="/homePage" component={Home} />
        <Route path="/registerEvent" component={RegisterEvent} />
        <Route path="/candidateReg" component={CandidateRegistration} />
        <Route path="/candidateSelection" component={CandidateSelection} />
        <Route path="/candidateFeedback" component={CandidateFeedback} />
        <Route path="/squadFormation" component={SquadFormation} />
        <Route path="/signUp" component={SignUp} />
        <Route path = "/more" component={AddMasterData} />
        <Route path="/Report" component={Report}/>
        <Route path="/eventStatus" component={EventStatus}/>
        <Route path="/clientFeedback" component={ClientFeedback}/>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  </PersistGate>
  </Provider>:<ServerError/>
  )}
  }

export default App;
