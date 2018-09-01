---
category: Components
type: Data Entry
title: RadioItem
subtitle: 单选框
---

单选框，基于`List.Item`封装,`List.Item`的`input`、`media`、`contentStart`属性固定传入, 其他属性和`List.Item`一致。

## API


属性 | 说明 | 类型 | 默认值
----|-----|------|------
| name    |   name  | String |   无  |
| checked |   指定当前是否选中  | Boolean  | 无  |
| disabled |  禁用  | Boolean |  false  |
| readonly | 只读 | Boolean | false |
| onChange | change 事件触发的回调函数 | (e: Object): void |   无  |
| radioMedia | 单选图标 | VNode | 预定义单选 |
| radioProps | 其他属性 | Object | 无 |

