import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IntroPage from './pages/IntroPage/IntroPage';
import RequestPage from './pages/RequestPage/RequestPage';
import RequestCallPage from 'pages/RequestCallPage/RequestCallPage';
import WaitingPage from './pages/WaitingPage/WaitingPage';
import GroupPage from './pages/GroupPage/GroupPage';
import DetailPage from './pages/DetailPage/DetailPage';
import FinalPage from './pages/FinalPage/FinalPage';

function deserialize(binArray) {
  let str = "";
    for (let i = 0; i < binArray.length; i++) {
        str += String.fromCharCode(parseInt(binArray[i]));
    }
    return JSON.parse(str)
}

function App() {

  const { StreamServicePromiseClient } = require('./proto/message_grpc_web_pb');
  const { Empty, Message } = require('./proto/message_pb');

  const streamService = new StreamServicePromiseClient('http://localhost:8080', null, null);

  const stream = streamService.streamMessage(new Empty(), {});
  stream.on('data', response => {
    console.log('response.id', response.getId());
    console.log('response.data',  deserialize(response.getData()) );
  });

  stream.on('status', status => {
    console.log('status', status);
  });

  return (
    <div>
      <Switch>
        <Route component={IntroPage} path="/intro" exact />
        <Route component={RequestPage} path="/request" exact />
        <Route component={RequestCallPage} path="/requestcall" exact />
        <Route component={WaitingPage} path="/waiting" exact />
        <Route component={GroupPage} path="/group" exact />
        <Route component={DetailPage} path="/detail" exact />
        <Route component={FinalPage} path="/final" exact />
      </Switch>
    </div>
  );
}

export default App;
