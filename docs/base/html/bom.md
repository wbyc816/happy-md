# BOM
BOM 是 Browser Object Model 的缩写，即浏览器对象模型，当一个浏览器页面初始化时，会在内存创建一个全局的对象，用以描述当前窗口的属性和状态，这个全局对象被称为浏览器对象模型，即BOM。BOM的核心对象就是 window，window 对象也是BOM的顶级对象，其包含了浏览器的六个核心模块：

- **document**：即文档对象，渲染引擎在解析HTML代码时，会为每一个元素生成对应的DOM对象，由于元素之间有层级关系，因此整个HTML代码解析完以后，会生成一个由不同节点组成的树形结构，俗称DOM树，document 用于描述DOM树的状态和属性，并提供了很多操作DOM的API。
  
- **frames**：HTML 子框架，即在浏览器里嵌入另一个窗口，父框架和子框架拥有独立的作用域和上下文。
  
- **history**：以栈(FIFO)的形式保存着页面被访问的历史记录，页面前进即入栈，页面返回即出栈。
  
- **location**：提供了当前窗口中加载的文档相关信息以及一些导航功能。
  
- **navigator**：用来描述浏览器本身，包括浏览器的名称、版本、语言、系统平台、用户特性字符串等信息。
  
- **screen**：提供了浏览器显示屏幕的相关属性，比如显示屏幕的宽度和高度，可用宽度和高度等信息。

## frames常用属性及API

``` js
通过window获取iframe
window.frames[index]  // 通过序号获取
window.frames[name]   // 通过name获取

通过iframe获取window、document
iframe.contentWindow  // 获取iframe window
iframe.contentDocument // 获取iframe document
iframe.contentWindow.document // 获取iframe document

window获取顶级窗口、父窗口
window.top // 获取顶级窗口
window.parent // 获取父级窗口
```

### 拓展
iframe之间通信 window.postMeaasge ([详信](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage))

## location常用属性及API

``` js
location.replace() // 导航改变，不会生成新的记录
location.reload(forcedReload) // forcedReload=true 将强制浏览器从服务器重新获取当前页面资源，而不是从浏览器的缓存中读取(但页面引用的资源还是可能使用缓存)，如果取值为 forcedReload=false 或不传该参数时，浏览器则可能会从缓存中读取当前页面
```

### 拓展
改变浏览器导航的常用方法：
``` js
// 原来的窗体中直接跳转用
location.href="你所要跳转的页面"
window.navigate("top.jsp")
self.location='top.htm'
top.location='top.htm'
location.assign('top.htm')
// 新窗体中打开页面用
window.open('你所要跳转的页面') //open第二个参数标识新窗口ID，ID.close()关闭
// 历史记录跳转
history.go(-1)  // 后退一页
history.go(1)  // 前进一页
history.go('xxx')  // 跳转到历史纪录包含xxx的第一个位置-可能后退、前进，未搜索到什么也不做
history.back()
history.forward()
history.go(0) // 刷新当前页面
document.execCommand('Refresh') // 刷新当前页面
```

## navigator常用属性及API

``` js
const ua=navigator.userAgent // 浏览器的用户代理字符串（可判断浏览器版本（ie）、判断操作系统（android\IOS\pc））
const iphone = ua.indexOf('iPhone') > -1 // 判断是否iphone设备
const ipad = ua.indexOf('iPad') > -1 || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) // 判断是否ipad设备
const ipod = ua.indexOf('iPod') > -1 // 判断是否ipod设备
const android = ua.indexOf('Android') > -1 // 判断是否android设备
const iosVer = ua.toLowerCase().match(/cpu iphone os (.*?) like mac os/)[1]
```

ios留海屏设备需要先判断是否ios设备，再根据设备宽高做特殊判断，以less为例：
``` less
.ios-full-screen(@rules){
    &.ios{
        @media only screen and (device-width: 375px) and (device-height: 812px){ // iphonex iphonexs iphone11pro
            @rules();
        }
        @media only screen and (device-width: 414px) and (device-height: 896px){ // iphonexs max  iphonexr iphone11 iphone11pro max
            @rules();
        }
        @media only screen and (device-width: 390px) and (device-height: 844px){ // iphone12 
            @rules();
        }
        @media only screen and (device-width: 360px) and (device-height: 784px){ // iphone12 mini  iphone12pro
            @rules();
        }
        @media only screen and (device-width: 428px) and (device-height: 926px){ // iphone12pro max
            @rules();
        }
    }
}
```

## screen常用属性及API

``` js
screen.width // 设备宽度
screen.height // 设备高度
```

判断移动端设备横竖屏的方法，实现原理：屏幕宽高和文档宽高进行比较，不一致则为横屏，一致则为竖屏([原文链接](https://jelly.jd.com/article/6006b1045b6c6a01506c87db))

``` js
function detectOrient() {
	var cw = document.documentElement.clientWidth
	var _Width = 0
	var _Height = 0

	var sw = window.screen.width
	var sh = window.screen.height
	_Width = sw < sh ? sw : sh
	_Height = sw >= sh ? sw : sh

	if (cw <= _Height && cw > sh || cw > _Width || cw == _Height) {
		// 横屏
		
	} else if (cw <= _Width+5&&cw>=_Width-5) { // 部分设备上会出现 设备宽度与文档宽度不一致的情况，需要5px误差范围
		// 竖屏
		
	} else if ('orientation' in window) {
		var orientation = window.orientation
		if (orientation == 0 || orientation == 180) {
			// 竖屏
		} else if (orientation == 90 || orientation == -90) {
			// 横屏
		} 
	}
}
```