const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Promise {
  status = PENDING;
  value = null;
  reason = undefined;
  fulfillCallbacks = [];
  rejectCallbacks = []

  constructor(exector) {
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        console.log('resolve func ----', this.fulfillCallbacks);
        // this.fulfillCallbacks.forEach((onFulfilled) => onFulfilled(this.value))
        this.fulfillCallbacks.forEach((onFulfilled) => setTimeout(() => {
          onFulfilled(this.value)
        }))
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // this.rejectCallbacks.forEach((onRejected) => onRejected(this.reason))
        this.rejectCallbacks.forEach((onRejected) => setTimeout(() => {
          onRejected(this.reason)
        }))
      }
    };
    exector(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    console.log('then onFulfilled', onFulfilled);
    console.log('then onRejected', onRejected);
    if (this.status === PENDING
      && typeof onFulfilled === 'function'
      || typeof onRejected === 'function'
    ) {
      console.log('then pending ----')
      this.fulfillCallbacks.push(onFulfilled);
      this.rejectCallbacks.push(onRejected)
    }
    console.log('this.status ---', this.status)
    if (this.status === FULFILLED && typeof onFulfilled === 'function') {
      setTimeout(() => {
        onFulfilled(this.value);
      })
    }
    if (this.status === REJECTED && typeof onRejected === 'function') {
      setTimeout(() => {
        onRejected(this.reason);
      })
    }
  }
}

module.exports = Promise;