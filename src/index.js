const Promise = require('./MyPromise')

const p = new Promise((resolve, reject) => {
  throw 'error---';
  // resolve(100);
  // reject('失败--');
  // setTimeout(() => {
  //   resolve(100);
  // }, 100)
}).then((value) => {
  console.log('then 成功', value);
}, (reason) => {
  console.log('then 失败', reason);
})
// console.log('p ---- ', p);

const main = async () => {
  const pawait = await new Promise((resolve, reject) => {
    resolve(100);
  })
  console.log('await promise 成功', pawait);
  return pawait;
}
// main()