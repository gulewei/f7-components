---
category: Components
type: Data Entry
title: Radio
subtitle: 单选框
---

单选框

## API

### RadioItem

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| name    |   name  | String |   无  |
| checked |   指定当前是否选中  | Boolean  | 无  |
| onChange | change 事件触发的回调函数 | (e: Object): void |   无  |
| disabled |  禁用  | Boolean |  false  |
| readonly | 只读 | Boolean | false |
| radioMedia | 单选图标 | VNode | 预定义单选 |
| radioProps | 其他属性 | Object | 无 |

基于`ListItem`封装,`ListItem`的`input`、`media`、`contentStart`属性固定传入, 其他属性和`ListItem`一致。
