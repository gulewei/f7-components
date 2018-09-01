import { Component, VNode } from '../_util/interfaces'
import { ListItemProps } from '../list'

export default CheckboxItem

/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
declare const CheckboxItem: Component<CheckboxItemProperties>

export interface CheckboxItemProperties extends ListItemProps {
  name?: string
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
  onChange?: (checked: boolean) => any
  checkboxMedia?: VNode
  checkboxProps?: Object
}

