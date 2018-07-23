---
category: Components
type: Data Entry
title: Radio
subtitle: 单选框
---

单选框

## API

### Radio

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| name    |   name  | String |   无  |
| checked |   指定当前是否选中  | Boolean  | 无  |
| onChange | change 事件触发的回调函数 | (e: Object): void |   无  |
| disabled |  禁用  | Boolean |  false  |
| readonly | 只读 | Boolean | false |
| radioMedia | 单选图标 | VNode | 预定义单选 |
| radioProps | 其他属性 | Object | 无 |

### Radio.RadioItem

基于`ListItem`对封装,`ListItem`的`extra`属性固定传入`Radio`,其他属性和`List.Item`一致。
其他 API 和 Radio 相同。
