---
category: Components
type: Data Entry
title: Radio
---

Radio.

## API

### RadioItem

`RadiosItem` is not a separate component, but just a particular case of using `List` and `ListItem` components.

Properties | Descrition | Type | Default
-----------|------------|------|--------
| name    |   name  | String |   -  |
| checked    |   to set the current checked state  | Boolean  | -  |
| disabled      |  whether disabled  | Boolean |  false  |
| readonly | whether readonly | Boolean | false |
| onChange    | a callback function, can be executed when the checked state changes | (e: Object): void |  -  |
| redioMedia | radio icon | VNode | default readio icon |
| radioProps | other props | {} | - |
