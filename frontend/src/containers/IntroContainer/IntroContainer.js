import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import Introduction from 'components/intro/Introduction';

function IntroContainer({ history }) {
  const onStart = useCallback(() => {
    history.push('/request');
  }, [history]);
  return <Introduction onStart={onStart} />;
}
export default withRouter(IntroContainer);
