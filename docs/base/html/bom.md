# BOM
BOM 是 Browser Object Model 的缩写，即浏览器对象模型，当一个浏览器页面初始化时，会在内存创建一个全局的对象，用以描述当前窗口的属性和状态，这个全局对象被称为浏览器对象模型，即BOM。BOM的核心对象就是 window，window 对象也是BOM的顶级对象，其包含了浏览器的六个核心模块：

- **document**：即文档对象，渲染引擎在解析HTML代码时，会为每一个元素生成对应的DOM对象，由于元素之间有层级关系，因此整个HTML代码解析完以后，会生成一个由不同节点组成的树形结构，俗称DOM树，document 用于描述DOM树的状态和属性，并提供了很多操作DOM的API。
  
- **frames**：HTML 子框架，即在浏览器里嵌入另一个窗口，父框架和子框架拥有独立的作用域和上下文。
  
- **history**：以栈(FIFO)的形式保存着页面被访问的历史记录，页面前进即入栈，页面返回即出栈。
  
- **location**：提供了当前窗口中加载的文档相关信息以及一些导航功能。
  
- **navigator**：用来描述浏览器本身，包括浏览器的名称、版本、语言、系统平台、用户特性字符串等信息。
  
- **screen**：提供了浏览器显示屏幕的相关属性，比如显示屏幕的宽度和高度，可用宽度和高度等信息。