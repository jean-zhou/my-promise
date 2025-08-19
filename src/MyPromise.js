const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolutionPromise = (promise, x, resolve, reject) => {

}

class Promise {
    status = PENDING;
    value = null;
    reason = undefined;
    constructor(executor) {
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
        executor(resolve, reject);
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled === 'function' && this.status === FULFILLED) {
            console.log('then onFulfilled status', this.status);
            onFulfilled(this.value);
        }
        if (typeof onRejected === 'function' && this.status === REJECTED) {
            console.log('then onRejected status', this.status);
            onRejected(this.reason);
        }
        return this;
    }
}

module.exports = Promise;
