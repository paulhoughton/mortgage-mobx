import React from 'react';
import { render } from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './App';
import MortgageStore from './store';

const store = MortgageStore.create({
  initial: 200000,
  rate: 5,
  years: 25,
  monthlyOverpayment: 0,
  overpayments: [{ year: 0, month: 1, amount: 0 }]
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
