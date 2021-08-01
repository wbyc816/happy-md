# 异步编程

## Promise

[Promise语法](https://es6.ruanyifeng.com/#docs/promise)
[手写Promise](https://zhuanlan.zhihu.com/p/144058361)

## Generator函数
[Generator函数](https://es6.ruanyifeng.com/#docs/generator)

## async await
[async await](https://es6.ruanyifeng.com/#docs/async)

## 事件循环
JavaScript语言的一大特点就是单线程，为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。

消息队列：消息队列是一个先进先出的队列，它里面存放着各种消息。

事件循环：事件循环是指主线程重复从消息队列中取消息、执行的过程。

主线程执行发起函数，通过发起函数通知相应的线程可以开始执行相应的异步任务，异步任务则在其他线程中执行，不会阻塞js主线程的执行

异步任务得到结果后会在任务队列中放置一个回调函数，通常称之为“事件”，异步任务通过回调函数通知主线程这个异步任务可以继续往下执行，只要主线程一空，程序就会读取任务队列中的事件，任务队列中的事件进入主线程并执行

常用异步：`DOM`、`ajax`、`setTimeout`、`promise`（网络请求，定时器和事件监听）

![Image from alias](~@img/base/event-loop.png)

## 宏任务和微任务
一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。

`macro-task`大概包括: `script`(整体代码), `setTimeout`, `setInterval`, `setImmediate`, `I/O`, `UI rendering`

`micro-task`大概包括: `process.nextTick`, `Promise`, `Object.observe`(已废弃), `MutationObserver`(H5新特性)

`setTimeout`/`Promise`等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。

来自不同任务源的任务会进入到不同的任务队列。其中`setTimeout`与`setInterval`是同源的。

事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的`micro-task`。当所有可执行的`micro-task`执行完毕之后。循环再次从`macro-task`开始，找到其中一个任务队列执行完毕，然后再执行所有的`micro-task`，这样一直循环下去。如下举例：
``` js
setTimeout(function() {
    console.log('timeout1');
})
 
new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
    console.log('promise2');
}).then(function() {
    console.log('then1');
})
 
console.log('global1');
```

执行结果为：promise1 - promise2 - global1 - then1 - timeout1，分析一下代码，首先程序开始执行，遇到setTimeout时将它添加到消息队列，等待后续处理，遇到Promise时会创建微任务（.then()里面的回调），注意此时new promise构造函数中的代码还是同步执行的，只有.then中的回调会被添加到微任务队列。因此会连续输出promise1和promise2。继续执行到console.log('global1')输出global1，到此调用栈中已经为空。

此时微任务队列里有一个任务.then，宏任务队列里也有一个任务setTimout。

microtask必然是在某个宏任务执行的时候创建的，而在下一个宏任务开始之前，浏览器会对页面重新渲染(task >> 渲染 >> 下一个task(从任务队列中取一个))。同时，在上一个宏任务执行完成后，渲染页面之前，会执行当前微任务队列中的所有微任务。也就是说，**在某一个宏任务执行完后，在重新渲染与开始下一个宏任务之前，就会将在它执行期间产生的所有微任务都执行完毕（在渲染前）**。因此会执行.then输出then1，然后进行下一轮事件循环，取出任务队列中的setTimeout输出timeout1。