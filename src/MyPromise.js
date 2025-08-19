const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolutionPromise = (promise, x, resolve, reject) => {

}

class Promise {
    status = PENDING;
    value = null;
    reason = undefined;
    fulfillCallbacks = [];
    rejectCallbacks = [];
    constructor(executor) {
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.fulfillCallbacks.forEach((onFulfilled) => {
                    setTimeout(() => {
                        onFulfilled(this.value)
                    }, 0);
                })
            }
        };
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.rejectCallbacks.forEach((onRejected) => {
                    setTimeout(() => {
                        onRejected(this.reason);
                    }, 0);
                })
            }
        };
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        if (this.status === PENDING) {
            this.fulfillCallbacks.push(onFulfilled);
            this.rejectCallbacks.push(onRejected);
        }
        if (this.status === FULFILLED) {
            console.log('then onFulfilled status', this.status);
            onFulfilled(this.value);
        }
        if (this.status === REJECTED) {
            console.log('then onRejected status', this.status);
            onRejected(this.reason);
        }
        return this;
    }
}

module.exports = Promise;
