import { Component } from 'hyperapp'
import { CheckProperties } from '../_util/interfaces';
import { ListItemProperties } from '../list'

export interface CheckboxItemProperties extends CheckProperties,  ListItemProperties {}

/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
declare const CheckboxItem: Component<CheckboxItemProperties>

export default CheckboxItem

