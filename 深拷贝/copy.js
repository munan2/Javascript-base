let obj1 = {
    a: 1,
    b: 2
}
let obj4 = {
    a: 1,
    b: {
        c: 1,
        d: 2
    }
}
let obj2 = obj1
let obj3 = JSON.parse(JSON.stringify(obj1))
let obj5 = JSON.parse(JSON.stringify(obj4))
obj2.a = 3
obj3.a = 4
obj5.a = 2
// console.log(obj4.a)
// console.log(obj5)
let obj6 = {
    a: undefined,
    b: null,
    c: 2
}


let obj7 = JSON.parse(JSON.stringify(obj6))
console.log(JSON.stringify(obj6))
console.log(obj7)

let obj8 = {
    b: function () {
        return false
    },
    a: 1
}
let obj9 = JSON.parse(JSON.stringify(obj8))
console.log(obj9)