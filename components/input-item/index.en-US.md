---
category: Components
type: Data Entry
title: InputItem
---

**`InputItem` must wrapped by a [List]()**


## API


Properties | Descrition | Type | Default
-----------|------------|------|--------
| type | HTML5 input type | String  | 'text' |
| value | value | String | - |
| name    |   name  | String |   -  |
| placeholder | placeholder | String | - |
| disabled  |  disabled  | Boolean |  false  |
| readonly   | readonly | Boolean | false |
| onChange   | callback when input value changed | (val: String) => any |  -  |
| onFoucus |  callback when input foucsed | (e: Object) => any | - |
| onBlur |  callback when input blured | (e: Object) => any | - |
| inputProps | other element props | Object | - |