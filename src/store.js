import { observable, computed, action } from 'mobx';

export default class {
  @observable initial = 200000;
  @observable rate = 5;
  @observable years = 25;
  @observable monthlyOverpayment = 0;
  @observable overpayments = [{ year: 0, month: 1, amount: 0 }];

  @action setYears = (val) => {
    this.years = +val;
  }

  @action setRate = (val) => {
    this.rate = +val;
  }

  @action setInitial = (val) => {
    this.initial = +val;
  }

  @action setMonthlyOverpayment = (val) => {
    this.monthlyOverpayment = +val;
  }

  @action addOverpayment = () => {
    this.overpayments.push({ year: 0, month: 1, amount: 0 });
  }

  @action removeOverpayment = (index) => {
    this.overpayments.splice(index, 1);
  }

  @action setOverpayment = (field, index, val) => {
    this.overpayments[index][field] = +val;
  }

  @computed get monthlyPayment() {
    return this.initial * (this.rate / 1200) / (1 - Math.pow(1 / (1 + this.rate / 1200), this.years * 12));
  }

  @computed get monthlyPaymentTotal() {
    return (this.monthlyPayment + this.monthlyOverpayment).toFixed(2);
  }

  @computed get payments() {
    const monthlyRatePct = this.rate / 1200;

    let balance = this.initial;
    let baseline = this.initial;
    let payments = [{ overpayment: 0, balance, baseline }];
    let partial;

    for (let year = 0; year < this.years; year++) {
      let interestYearly = 0;
      let overpaymentYearly = 0;
      for (let month = 1; month <= 12; month++) {
        const overpayment = this.overpayments.filter(x => (x.year === year && x.month === month))
          .reduce((acc, val) => acc + val.amount, 0);
        const interestMonth = balance * monthlyRatePct;
        interestYearly += interestMonth;
        overpaymentYearly += overpayment;
        balance -= this.monthlyPayment + this.monthlyOverpayment + overpayment - interestMonth;
        baseline -= this.monthlyPayment - (baseline * monthlyRatePct);

        if (balance <= 0) {
          balance = 0;
          if (partial === undefined && month !== 12) {
            partial = month;
          }
        }
      }

      payments.push({ baseline, interestYearly, balance, partial, overpayment: overpaymentYearly + (this.monthlyOverpayment * (partial || 12)) });
      if (partial) partial = 0;
    }
    return payments;
  }
}
