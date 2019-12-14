import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IntroPage from './pages/IntroPage/IntroPage';
import RequestPage from './pages/RequestPage/RequestPage';
import RequestCallPage from 'pages/RequestCallPage/RequestCallPage';
import WaitingPage from './pages/WaitingPage/WaitingPage';
import GroupPage from './pages/GroupPage/GroupPage';
import DetailPage from './pages/DetailPage/DetailPage';
import FinalPage from './pages/FinalPage/FinalPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DriverDetailPage from './pages/DriverDetailPage/DriverDetailPage'
import RiderDetailPage from './pages/RiderDetailPage/RiderDetailPage'
import DriverFinalPage from './pages/DriverFinalPage/DriverFinalPage'
import RiderFinalPage from './pages/RiderFinalPage/RiderFinalPage'

function App() {
  return (
    <div>
      <Switch>
        <Route component={IntroPage} path="/" exact />
        <Route component={RegisterPage} path="/register" exact />
        <Route component={RequestPage} path="/request" exact />
        <Route component={RequestCallPage} path="/requestcall" exact />
        <Route component={WaitingPage} path="/waiting" exact />
        <Route component={GroupPage} path="/group" exact />
        <Route component={DetailPage} path="/detail" exact />
        <Route component={DriverDetailPage} path="/driverdetail" exact />
        <Route component={DriverFinalPage} path="/driverdetail" exact />
        <Route component={RiderDetailPage} path="/riderdetail" exact />
        <Route component={RiderFinalPage} path="/riderfinal" exact />
        <Route component={FinalPage} path="/final" exact />
        <Route component={LoginPage} path="/login" exact />
      </Switch>
    </div>
  );
}

export default App;
