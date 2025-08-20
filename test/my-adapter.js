// const MyPromise = require('../src/MyPromise');
const MyPromise = require('../src/MyPromise2');

function deferred() {
    const result = {};
    const promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    result.promise = promise;
    return result;
}

exports.deferred = deferred;