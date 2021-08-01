(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{364:function(t,a,s){t.exports=s.p+"assets/img/bubbling-flow.90effa18.png"},365:function(t,a,s){t.exports=s.p+"assets/img/capture-flow.b63741de.png"},366:function(t,a,s){t.exports=s.p+"assets/img/dom-flow.916e26e9.png"},367:function(t,a,s){t.exports=s.p+"assets/img/dom-event-compare.1a3c025c.png"},368:function(t,a,s){t.exports=s.p+"assets/img/event-handle.0a076a3f.png"},388:function(t,a,s){"use strict";s.r(a);var v=s(44),_=Object(v.a)({},(function(){var t=this,a=t.$createElement,v=t._self._c||a;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"事件系统"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#事件系统"}},[t._v("#")]),t._v(" 事件系统")]),t._v(" "),v("p",[t._v("JavaScript和HTML之间的交互是通过事件来实现的。事件，就是文档或浏览器窗口之间发生的一些交互瞬间。可以使用侦听器（或处理程序）来监听事件，以便事情发生时执行相应的代码。")]),t._v(" "),v("h2",{attrs:{id:"_1-事件流"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-事件流"}},[t._v("#")]),t._v(" 1. 事件流")]),t._v(" "),v("p",[v("strong",[t._v("事件流")]),t._v("描述的就是从页面中接受事件的顺序。")]),t._v(" "),v("h3",{attrs:{id:"_1-1-事件冒泡流-与-事件捕获流"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-事件冒泡流-与-事件捕获流"}},[t._v("#")]),t._v(" 1.1 事件冒泡流 与 事件捕获流")]),t._v(" "),v("p",[v("strong",[t._v("事件冒泡流")]),t._v("：事件开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。（由内及外）")]),t._v(" "),v("p",[v("img",{attrs:{src:s(364),alt:"Image from alias"}})]),t._v(" "),v("p",[v("strong",[t._v("事件捕获流")]),t._v("：由不太具体的节点更早接收到事件，而最具体的节点应该最后接收到事件。（由外及内）\n"),v("img",{attrs:{src:s(365),alt:"Image from alias"}})]),t._v(" "),v("h3",{attrs:{id:"_1-2-dom2级事件流"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-dom2级事件流"}},[t._v("#")]),t._v(" 1.2 DOM2级事件流")]),t._v(" "),v("p",[t._v("“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。如图所示：")]),t._v(" "),v("p",[v("img",{attrs:{src:s(366),alt:"Image from alias"}})]),t._v(" "),v("p",[v("strong",[t._v("捕获阶段")]),t._v("：实际目标("),v("code",[t._v("<div>")]),t._v("元素)在捕获阶段不会接收事件，意思是事件从 [ "),v("code",[t._v("document->html->body")]),t._v(" ] 后就停止了。【1、2、3】")]),t._v(" "),v("p",[v("strong",[t._v("目标阶段")]),t._v("：事件在目标元素上发生。但事件处理被看作是冒泡阶段的一部分。")]),t._v(" "),v("p",[v("strong",[t._v("冒泡阶段")]),t._v("：从目标元素开始处理事件，一直传播到文档。也就是 [ "),v("code",[t._v("div->body->html->document")]),t._v("  ]【4、5、6、7】")]),t._v(" "),v("div",{staticClass:"custom-block warning"},[v("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),v("p",[t._v("1、“DOM2级事件”规范明确要求捕获阶段不会涉及实际目标的事件，但IE9、Chrome、Firefox、Safari和Opera9.5及更高版本都会在捕获阶段触发实际目标上的事件。结果，目标对象上的事件就会执行两次！")]),t._v(" "),v("p",[t._v("2、并非所有的事件都会有冒泡阶段。但所有的事件都会经过捕获阶段和处于目标阶段。eg:跳过冒泡阶段的事件：获得输入焦点的focus事件和失去输入焦点的blur事件")]),t._v(" "),v("p",[v("img",{attrs:{src:s(367),alt:"Image from alias"}})])]),t._v(" "),v("h2",{attrs:{id:"_2-事件处理程序"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-事件处理程序"}},[t._v("#")]),t._v(" 2. 事件处理程序")]),t._v(" "),v("p",[t._v("事件就是用户或浏览器自身执行的某种动作。如 "),v("code",[t._v("click、load")]),t._v(" 和 "),v("code",[t._v("mouseover、mousedown")]),t._v(" 等")]),t._v(" "),v("p",[t._v("响应某个事件的函数叫做事件处理程序（或事件侦听器）。为事件指定处理程序的方式有有好几种。如下图所示：")]),t._v(" "),v("p",[v("img",{attrs:{src:s(368),alt:"Image from alias"}})]),t._v(" "),v("p",[v("strong",[t._v("HTML事件处理程序的缺点：")])]),t._v(" "),v("p",[t._v("1、时差问题：用户可能在HTML元素一出现在页面上就触发事件，此时事件处理程序有可能尚不具备执行条件。解决办法，try-catch。")]),t._v(" "),v("p",[t._v("2、耦合度问题：HTML代码与JavaScript代码紧密耦合。如果要更换事件处理程序，就要改动两个地方：HTML代码和JavaScript代码。")]),t._v(" "),v("p",[v("strong",[t._v("DOM0级事件处理程序优、缺点")]),t._v("\n优点：所有浏览器支持，简单，跨浏览器支持\n缺点：绑定事件不能累加，最后绑定的会覆盖之前的。")]),t._v(" "),v("p",[t._v("使用HTML事件处理程序指定的程序，可以被DOM0级事件处理程序覆盖，也可以以同样方式删除。")]),t._v(" "),v("h2",{attrs:{id:"_3-事件委托"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-事件委托"}},[t._v("#")]),t._v(" 3. 事件委托")]),t._v(" "),v("p",[t._v("利用"),v("strong",[t._v("事件冒泡")]),t._v("原理可以实现 “"),v("strong",[t._v("事件委托")]),t._v("”。所谓事件委托，就是在父元素上添加事件监听器，用以监听和处理子元素的事件，避免重复为子元素绑定相同的事件。当目标元素的事件被触发以后，这个事件就从目标元素开始，向最外层元素传递，最终冒泡到父元素上，父元素再通过 "),v("code",[t._v("event.target")]),t._v(" 获取到这个目标元素，这样做的好处是，父元素只需绑定一个事件监听，就可以对所有子元素的事件进行处理了，从而减少了不必要的事件绑定，对页面性能有一定的提升。")])])}),[],!1,null,null,null);a.default=_.exports}}]);