import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './App';
import Store from './store';
const store = new Store();

useStrict(true);

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  });
}
