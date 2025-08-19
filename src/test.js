// 举例说明 如何让 a 打印 20，修改代码执行顺序
let a = 10;

const t1 = () => {
  // console.log(a);
  setTimeout(() => {
    console.log(a);
  }, 0);
}

const t2 = () => {
  t1()
  a = 20;
}

// t2();