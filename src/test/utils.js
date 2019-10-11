import React from 'react';
import { render } from "@testing-library/react";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

export function renderWithRedux(
  ui,
  state = {},
  middlewares = [],
) {
  const store = configureStore(middlewares)(state);
  const utils = render(
    <Provider store={store}>
      {ui}
    </Provider>,
  );
  return {
    ...utils,
    store,
  };
}

