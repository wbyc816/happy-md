# 原型和继承
## 原型
创建一个新函数，就会根据一组特定的规则为该函数创建一个`prototype`属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个`constructor`(构造函数)属性，这个属性是一个指向`prototype`属性所在函数的指针。
**当调用构造函数创建一个实例后，该实例的内部将包含一个指针（内部属性）,指向构造函数的原型。**以上规则导致，查询实例某条属性时，先搜索实例，如未搜索到，将沿着该实例的构造函数对应的原型对象搜索。(此为`原型链`基础)
当添加与原型对象上同名属性时，将会**屏蔽**原型对象上的同名属性，可用`delete`操作符删除实例属性，**恢复**访问原型属性。
**in操作符**
- 单独使用时，in操作符会在通过对象能够给定属性时返回`true`，无论该属性存在于**实例**中还是**原型**中。
``` js
// 判断对象属性是存在于原型中
// object.hasOwnProperty判断是否存在实例中
function hasPrototypeProperty(object,name){ 
    return !object.hasOwnProperty(name)&&(name in object)
}
```
`for-in`循环时，返回所有能通过对象访问的、**可枚举**的（`enumerated`） 属性，其中既包括存在于实例中的，也包含存在原型中的。

## 创建对象
- 工厂模式
``` js
function createPerson(name, age ,job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    }
    return o;
}
var person1 = createPerson('nich' , 29 , 'Software');
var person2 = createPerson('mach' , 30 , 'Doctor');
```
缺点: 没有解决对象识别的问题，且函数内部定义方法每次都要执行新建一个函数
- 构造函数模式
``` js
function Person(name, age ,job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    }
    return o;
}
var person1 = new Person('nich' , 29 , 'Software');
var person2 = new Person('mach' , 30 , 'Doctor');
```
优点：解决了对象识别的问题，上述例子中两个实例`constructor`属性都指向`Person`构造函数，可靠的方法用`person1 instanceof Person`判断。
缺点：函数内部定义方法每次都要执行新建一个函数，如果方法定义在外部，全局作用域就被搞乱了，且定义多个也不好
::: details new操作符
要创建Person的实例，必须使用new操作符。以这种方式调用构造函数实际上会经历以下4个步骤:
1. 创建一个新对象;
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）;
3. 执行构造函数中的代码（为这个新对象添加属性）;
4. 返回新对象
模拟new操作符
``` js
function objectFactory(){
    var obj = new Object(); // 创建一个新对象
    var Constructor = [].shift.call(arguments); // 取得第一个参数 构造函数，并从arguments中删除
    obj._proto_ = Constructor.prototype; // 将obj的原型对象指向构造函数的原型对象，这样obj能访问原型对象上的属性
    var ret=Constructor.apply(obj,arguments); // 将this指向obj，并携带剩余参数执行构造函数
    return typeof ret==='object'?ret||obj:obj // 判断执行结果是否为对象（null也是object,但是这时需要返回obj），是则返回执行结果，否返回新建对象
}
```
:::
- 原型模式
``` js{8,15}
function Person(){
}
Person.prototype={
    constructor:Person, // 如果constructor值很重要，重新定义原型对象时，需将构造函数显示的重新赋值
    name:'nich',
    age: 29,
    job:'Doctor',
    friends: ['habi','bob'], // 引用类型值
    sayName: function(){
        alert(this.name);
    }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push('lili');
alert(person1.friends===person2.friends); // true
```
优点：解决了构造函数模式重复定义方法函数的问题
缺点：当属性值时引用类型时，改变改值将影响所有实例
- 组合使用构造函数模式和原型模式
``` js
function Person(name, age ,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.friends= ['habi','bob']
}
Person.prototype={
    constructor:Person, // 如果constructor值很重要，重新定义原型对象时，需将构造函数显示的重新赋值
    sayName: function(){
        alert(this.name);
    }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push('lili');
alert(person1.friends===person2.friends); // false
alert(person1.sayName===person2.sayName); // true
```
优点： 完美解决了构造函数模式和原型模式的缺点，是使用最广泛、认同度最高的一种创建自定义类型的方法

