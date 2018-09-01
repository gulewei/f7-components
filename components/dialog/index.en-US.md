---
category: Components
type: Feedback
title: Dialog
---

`Dialog` is a small content pane that pops up over App's main content. Dialogs are usualy used to ask something from user, or to notify or warn user.


## API


### Dialog

Properties | Descrition | Type | Default
-----------|------------|------|--------
| title   | title | Slot | - |
| text | text content | Slot | Children |
| afterText | text that will be placed after `text` | Slot | - |
| buttons | array of buttons, each button should be presented as Object with button options (see below) | Array | - |
| verticalButtons | vertical buttons layout | Boolean | false |
| onButtonsClick | callback when user clicks any of Dialog's button | (e: Object) => void | - |
| onOverlayClick | callback when user clicks overlay |  (e: Object) => void | - |
| onOpen | create hook | (el: HTMLElement) => void | - |
| onClose | destroy hook | (el: HTMLELement) => void | - |


### ButtonOption

Properties | Descrition | Type | Default
-----------|------------|------|--------
| text | button's text | Slot | - |
| onclick | callback when user click this button | (e: Object) => void | - |
| bold | set to true for bold button text | Boolean | false |


### Dialog.alert: (text, title?, onOk?) => { close: () => void }

Properties | Descrition | Type | Default
-----------|------------|------|--------
| text | alert text | String | - |
| title   | title | String | 'Message' |
| onOk | callback when user click "Ok" button on alert dialog | () => void | false |


### Dialog.confirm: (text, title?, onOk?, onCancel?) => { close: () => void }

Properties | Descrition | Type | Default
-----------|------------|------|--------
| text | confirm text | String | - |
| title   | title | String | 'Message' |
| onOk | callback when user click "Ok" button on confirm dialog | () => void | - |
| onCancel | callback when user click "Cancel" button on confirm dialog | () => void | - |


### Dialog.action: (text, title?, buttons?) => { close: () => void }

Properties | Descrition | Type | Default
-----------|------------|------|--------
| text | confirm text | String | - |
| title   | title | String | 'Message' |
| buttons | array of buttons | Array | - |

### Dialog.custom: (props) => { close: () => void }

See Dialog properties

### Dialog.config: (options) => void

Properties | Descrition | Type | Default
-----------|------------|------|--------
| title   | title | String | 'Message' |
| okText | button text of alert or confirm right button | String | 'Ok' |
| cancelText | button text of confirm left button | String | 'Cancel' |