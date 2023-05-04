/**
 * @date 2022/2/24
 * @time 15:10
 * @author FLJ
 * 原型链探讨
 */
(function() {

    // 一个类 本身就是一个函数  函数的父类是 Object
    class A {
        name = "A"
        printf() {
            console.log(this.name);
        }
    }

    class B extends A {
        constructor(name) {
            super();
            super.name = name
        }
    }

    let b = new B("B")
    b.printf()

    console.log("printf 在原型链的什么位置");
    console.log(`B has printf ? : ${B.hasOwnProperty('printf')}`);
    console.log(`A has printf ? : ${B.prototype.hasOwnProperty('printf')}`);
    console.log(`A has printf ? : ${B.prototype.__proto__.hasOwnProperty('printf')}`);

    // 于是 B的prototype => 指向B 原型链
    console.log(B.prototype);
    // B的prototype.__proto__ 指向 A的原型链
    console.log(B.prototype.__proto__);

    // 那么 A,B 到底是什么, 算是构造器 ...

    // 于是只有原型链上的属性 / 方法才能够被继承,才能够被发现 ...



    // 于是我们可以得到一个规律
    // 例如 B -> 继承  A
    // B.__proto__ 本身是一个对象(它有两个属性)  1.__proto__ 指向父类的__proto__,2.prototype 指向父类的prototype ,同样等价于 B.prototype.__proto__ == A.prototype
    // 这里有一定区别的是 __proto__ 拥有两个属性  prototype 只拥有一个属性__proto__
    // 可以这样理解  prototype 本身没有原型链,但是它有属于它自身的一个__proto__,这是一个对父类的原型链的一个引用
    // 因为__proto__ 就是用来管理当前类它本身的一些方法(如果是属性 那么类本身无法通过属性访问,需要通过__proto__访问)
    // 于是 prototype 就是一种特殊的对象,它的prototype = undefined
    // 于是 __proto__ 就是类原型  而prototype不断攀爬的行为 就是原型链 ... 也可以叫它原型链
    // B.prototype.__proto__ 指向了父类的原型链(而父类的原型链 也是prototype 那么它也只有一个__proto__)
    // 在js中  任何类 / 函数的父类都是 Object
    // 但是需要注意的是 A.__proto__.prototype => 指向父类原型链(但是它本就是顶级类,所以就是undefined)
    // 于是A.prototype.__proto__ 等于 Object.prototype
    // 于是A.__proto__.__proto__ == Object.prototype // 这是一个定律
    // 于是Object.prototype.__proto__ == null
    // 于是Object.__proto__.prototype == undefined
    // 于是Object.__proto__.__proto__ == Object.prototype

    // 所以 定律就是: Object.__proto__.__proto__ = Object.prototype
    // Object.prototype 本身就是原型链 向上查找只剩 __proto__ 但是它指向null


    console.log(`B prototype[__proto__] == A.prototype status: ${B.prototype.__proto__ === A.prototype}`);
    console.log(`B __proto__[prototype] == A.prototype status: ${B.__proto__.prototype === A.prototype}`);
    console.log(`B __proto__[__proto__] == A.__proto__ status: ${B.__proto__.__proto__ === A.__proto__}`);

    // -------------------- A => Object
    console.log(`A prototype[__proto__] == null status: ${A.prototype.__proto__ === null}`);
    // 为什么这里是undefined 因为 A本身没有需要继承的属性 / 方法 ..
    console.log(`A __proto__[prototype] == undefined status: ${A.__proto__.prototype === undefined}`);
    // 为什么需要__proto__ 因为需要调用父类的构造器 ...(以及相关的反射信息)
    // 那么为什么连入的是Object.prototype 而不是Object.__proto__
    // 那是因为 让继承Object的类都拥有Object的方法 .... __proto__本身的信息不被原型链攀爬...
    console.log(`A __proto__[__proto__] == Object.prototype status: ${A.__proto__.__proto__ == Object.prototype}`);

    // 所以 Object 作为顶级类 它也需要拥有自己的方法(但是它并不是采用继承的方式) 所以Object.__proto__.__proto__ == Object.prototype
    // 所以Object.__proto__ 不再需要prototype 于是 => undefined
    // 但是Object.prototype.__proto__ 原型链没有什么可以继承的了,所以它是null;

    // 这是一种微妙的关系(总体说来,类向上爬原型链是通过__proto__,对象向上爬原型链通过prototype,属性方法都会使用...(但是不会用__proto__的方法))
    // 所以这就是为什么类爬的是__proto__,而对象爬的是prototype
    // 所以 如果想为类加能够继承的方法 只能够通过Object.prototype / 父类的__proto__

    // 对于设置之后无法生效的属性来说,有可能它就是一个只读 属性...,例如类的名称为 name
    // 删除类原型链上的name 或者设置都是无效的 ...

})()