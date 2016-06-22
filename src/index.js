import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { useStrict } from 'mobx';

import App from './App';
import Store from './store';
const store = new Store();

useStrict(true);

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;

    render(
      <AppContainer>
        <App store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
