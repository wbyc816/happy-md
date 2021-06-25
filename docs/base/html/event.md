# 事件系统
JavaScript和HTML之间的交互是通过事件来实现的。事件，就是文档或浏览器窗口之间发生的一些交互瞬间。可以使用侦听器（或处理程序）来监听事件，以便事情发生时执行相应的代码。

## 1. 事件流
**事件流**描述的就是从页面中接受事件的顺序。

### 1.1 事件冒泡流 与 事件捕获流
**事件冒泡流**：事件开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。（由内及外）

![Image from alias](~@img/base/bubbling-flow.png)

**事件捕获流**：由不太具体的节点更早接收到事件，而最具体的节点应该最后接收到事件。（由外及内）
![Image from alias](~@img/base/capture-flow.png)

### 1.2 DOM2级事件流
“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。如图所示：

![Image from alias](~@img/base/dom-flow.png)

**捕获阶段**：实际目标(`<div>`元素)在捕获阶段不会接收事件，意思是事件从 [ `document->html->body` ] 后就停止了。【1、2、3】

**目标阶段**：事件在目标元素上发生。但事件处理被看作是冒泡阶段的一部分。

**冒泡阶段**：从目标元素开始处理事件，一直传播到文档。也就是 [ `div->body->html->document`  ]【4、5、6、7】

::: warning 注意
1、“DOM2级事件”规范明确要求捕获阶段不会涉及实际目标的事件，但IE9、Chrome、Firefox、Safari和Opera9.5及更高版本都会在捕获阶段触发实际目标上的事件。结果，目标对象上的事件就会执行两次！

2、并非所有的事件都会有冒泡阶段。但所有的事件都会经过捕获阶段和处于目标阶段。eg:跳过冒泡阶段的事件：获得输入焦点的focus事件和失去输入焦点的blur事件

![Image from alias](~@img/base/dom-event-compare.png)
:::

## 2. 事件处理程序

事件就是用户或浏览器自身执行的某种动作。如 `click、load` 和 `mouseover、mousedown` 等

响应某个事件的函数叫做事件处理程序（或事件侦听器）。为事件指定处理程序的方式有有好几种。如下图所示：

![Image from alias](~@img/base/event-handle.png)

**HTML事件处理程序的缺点：**

1、时差问题：用户可能在HTML元素一出现在页面上就触发事件，此时事件处理程序有可能尚不具备执行条件。解决办法，try-catch。

2、耦合度问题：HTML代码与JavaScript代码紧密耦合。如果要更换事件处理程序，就要改动两个地方：HTML代码和JavaScript代码。

**DOM0级事件处理程序优、缺点**
优点：所有浏览器支持，简单，跨浏览器支持
缺点：绑定事件不能累加，最后绑定的会覆盖之前的。

使用HTML事件处理程序指定的程序，可以被DOM0级事件处理程序覆盖，也可以以同样方式删除。

## 3. 事件委托
利用**事件冒泡**原理可以实现 “**事件委托**”。所谓事件委托，就是在父元素上添加事件监听器，用以监听和处理子元素的事件，避免重复为子元素绑定相同的事件。当目标元素的事件被触发以后，这个事件就从目标元素开始，向最外层元素传递，最终冒泡到父元素上，父元素再通过 `event.target` 获取到这个目标元素，这样做的好处是，父元素只需绑定一个事件监听，就可以对所有子元素的事件进行处理了，从而减少了不必要的事件绑定，对页面性能有一定的提升。