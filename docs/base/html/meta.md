# meta

## 有利SEO
html 写入 `title`标签、`meta`标签 `name="keywords"`和`meta`标签 `name="description"` 有利于SEO
``` html
<title>xxx</title>
<meta name="keywords" content="">
<meta name="description" content="">
```

## 移动端常用设置
移动端常设置`meta`标签的`viewport`属性用来做自适应布局的配置
``` html
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1,viewport-fit=cover">
```
`width=device-width`设置视口宽度为设备宽度，`initial-scale=1`设置初始缩放比例为1，`user-scalable`禁止用户手势缩放，`minimum-scale=1,maximum-scale=1`最小最大缩放比例为1，进一步禁止缩放，`viewport-fit=cover`使用屏幕上所有的可用空间（[详细](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env())）

``` html
<meta data-n-head="ssr" name="apple-mobile-web-app-capable" content="yes">
<!-- 删除默认的苹果工具栏和菜单栏 -->
<meta data-n-head="ssr" name="apple-touch-fullscreen" content="yes">
<!-- "添加到主屏幕“后，全屏显示 -->
<meta data-n-head="ssr" name="format-detection" content="telephone=no,email=no">
<!-- 苹果会自动把你这个文字加链接样式、并且点击这个数字还会自动拨号 -->
<meta data-n-head="ssr" name="apple-mobile-web-app-status-bar-style" content="black">
<!-- 苹果控制状态栏显示样式  default（白色）black（黑色） black-translucent（灰色半透明） -->
```