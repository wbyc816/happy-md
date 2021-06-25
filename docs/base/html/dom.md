# DOM
DOM 是 Document Object Model 的缩写，即 **文档对象模型**，是所有浏览器公共遵守的标准，DOM 将HTML和XML文档映射成一个由不同节点组成的树型结构，俗称DOM树。其核心对象是`document`，用于描述DOM树的状态和属性，并提供对应的DOM操作API。

1. 文档的子节点
``` js
document.documentElement // 取得对<html>的引用
document.body  // 取得对<body>的引用
```
2. 文档的信息
``` js
document.title // 文档标题
```
3. 查找元素
``` js
document.getElementById()
document.getElementsByTagName()
document.getElementsByName()
document.querySelector(css选择符)  //ie8+ 无法查询伪元素
document.querySelectorAll(css选择符)  //ie8+ 无法查询伪元素
document.getElementsByClassName()  //H5新增
```
4. 创建元素
``` js
document.createElement('div')
document.createTextNode() // 创建文本节点
```
5. 获取特性（attr）
``` js
ele.getAttribute()
ele.setAttribute()
ele.removeAttribute()
```
6. 元素类操作
``` js
ele.className  //获取类名、赋值
ele.classList.add()  //添加 ，不会重复添加
ele.classList.contains()  //是否包含
ele.classList.remove()  //删除
ele.classList.toggle()  //切换
```
7. 插入标记
``` js
ele.innerHTML='xxx'  //获取和赋值，不能插入<script>
ele.outerHTML='xxx'  //获取和赋值(包含自身ele)，不能插入<script>
```
以上方法可能会导致内存占用问题，尤其在IE中，最好先手工删除要被替换元素的**所有事件处理程序**和JS对象属性。设置innerHTML和outerHTML时会创建一个**HTML解析器**，比JS执行快的多。创建和销毁HTML解析器也会带来性能损失，需将次数控制在合理范围内，**单独构建**字符串，再**一次性赋值**。

