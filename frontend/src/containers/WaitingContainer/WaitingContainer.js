import React from 'react';
import { withRouter } from 'react-router-dom';
import WaitingSection from '../../components/Waiting/WaitingSection';

function WaitingContainer() {
  return <WaitingSection />;
}

export default withRouter(WaitingContainer);
