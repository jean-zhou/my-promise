const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolutionPromise = (promise2, x, resolve, reject) => {
    // 解析 promise ，不能循环调用
    if (promise2 === x) {
        console.log(' equal error ');
        return reject(new TypeError('Chaining cycle detected for promise')) // 不能自己调用自己
    }
    // 递归的解析，如何判断传进来的时一个 promise，根据规范，promise 要是一个方法或对象
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                // 如果调用 then 是一个 function，还可以继续调
                // 相当于 x.then，且调用 then 后，又有一个 value 处理函数 和 reason 失败的处理函数 
                then.call(x, value => {
                    // 如果 then 里面 promise 还嵌套 promise，则递归的处理
                    resolutionPromise(value, promise2, resolve, reject);
                }, reason => {
                    reject(reason);
                })
            } else {
                // 如果 then 里面的 onResolve 不是一个函数，则表示结束
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        // 不是函数或对象的话，则是一个普通值
        resolve(x);
    }

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
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === PENDING) {
                this.fulfillCallbacks.push(() => {
                    // 要等上一个完成，才处理下一个，所以push 的时候也要用一个回调函数，做 setTimeout 的处理
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolutionPromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err);
                        }
                    })
                });
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolutionPromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    })
                });
            }
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolutionPromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err);
                    }
                })
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolutionPromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
        })
        return promise2;
    }
}

module.exports = Promise;
