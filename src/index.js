// const Promise = require('./MyPromise')
const Promise = require('./MyPromise2');
let func = null;
const p = new Promise((resolve, reject) => {
  // throw 'error---';
  // resolve(100);
  // reject('失败--');
  // setTimeout(() => {
  //   resolve(100);
  // }, 100)
  console.log(' promise ---')
  func = resolve;
  // func = reject;
})

p.then(
  (value) => {
    console.log('then 成功', value);
    // return p;
    // return new Promise((resolve, reject) => {
    //   console.log('第二个 promise');
    //   resolve(new Promise((resolve, reject) => {
    //     console.log('第三个 promise');
    //     resolve(value);
    //   }))
    // })
  }
  , (reason) => {
    console.log('then 失败', reason);
  }
)
// func(100);
func('reject');
// .then((value) => {
//   console.log('第二个 then 成功', value);
// }, (reason) => {
//   console.log('第二个 then 失败', reason);
// })
// console.log('p ---- ', p);

const main = async () => {
  const pawait = await new Promise((resolve, reject) => {
    resolve(100);
  })
  console.log('await promise 成功', pawait);
  return pawait;
}
// main()