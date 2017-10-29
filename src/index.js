import React from 'react';
import { render } from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './App';
import Store from './store';
const store = new Store();

useStrict(true);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
