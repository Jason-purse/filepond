// es 6 模块化语法 进行forIn
// 因为forIn 会将原型链上的所有的属性遍历出来,所以我们需要判断是否属于当前元素自己的属性 ..
export const forin = (obj, cb) => {
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        cb(key, obj[key]);
    }
};
