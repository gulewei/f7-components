import { Component, VNode } from '../_util/interfaces';
import { ListItemProperties } from '../list'

export interface RadioItemProperties extends ListItemProperties {
  checked?: boolean
  onChange?: () => any
  value?: string
  name?: string
  disabled?: boolean
  readonly?: boolean
  radioProps: Object
  radioMedia?: VNode
}

/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
declare const RadioItem: Component<RadioItemProperties>

export default RadioItem

