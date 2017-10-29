import React from 'react';
import { observer, inject } from 'mobx-react';
export default inject(["store"])(observer(({ className, store }) => (
  <div className={ className }>
    <div>
      <h2>Initial</h2>
      <label>Amount</label>
      <input type="text" maxLength="7" value={ store.initial } onChange={e => store.setInitial(e.target.value) } />
    </div>
    <div>
      <label>Years</label>
      <input type="number" maxLength="2" value={ store.years } onChange={e => store.setYears(e.target.value) } />
    </div>
    <div>
      <label>Rate</label>
      <input type="text" value={ store.rate } onChange={e => store.setRate(e.target.value) } />
    </div>
  </div>
)));
