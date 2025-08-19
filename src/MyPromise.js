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
                    onFulfilled(this.value)
                })
            }
        };
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.rejectCallbacks.forEach((onRejected) => {
                    onRejected(this.reason);
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
        if (typeof onFulfilled === 'function'
            && this.status === PENDING
            && typeof onRejected === 'function'
        ) {
            this.fulfillCallbacks.push(onFulfilled);
            this.rejectCallbacks.push(onRejected);
        }
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
