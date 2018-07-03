import { CheckProperties, Component } from '../_utils/interfaces';
import { ListItemProperties } from '../list'

export interface RadioItemProperties extends CheckProperties,  ListItemProperties {}

/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
declare const RadioItem: Component<RadioItemProperties>

export default RadioItem

