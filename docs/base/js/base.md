# 基础语法

## 1. 变量声明
ES5中有`var` 和 `function`
- 都具有声明提升，`function`优先级高于`var`
- 重复声明会忽略声明语句，赋值语句会生效

``` js
console.log(a)
b();
function b(){
    console.log(a);
    var a=2;
}
var a=1;
console.log(a);
//分别输出undefined  undefined  1
```

ES6中有`let` 、`const` 、`import` 、`class`分别声明变量、只读的常量、模块和类

- `let`、`const` 不存在变量提升，有块级作用域({...块级作用域})
- 在代码块内，使用`let`命令声明变量之前，该变量都是不可用的,“暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作
- `let`不允许在相同作用域内，重复声明同一个变量

``` js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError tmp is not defined
  console.log(tmp); // ReferenceError tmp is not defined

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

- `const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了

``` js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

- `var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性
``` js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

### CommonJS与import
- `CommonJS`输入时必须查找对象属性，整体加载一个模块，生成一个对象，在对象上读取方法，称为运行时加载
- `import`只是加载模块的属性和方法，其他方法不加载，称为“编译时加载”或者静态加载
``` js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;

// ES6模块
import { stat, exists, readFile } from 'fs';
```

- `export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
- `export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
- `import`命令输入的变量都是只读的，因为它的本质是输入接口
- `import`语句会执行所加载的模块
``` js
// 报错
export 1;

// 报错
var m = 1;
export m;

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

### import()
- `import()`返回一个 `Promise` 对象
- `import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块
- `import()`函数与所加载的模块没有静态连接关系，这点也是与`import`语句不相同
- `import()`类似于 Node 的`require`方法，区别主要是前者是异步加载，后者是同步加载

## 2. 数据类型
ES5中有6种基本数据类型：`String`、`Number`、`Boolean`、`Null`、`Undefined`、`Object`，前五种为简单数据类型，`Object`为复杂数据类型
ES6中新增`Symbol`数据类型
- `undefined`是只声明未定义，`null`是指一个空对象指针
- 只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存`null`值，有利于区分`null`和`undefined`
``` js
var a,b=null;
typeof a; // undefined
typeof b; // object
```
JS中常用引用类型`Object`、`Array`、`Date`、`RegExp`、`JSON`、`Function`
特殊的引用类型基本包装类型`String`、`Number`、`Boolean`
- `Number`、`Boolean`重写了`valueOf`、`toString`、`toLocaleString`方法
- 在读取这个三类型的变量时，会创建临时对应的实例，在实例上调用制定的方法，再销毁这个实例
``` js
var str="hello";//基本数据类型
str=str.replace("ll","HH");//基本数据类型不能调用函数方法，此时已经将str转换为基本包装类，内部浏览器转换代码var str = new String("hello");
console.log(str);//在控制台输出结果
```

## 3. 类型判断

- typeof
- instanceof
- Object.prototype.toString.call
- constructor

### `typeof` 能判断基本类型的值，`new`创建的类型都为`object`，`null`也是`objcet`，`function`为`function`
``` js
console.log(typeof "Liesbeth");//"string"
console.log(typeof 12);//"number"
console.log(typeof true); //"boolean"
console.log(typeof undefined);//"undefined"
console.log(typeof null);//"object"
console.log(typeof {name:"Liesbeth"});//"object"
console.log(typeof function(){});//"function"
console.log(typeof []);//"object"
console.log(typeof new Date);//"object"
console.log(typeof /[0-9]/);//'object'
console.log(typeof new Number(123));//'object'
function Person(){};
console.log(typeof new Person);//'object'
```

### `instanceof`，如果变量是给定引用类型的实例，就会返回`true`，不能识别基本类型，能识别所有引用类型和自定义对象
``` js
//能判别内置对象内型
console.log([] instanceof Array);//true
console.log([] instanceof Object);//true    
console.log(/[0-9]/ instanceof RegExp);//true
console.log(new String('123') instanceof String);//true
console.log(function(){} instanceof Function);//true

//不能判断原始类型
console.log('123' instanceof String);//false
console.log(123 instanceof Number);//false
console.log(true instanceof Boolean);//false

//判别自定义对象类型
function Point(x,y){
    this.x=x;
    this.y=y;
}
function Circle(x,y,r){
    Point.call(this,x,y);
    this.radius=r;
}
Circle.prototype=new Point();
Circle.prototype.constructor=Circle;
var c= new Circle(1,1,2);
console.log(c instanceof Circle);//true
console.log(c instanceof Point);//true
```

### `Object.prototype.toString.call`，这个方法获取的是对象的[[Class]]属性值，返回结果是固定的'[object'+[[class]]属性+']'，不能识别自定义对象,返回时大写开头
ie7和8中`null`和`undefined`都是返回"`Object`"，IE6中字符串也会返回"`Object`"
``` js
function type(obj){
  return Object.prototype.toString.call(obj).slice(8,-1);
}
type('a') // String
type(1) // Number
type(Symbol()) // Symbol
type(function(){}) //Function
type(null) // Null
type(undefined) // Undefined
//c是自定义对象
type(c) // Object
```
### `constructor` 属性返回创建此对象的构造函数的引用,由于`null`和`undefined`没有构造函数所以特殊处理,`constructor`能判别原始类型（除`null`和`undefined`），内置对象和自定义对象
``` js
function getConstructorName(obj){
    return (obj===undefined||obj===null)?obj:(obj.constructor&&obj.
    constructor.toString().match(/function\s*([^(]*)/)[1]);
}
getConstructorName(1)  // Number
getConstructorName('a')  //  String
getConstructorName(null)  //  null
getConstructorName([])  // Array
//c是自定义对象
getConstructorName(c)  // Circle
```