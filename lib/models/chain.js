// 链式查询对象传递类
/*
class queryChain extends Promise {
  constructor(...arg) {
    super(...arg)
    this.data = ''
  }
  async a(str) {
    this.data += 'a'
  }
  async b(str) {}
}
*/

var fs = require('fs')
var model = {
  sql: '#',
  a() {
    this.initChain()
    this.run_a()
    return this.chain
  },
  b() {
    this.initChain()
    this.run_b()
    return this.chain
  },
  run_a() {
    this.sql += 'a'
  },
  run_b() {
    this.sql += 'b'
  },
  initChain() {
    var _this = this
    this.sql = '#'
    this.chain = new Promise(async(resolve) => {
      await null;
      console.log(this.sql += '#')
      resolve()
    })
    this.chain.a = () => {
      this.run_a();
      return this.chain
    }
    this.chain.b = () => {
      this.run_b();
      return this.chain
    }

  }
}

var p = x => new Promise((resolve) => {
  setTimeout(() => {
    console.log(x)
    resolve(x)
  }, 1200)
})

async function x() {
  await p(100)
  console.log('1')
  await model.a()
  console.log('2')
  await model.b()
  console.log('3')
  await model.a().b().b().a()
  console.log('end')
  return null
}
//x()
