function deepCopy (obj) {
    let newObj = {}
    for (let k in obj) {
        if (typeof k != 'object' || obj[k] == null) {
            newObj[k] = obj[k]
        } else {
            deepCopy(obj[k])
        }
    }
    return newObj
}

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
var newObj = deepCopy(obj)
obj.c = 2
console.log(newObj.c)