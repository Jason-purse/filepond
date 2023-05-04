/**
 * @date 2022/2/24
 * @time 14:46
 * @author FLJ
 */
// 自启动函数
(function() {


    class User {
        name = '';
        sex = '';
    }

    class MAJOR extends User {
        age = '';
    }

    const major = new MAJOR();

    console.log('only for-in');
    for (let majorKey in major) {
        console.log(majorKey);
    }
    console.log('check is self properties');

    for (let majorKey in major) {
        if (Object.hasOwnProperty(majorKey)) { // 会判断是否属于自己的属性 ...
            console.log(majorKey);
        }
    }


    // 查看protoTests相关的代码
    console.log("prototype for-in ,only self properties");

})();