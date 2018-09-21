var obj = {
    a: 1,
    b: 2,
    c: function () {
        return false
    },
    d: undefined,
    e: {
        k1: 1,
        k2: 2
    },
    f: [1, 2],
    g: null
}
var newObj = Object.assign({}, obj)
var newObj2 = Object.assign(obj) //Object.assign只有一个参数时，则直接返回该参数
obj.e.k1 = 'hahaha'
obj.a = 2
console.log(newObj.e.k1)
console.log(newObj.a)
// console.log(newObj2.c)