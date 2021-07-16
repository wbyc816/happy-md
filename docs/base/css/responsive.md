# 响应式

## 百分比布局
通过对宽度高度 设置百分比来达到响应式的目的
``` css
width:50%;
height:50%

@media screen and (min-width: 600px) {
    width:30%;
    height:30%
}
```
简单的响应式，通常需配合媒体查询来使用

## rem布局
通过设置根节点`html`上的`font-size`值来适配不同设备
``` js
fontRatio = 100 * (document.documentElement.clientWidth / 750) // 750像素设计稿为例 1rem为100px
document.documentElement.style.fontSize = fontRatio +'px'

window.addEventListener('resize', function(){
    // 监听视口大小 动态设置
}, false)
```
以上为最简单例子，配合`postcss-px2rem`等打包插件，可直接在代码中使用px单位

## vw布局

### 视区相对单位
相对于浏览器viewport尺寸的单位，具体包括下面4个：

- vw – 视区宽度百分值，视区宽度是100vw
- vh – 视区高度百分值，视区高度是100vh
- vmin – vw或vh，取小的那个
- vmax – vw或vh，取大的那个

单一使用跟百分比布局差不多

## 混合使用

一般来说以上三种布局都是混合使用，甚至全部使用在一个网站内，搭配起来才能适用更复杂的场景，[基于vw等viewport视区单位配合rem响应式排版和布局](https://www.zhangxinxu.com/wordpress/2016/08/vw-viewport-responsive-layout-typography/)