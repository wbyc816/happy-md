# 布局

## 盒模型

当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。
一个盒子中主要的属性就5个：width、height、padding、border、margin
- width和height：内容的宽度、高度（不是盒子的宽度、高度）。
- padding：内边距。
- border：边框。
- margin：外边距。

![Image from alias](~@img/base/box-area.png)

css3中box-sizing可以改变盒模型的组成方式，宽度和高度的计算方式不同:

``` css
box-sizing: content-box;
width = content-width
height = content-height

box-sizing: border-box;
width = content-width + padding-width + border-width
height = content-height + padding-height + border-height
```

## 外边距合并

所谓外边距合并，指的是`margin`合并，MDN是这样定义的:
::: tip 外边距合并
块的顶部外边距和底部外边距有时被组合(折叠)为单个外边距，其大小是组合到其中的最大外边距，这种行为称为**外边距合并**。
:::

- **相邻兄弟元素**: 上下结构取顶部外边距和底部外边距中最大值
- **父子元素**: 如果在块级父元素中，不存在上边框、上内补、inline content、清除浮动这四个属性，(对于不存在上边框和上内补，也可以理解为上边框和上内补宽度为0)，那么这个块级元素和其第一个子元素的存在外边距合并，也就是上边距”挨到一起“，那么此时父元素展现出来的外边距，将会是子元素的margin-top 和父元素的margin-top 的较大值。

**如何解决外边距重合**
将两个外边距重合的元素放在不同的**BFC**容器中

## BFC

::: tip BFC
一个**块级格式化上下文**(block formatting context)是Web页面的可视化CSS渲染的一部分。它是块盒子的布局发生，浮动互相交互的区域。
:::

**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。**

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

**触发 BFC：**

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

**那么BFC 又有以下特点：**
- 内部块级盒子垂直方向排列
- 盒子垂直距离由margin 决定，同一个BFC 盒子的外边距会重叠
- BFC 就是一个隔离的容器，内部子元素不会影响到外部元素
- BFC 的区域不会与float box叠加
- 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

**IFC**
既然块级元素会触发BFC，那么内联元素会触发的则是IFC

IFC 只有在一个块元素中**仅包含**内联级别元素时才会生成
![Image from alias](~@img/base/ifc.jpg)

**IFC原理：**

内部的box 会在水平方向排布
这些box 之间的水平方向的`margin``boder``padding` 都有效

Box垂直对齐方式：以它们的底部、顶部对齐，或以它们里面的文本的基线（`baseline`）对齐（默认，文本与图片对其），例：`line-heigth`与`vertical-align`。

## 浮动布局

float CSS属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动(文档流)中移除，尽管仍然保持部分的流动性
``` css
float:left;
float:right;
```

浮动元素无法撑起父元素的高度，这时候就需要清除这种影响

**清除浮动的方法：**
- 父级元素定义伪元素和zoom
``` css
.clearfloat:after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
```
IE8以上和非IE浏览器才支持:after，zoom(IE专有属性)可解决ie6,ie7浮动问题

- 父级定义overflow:hidden/auto

- 父级定义高度height

以上三种方法第一种最适用，其它两种不建议使用


## flex布局

[参考链接](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
