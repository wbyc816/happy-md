# canvas和svg

## canvas
`<canvas>`元素可被用来通过JavaScript（Canvas API 或 WebGL API）绘制图形及图形动画（[教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)）。
简单示例如下：
``` js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
```

## svg
可缩放矢量图形（Scalable Vector Graphics，SVG），是一种用于描述二维的矢量图形，基于 XML 的标记语言。作为一个基于文本的开放网络标准，SVG能够优雅而简洁地渲染不同大小的图形，并和CSS，DOM，JavaScript和SMIL等其他网络标准无缝衔接。本质上，SVG 相对于图像，就好比 HTML 相对于文本（[教程](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)）。

常用开发库：
- [html2canvas](http://html2canvas.hertzen.com/)，html转图片插件，核心原理`ctx.drawImage`
- [lottie-web](https://www.yuque.com/lottie/document/web#Usage)，复杂动画库，Lottie是一个用于Android，iOS，Web和Windows的库，用于解析使用Bodymovin导出为json的Adobe After Effects动画，并在移动设备和网络上呈现它们！
