const chaosArray = [3, 9, 0, 20, 11, 2, 1, 40, 80];
// 快速排序
const quickSortHandle = function(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) {
      return arr;
    }
    const mid = arr.pop();
    const leftArr = [];
    const rightArr = [];
    arr.forEach(item => {
      if (item <= mid) {
        leftArr.push(item);
      } else {
        rightArr.push(item);
      }
    });
    return quickSortHandle(leftArr).concat(mid, quickSortHandle(rightArr));
  }
  // 一行代码实现快排

const quickSortHandleEs6 = function(arr) {
  console.log(arr);
  return (!Array.isArray(arr) || arr.length <= 1) ? arr : quickSortHandleEs6(arr.slice(1).filter(item => item <= arr[0])).concat(arr[0], quickSortHandleEs6(arr.filter(item => item > arr[0])))
}

// js的组合寄生式继承
function inheritPrototype(subFun, superFun) {
  const createInstancs = function(proto) {
    const fn = function() {};
    fn.prototype = proto;
    return new fn();
  }
  const _instance_ = createInstancs(superFun.prototype);
  _instance_.constructor = subFun;
  subFun.prototype = _instance_;
}

// new 生成一个对象的过程
function User(argument) {
  // this.__proto__ = User.prototype;
  this.name = 'FUCK';
  // return this;
}
let o = Object.create(null);
o.__proto__ = User.prototype;
User.call(o);
User.prototype.aa = 11;


const arr = [1, 2, 45, 6, 7, 0, 1, 22];
// 给你一个无序数字数组，里面是随机的书，并给出一个目标值，求这个数组的两个数，这个数的和等于目标值，要求这两个数并给出下标，
// 你能想到最优的办法是什么吗（提示：快排，双指针）
function a(sum, arr) {
  let obj = [];
  arr = arr.sort((a, b) => a - b);
  for (let i = 0, j = arr.length - 1; i < j;) {
    let _sum_ = arr[i] + arr[j];
    if (_sum_ === sum) {
      obj.push(i);
      obj.push(j);
      obj.push(arr[i]);
      obj.push(arr[j]);
      break;
    } else if (_sum_ < sum) {
      i++;
    } else {
      j--;
    }
  }
  return obj;
}
// console.log(a(51, arr))
// 柯里化函数 ==》 fn(a,b,c) === fn(a)(b)(c)
function test1(a, b) {
  return a + b;
}

function test2(a) {
  return a;
}

function test3(a) {
  return a;
}

function curry(fn) {
  if (typeof fn !== 'function') {
    throw new Error('参数错误');
  }
  let paramCounts = fn.length;
  let params = [];
  return function _curry_(arg) {
    params.push(arg);
    if (paramCounts === params.length) {
      return fn.apply(this, params);
    } else {
      return _curry_;
    }
  }
}

// compose函数 compose([fn1, fn2, fn3](1)) ==> fn1(fn2(fn3(1)))
function compose() {
  let argumentFns = Array.from(arguments);
  let result;
  if (argumentFns.length === 1 && Array.isArray(argumentFns[0])) {
    argumentFns = argumentFns[0];
  }
  return function _compose_() {
    if (argumentFns.length === 1) {
      return argumentFns[0].apply(this, [result]);
    } else {
      result = argumentFns.pop().apply(this, arguments);
      return _compose_;
    }
  }
}
// function  combineReducers (reducers)  {  
//   const  availableKeys  =   []  
//   const  availableReducers  =   {}  
//   Object.keys(reducers).forEach(key  =>  {    
//     if  (typeof  reducers[key]  ===  'function')  {      
//       availableKeys.push(key) 
//       availableReducers[key]  =  reducers[key]    
//     }  
//   })   
//   return  (state  =   {},  action)  =>  {
//     const  nextState  =   {}    
//     let  hasChanged  =  false
//     availableKeys.forEach(key  =>  {      
//       nextState[key]  =  availableReducers[key](state[key],  action) 
//       if  (!hasChanged)  {        
//         hasChanged  =  state[key]  !==  nextState[key]      
//       }    
//     })     return  hasChanged  ?  nextState  :  state  
//   }
// }

