import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const { StreamServicePromiseClient } = require('../../proto/message_grpc_web_pb');
const { Empty, Message } = require('../../proto/message_pb');

function deserialize(binArray) {
  let str = "";
  for (let i = 0; i < binArray.length; i++) {
    str += String.fromCharCode(parseInt(binArray[i]));
  }
  return JSON.parse(str)
}


WaitingContainer.propTypes = {};


const streamService = new StreamServicePromiseClient('http://localhost:8080', null, null);

const stream = streamService.streamMessage(new Empty(), {});

function WaitingContainer({ history }) {
  const [sec, setSec] = useState(0);

  stream.on('data', response => {
    console.log('response.data',  deserialize(response.getData()) );
    const result = deserialize(response.getData());
    setSec(result.count)
  });

  stream.on('status', status => {
    console.log('status', status);
  });

  stream.on('end', result => {
    console.log('on end', result);
  });

  useEffect(() => {
    if (sec > 5) {
      history.push('/group');
    }
  }, [sec]);

  useEffect(() => {
    return () => {
      stream.cancel();
    }
  }, [])

  return (
    <>
      <div>Waiting for group to be matched</div>
      <div>Elpased: {sec}</div>
    </>

  );
}

export default withRouter(WaitingContainer);
