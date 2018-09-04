---
category: Components
type: Data Display
title: List
---

[ks-demo](https://venecy.github.io/f7c/kitchen-sink/#/list)
[code-example](https://github.com/venecy/f7c/blob/master/kitchen-sink/demos/Lists.js)

List views are versatile and powerful user interface compontents frequently found in iOS apps. A list view presents data in a scrollable list of multiple rows that may be divided into sections/groups.

List views have many purposes:

* To let users navigate through hierarchically structured data
* To present an indexed list of items
* To display detail information and controls in visually distinct groupings
* To present a selectable list of options


## API

### List

`List` is your list view elements wrapper, all your list elements should be wrapped within.

Properties | Descrition | Type | Default
-----------|------------|------|--------
| inset | Makes list block inset | Boolean | false |
| label | Add list block label at the end of list block | String | - |
| useForm | Enables `<form>` tag on list block instead of `<div>` | Boolean | false |
| isGroup | Enables `List.Group`s as children | Boolean | false |
| noHairlines | removes outer hairlines | Boolean | false |
| noHairlinesBetween | removes inner hairlines | Boolean | false |


### List.Item

Single list element has pretty complex but flexible layout.

Properties | Descrition | Type | Default
-----------|------------|------|--------
| media | List item media (icon, image, etc) | Slot | - |
| title | List item title | Slot | Children |
| after | List item label | Slot | - |
| subTitle | List item subtitle (Media List) | Slot | - |
| text | List item text (Media List) | Slot | - |
| isLink | Use link element style | Boolean | false |
| input | List item contained form input HTML element | Slot | - |
| useLabel | Use `<label>` as wraper element | Boolean | false |
| contentStart | Element will be inserted in the beginning of `<div class="item-content">` element | Slot | - |
| alignTop | Change alignment to flex-start | Boolean | false |


### List.Group

Sometimes we need to group list view elements inside of single list block. In this case we need to additional group elements

Properties | Descrition | Type | Default
-----------|------------|------|--------
| title | With list groups, group titles have sticky position during scroll within single group | Slot | - |

### List.Divider

List divider is a simple list element with title to visually divide one list items from another

Properties | Descrition | Type | Default
-----------|------------|------|--------
| - | - | - | - |

