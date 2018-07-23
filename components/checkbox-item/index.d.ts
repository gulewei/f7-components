import { Component, VNode } from '../_util/interfaces';
import { ListItemProperties } from '../list'

export interface CheckboxItemProperties extends ListItemProperties {
  checked?: boolean
  onChange?: (checked: boolean) => any
  name?: string
  disabled?: boolean
  readonly?: boolean
  checkboxProps?: Object
  checkboxMedia?: VNode
}

/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
declare const CheckboxItem: Component<CheckboxItemProperties>

export default CheckboxItem