## 原型链
利用**实例**都包含一个**指向原型对象的内部指针**，**而让这个原型对象等于另一个类型的实例**，那创建的实例将包含另一个类型的原型对象的属性和方法，如此层层递进，就构成了实例与原型的链条。如下简单实现：
``` js{7}
function SuperType(){
    this.property = true;
}
superType.prototype.getSpuerValue= function () {
    return this.property;
}
function SubType(){
    this.subProperty = false;
}
SubType.prototype=new SuperType(); // 继承了SuperType
SubType.prototype.getSubValue=function(){
    return this.subProperty;
}
var instance= new SubType();
alert(instance.getSpuerValue()) // true
```
**原型链的问题**
1. 由于包含引用类型值的原型属性会被所有实例共享，在通过原型来实现继承时，原型实际上会变成另一个类型的实例，于是，原先的实例属性也变成了现在的原型属性。
``` js
function SuperType(){
    this.colors = ['red','blue','green'];
}
function SubType(){
}
SubType.prototype=new SuperType(); // 继承了SuperType
var instance1= new SubType();
instance1.colors.push('black');
alert(instance1.colors()) // 'red,blue,green,black'

var instance2= new SubType();
alert(instance2.colors()) // 'red,blue,green,black'
```
2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数。

## 继承
- 借用构造函数
``` js{6}
function SuperType(name){
    this.name=name
    this.colors = ['red','blue','green'];
}
function SubType(){
    // 继承了SuperType
    SuperType.call(this,'nich');
}
var instance1= new SubType();
alert(instance1.name) // 'nich'
instance1.colors.push('black');
alert(instance1.colors()) // 'red,blue,green,black'

var instance2= new SubType();
alert(instance2.colors()) // 'red,blue,green'
```
优点：解决了实例共享属性的问题且可传参数
缺点：方法都在构造函数中定义，且无法继承超类型的方法
- 组合继承
``` js{9,12}
function SuperType(name){
    this.name=name
    this.colors = ['red','blue','green'];
}
SuperType.prototype.sayName=function () {
    alert(this.name);
}
function SubType(name,age){
    // 继承了SuperType
    SuperType.call(this,name);
    this.age=age;
}
SubType.prototype=new SuperType();
SubType.prototype.constructor=SubType;
SubType.prototype.sayAge=function () {
    alert(this.age);
} 
var instance1= new SubType('nich',27);
instance1.colors.push('black');
alert(instance1.colors()) // 'red,blue,green,black'
instance1.sayName() // 'nich'
instance1.sayAge() // 27

var instance2= new SubType('bob;,29);
alert(instance2.colors()) // 'red,blue,green'
instance1.sayName() // 'bob'
instance1.sayAge() // 29
```
优点：避免了原型链和借用构造函数的缺陷，成为JS中最常用的继承模式
缺点：**两次**调用`SuperType`构造函数，在`SubType`上创建了不必要的、多余的属性
- 原型式继承
``` js
var person={
    name:'nich',
    friends:['an','Rob','Lily']
}
var anotherPerson=Object.create(person)
anotherPerson.name='Greg'
anotherPerson.friends.push('Lulcy')
var yetAnotherPerson=Object.create(person)
yetAnotherPerson.name='Linda'
yetAnotherPerson.friends.push('Bardi')
alert(person.friends) // 'an,Rob,Lily,Lulcy,Bardi'

var towAnotherPerson=Object.create(person,{
    name:{
        value:'BILY'
    }
})
alert(towAnotherPerson.name) // BILY
```
`Object.create()`方法的第二个参数与`Object.defineProperties()`方法的第二个参数格式相同；每个属性都是通过自己的描述符定义的。以这种方式制定的任何属性都会覆盖原型对象上的同名属性。
优点：不需要创建构造函数，只想让一个对象与另一个对象保持类似的情况下，原型式继承很好用
缺点：包含引用类型值的属性始终都会共享
- 寄生式继承
``` js
function createAnother(original){
    var clone=object(original)
    clone.sayHi=function(){
        alert('Hi')
    }
    return clone
}
var person={
    name:'nich',
    friends:['an','Rob','Lily']
}
var anotherPerson=createAnother(person)
anotherPerson.sayHi() // hi
```
优点：快速创建具有自定义方法的对象
缺点：不能做到函数复用，效率较低
- 寄生组合式继承
``` js
function inheritPrototype(subType,superType){
    var prototype=Object.create(superType.prototype) // 创建对象
    prototype.constructor=subType // 增强对象
    subType.prototype=prototype  // 指定对象
}
function SuperType(name){
    this.name=name
    this.colors = ['red','blue','green'];
}
SuperType.prototype.sayName=function () {
    alert(this.name);
}
function SubType(name,age){
    // 继承了SuperType
    SuperType.call(this,name);
    this.age=age;
}
inheritPrototype(subType,superType)
SubType.prototype.sayAge=function () {
    alert(this.age);
} 

```
优点：避免了组合式继承二次调用`SuperType`的构造函数，与此同时，原型链还能保持不变；还能正常使用`instanceof`和`isPrototypeOf`判断

## class
[class语法链接](https://es6.ruanyifeng.com/#docs/class)