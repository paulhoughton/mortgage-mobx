import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject(["store"])(observer(({ className, store }) => (
  <div className={className}>
    <div>
      <h2>Overpayment</h2>
      <label>Monthly</label>
      <input type="text" maxLength="5" value={store.monthlyOverpayment} onChange={ e => store.setMonthlyOverpayment(e.target.value) }/>
    </div>
    <div>
      <label>Year</label>
      <label>Month</label>
      <label>Amount</label>
    </div>
    {store.overpayments.map(({ year, month, amount }, i) => (
      <div key={i}>
        <input type="number" min="0" max={store.years} value={year} onChange={ e => store.setOverpayment("year", i, e.target.value) } />
        <input type="number" min="1" max="12" value={month} onChange={ e => store.setOverpayment("month", i, e.target.value) } />
        <input type="text" value={amount} onChange={ e => store.setOverpayment("amount", i, e.target.value) } />

        {i === store.overpayments.length - 1 ?
          <button className="btn btn-xs" onClick={ () => store.addOverpayment() }>+</button> :
          <button className="btn btn-xs" onClick={ () => store.removeOverpayment(i) }>X</button>}
      </div>))
    }

  </div>
)));
