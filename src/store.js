import { types } from 'mobx-state-tree';

const overpayment = types.model({
  year: types.number,
  month: types.number,
  amount: types.number
});

export default types
  .model('Base', {
    initial: types.number,
    rate: types.number,
    years: types.number,
    monthlyOverpayment: types.number,
    overpayments: types.array(overpayment)
  })
  .views(self => ({
    get monthlyPayment() {
      return (
        +self.initial *
        (self.rate / 1200) /
        (1 - Math.pow(1 / (1 + self.rate / 1200), self.years * 12))
      );
    },
    get monthlyPaymentTotal() {
      return (self.monthlyPayment + +self.monthlyOverpayment).toFixed(2);
    },
    get payments() {
      const monthlyRatePct = self.rate / 1200;

      let balance = +self.initial;
      let baseline = +self.initial;
      let payments = [{ overpayment: 0, balance, baseline }];
      let partial;

      for (let year = 0; year < self.years; year++) {
        let interestYearly = 0;
        let overpaymentYearly = 0;
        for (let month = 1; month <= 12; month++) {
          const overpayment = self.overpayments
            .filter(x => x.year == year && x.month == month)
            .reduce((acc, val) => acc + +val.amount, 0);
          const interestMonth = balance * monthlyRatePct;
          interestYearly += interestMonth;
          overpaymentYearly += overpayment;
          balance -=
            self.monthlyPayment +
            +self.monthlyOverpayment +
            overpayment -
            interestMonth;
          baseline -= self.monthlyPayment - baseline * monthlyRatePct;

          if (balance <= 0) {
            balance = 0;
            if (partial === undefined && month !== 12) {
              partial = month;
            }
          }
        }

        payments.push({
          baseline,
          interestYearly,
          balance,
          partial,
          overpayment:
            overpaymentYearly + self.monthlyOverpayment * (partial || 12)
        });
        if (partial) partial = 0;
      }
      return payments;
    }
  }))
  .actions(self => ({
    setInitial(val) {
      self.initial = +val;
    },
    setRate(val) {
      self.rate = +val;
    },
    setYears(val) {
      self.years = +val;
    },
    setMonthlyOverpayment(val) {
      self.monthlyOverpayment = +val;
    },
    addOverpayment() {
      self.overpayments.push({ year: 0, month: 1, amount: 0 });
    },
    removeOverpayment(index) {
      self.overpayments.splice(index, 1);
    },
    setOverpayment(field, index, val) {
      self.overpayments[index][field] = +val;
    }
  }));
