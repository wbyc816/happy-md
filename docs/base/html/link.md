# link

HTML外部资源链接元素 (`<link>`) 规定了当前文档与外部资源的关系。该元素最常用于链接样式表(外部CSS)，此外也可以被用来创建站点图标(比如PC端的“favicon”图标和移动设备上用以显示在主屏幕的图标) 。

``` html
<link href="main.css" rel="stylesheet">
<link rel="icon" href="favicon.ico">
```

## 预加载preload

将rel设定为preload，表示浏览器应该预加载该资源 。as属性表示获取特定的内容类。crossorigin属性表示该资源是否应该使用一个CORS请求来获取。

``` html
<link rel="preload" href="https://source.ddkt365.com/main.js" as="script">
```

preload 还有许多其他好处。使用 as 来指定将要预加载的内容的类型，将使得浏览器能够：

- 更精确地优化资源加载优先级。
- 匹配未来的加载需求，在适当的情况下，重复利用同一资源。
- 为资源应用正确的内容安全策略。
- 为资源设置正确的 Accept 请求头。

::: warning prefetch
`<link rel="prefetch">` 已经被许多浏览器支持了相当长的时间，但它是意图预获取一些资源，以备下一个导航/页面使用（比如，当你去到下一个页面时）。这很好，但对当前的页面并没有什么助益。此外，浏览器会给使用`prefetch`的资源一个相对**较低**的优先级——与使用`preload`的资源相比。毕竟，当前的页面比下一个页面相对更加重要。
:::

## dns-prefetch

DNS Prefetch 是一种 DNS 预解析技术。当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页中的连接时就无需进行 DNS 的解析，减少用户等待时间，提高用户体验。
目前每次DNS解析，通常在200ms以下。针对DNS解析耗时问题，一些浏览器通过DNS Prefetch 来提高访问的流畅性。

``` html
<link rel="dns-prefetch" href="//source.ddkt365.com">
```

通常是将页面上资源常用的域名加入dns-prefetch，来加快资源的加载速度。