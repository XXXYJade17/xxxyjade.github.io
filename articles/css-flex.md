[TOC]

# 🔹基本概念



## 📌Flexible Box

Flexible Box 模型，一种一维的布局模型。为 Flexible Box 的子元素之间提供了强大的空间分布和对齐能力，可灵活控制项目的排列、对齐、空间分配，彻底解决传统浮动布局的塌陷、对齐复杂问题。



## 📌两根轴线



### ✨主轴

主轴由 `flex-direction` 定义，可以取 4 个值：

- `row`
- `row-reverse`
- `column`
- `column-reverse`



如果选择了 `row` 或者 `row-reverse`，主轴将沿着**横向**延伸。

![当主轴方向设置为 row 时，主轴沿着行向延伸](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts/basics1.svg)

如果选择 `column` 或者 `column-reverse` ，主轴将沿着**竖向向**延伸。

![当主轴方向设置为 column 时，主轴沿着块向延伸](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts/basics2.svg)

# 🔹Flex 属性



## 📌容器属性



### ✨justify-content：主轴对齐

- `flex-start`：左对齐/上对齐（默认）

- `flex-end`：右对齐/下对齐

- `center`：居中对齐

- `space-between`：两端对齐，项目之间间距相等

- `space-around`：每个项目两侧间距相等（两端间距是中间的一半）

- `space-evenly`：所有间距（包括两端）完全相等



### ✨align-items：侧轴对齐

- `stretch`：项目未设置高度时，拉伸填满容器（默认）
- `flex-start`：顶部对齐/左对齐

- `flex-end`：底部对齐/右对齐

- `center`：垂直居中/水平居中

- `baseline`：按项目内文字的基线对齐（文字底部对齐）



### ✨flex-wrap：换行控制

- `nowrap`：不换行，项目会压缩宽度适应容器（默认）

- `wrap`：换行，超出容器的项目自动折行

- `wrap-reverse`：换行，且折行后的项目倒序排列



### ✨align-content：多行侧轴对齐（仅换行时生效）

- `stretch`：拉伸填满容器（默认）

- `flex-start`：多行整体靠上/靠左

- `flex-end`：多行整体靠下/靠右

- `center`：多行整体居中

- `space-between`：多行两端对齐，行间距相等

- `space-around`：每行两侧间距相等



### ✨flex-flow

- `row wrap`：项目水平从左到右排列，超出容器时自动换行

- `column nowrap`：项目垂直从上到下排列，不换行，空间不足时压缩项目高度

- `row-reverse wrap-reverse`：项目水平从右到左排列，超出容器时自动倒序换行



## 📌元素属性



### ✨flex-grow：放大比例

- 默认0：不放大，保持初始尺寸

- 所有项目的`flex-grow`之和为总份数，剩余空间按份数分配

- 示例：`flex-grow:1;` 表示占1份剩余空间，多个项目设为1则平分剩余空间



### ✨flex-shrink：缩小比例

- 默认1：容器空间不足时，按比例压缩项目
- 设为0：不压缩，保持初始尺寸（固定宽度项目常用）



### ✨flex-basis：初始尺寸

- 默认`auto`：使用项目的`width`/`height`
- 设为具体值：项目初始尺寸为该值，优先级高于`width`/`height`



### ✨flex简写（高频使用）

- `flex:1;`：等价于`flex:1 1 0%;`，项目自动放大缩小，占满剩余空间
- `flex:auto;`：等价于`flex:1 1 auto;`
- `flex:none;`：等价于`flex:0 0 auto;`，项目不放大不缩小，保持初始尺寸



### ✨order：排列顺序

- 可以是负数，数字越小越靠前
- 示例：`order:-1;` 会排在默认项目前面



### ✨align-self：单独对齐

- `auto`：继承父元素的`align-items`（默认）
- 其他取值和`align-items`一致，仅对当前项目生效