import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject(({ store : { monthlyPaymentTotal }}) => ({ monthlyPaymentTotal }))
    (observer(({ title, monthlyPaymentTotal }) => (
      <h2>{title}
        <span className="money"> { monthlyPaymentTotal }</span>
      </h2>
)));