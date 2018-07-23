import { Component } from '../_util/interfaces'
import { ListItemProperties } from '../list'

export interface InputItemProperties extends ListItemProperties {
  type?: 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'date'
  | 'url',
  value?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  onChange?: (val: string) => Object
  onFoucs?: (val: string) => Object
  onBlur?: (val: string) => Object
  inputProps?: Object
}

declare const InputItem: Component<InputItemProperties>
export default InputItem
