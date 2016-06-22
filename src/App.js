import React from 'react';
import { observer } from 'mobx-react';

import Header from './Header.js';
import TableContainer from './TableContainer';
import Chart from './Chart';
import BaseFigures from './BaseFigures';
import Overpayment from './Overpayment';
import '../styles/App.scss';

export default observer(({ store }) => (
  <div>
    <Header title={"Mortgage Overpayment Calculator"} />
    <div className="container-fluid">
      <div className="col-md-8 col-sm-12">
        <BaseFigures className="col-sm-4" store={ store } />
        <Overpayment className="col-sm-8" store={ store } />
        <div className="col-sm-12">
          <h2>Monthly Payment
            <span className="money"> { store.monthlyPaymentTotal }</span>
          </h2>
          <Chart data={ store.payments } />
        </div>
      </div>
      <TableContainer className="col-sm-4" data={ store.payments } />
    </div>
  </div>
));

