import { Component, VNode } from '../_util/interfaces';
import { ListItemProps } from '../list'

export default RadioItem

/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
declare const RadioItem: Component<RadioItemProps>

export interface RadioItemProps extends ListItemProps {
  name?: string
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
  onChange?: (checked: boolean) => any
  radioMedia?: VNode
  radioProps: Object
}
