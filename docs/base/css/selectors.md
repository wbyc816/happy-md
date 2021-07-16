# 选择器


样式权重：!important》内联》ID选择器》伪类=属性选择器=类选择器》元素选择器【p】》通用选择器(*)》继承的样式
可以把样式的应用方式分为几个等级，按照等级来计算权重：

| 选择器名        | 示例           | 权重  |
| ------------- |:-------------:| -----:|
| 后代选择器 | p span      |    0 |
| 子元素选择器 | p>span      |    0 |
| 兄弟选择器 | li~li      |    0 |
| 相邻兄弟选择器 | li+li      |    0 |
| 通用选择器 | *     |    0 |
| 标签选择器      | p      |   1 |
| 群组选择器 | p,span      |    1 |
| 伪元素选择器 | p:before      |    1 |
| 类选择器      | .class | 10 |
| 伪类选择器 | p:hover      |    10 |
| 属性选择器 | p[title]      |    10 |
| ID选择器 | #id      |    100 |
| 内联样式 | style=””     |    1000 |
| !important |      |    10000 |

