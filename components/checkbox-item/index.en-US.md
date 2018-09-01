---
category: Components
type: Data Entry
title: CheckboxItem
---

`CheckboxItem` is not a separate component, but just a particular case of using `List.Item` components.


## API


Properties | Descrition | Type | Default
-----------|------------|------|--------
| name    |   name  | String |   -  |
| checked   |   checked  | Boolean  | false  |
| disabled  |  disabled  | Boolean |  false  |
| readonly   | readonly | Boolean | false |
| onChange   | callback when element `checked` changed | (e: boolean) => any |  -  |
| checkboxMedia | radio icon | VNode | default readio icon |
| checkboxProps | other props | Object | - |