const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Promise {
  status = PENDING;
  value = null;
  reason = undefined;

  constructor(exector) {
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };
    exector(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled();
    }
    if (this.status === REJECTED) {
      onRejected();
    }
  }
}

module.exports = Promise;