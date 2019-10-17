import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import IntroPage from './pages/IntroPage/IntroPage';
import RequestPage from './pages/RequestPage/RequestPage';
import WaitingPage from './pages/WaitingPage/WaitingPage';
import GroupPage from './pages/GroupPage/GroupPage';
import DetailPage from './pages/DetailPage/DetailPage';
import FinalPage from './pages/FinalPage/FinalPage';

function App() {
  return (
    <div>
      <div>Ya-Ta!</div>
      <Switch>
        <Route component={IntroPage} path="/intro" exact />
        <Route component={RequestPage} path="/request" exact />
        <Route component={WaitingPage} path="/waiting" exact />
        <Route component={GroupPage} path="/group" exact />
        <Route component={DetailPage} path="/detail" exact />
        <Route component={FinalPage} path="/final" exact />
      </Switch>
    </div>
  );
}

export default App;
