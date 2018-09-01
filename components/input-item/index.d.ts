import { Component } from '../_util/interfaces'
import { ListItemProps } from '../list'

export default InputItem

/**
 * InputItem must wrapped by a `List`
 */
declare const InputItem: Component<InputItemProps>

export interface InputItemProps extends ListItemProps {
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
  onChange?: (val: string) => any
  onFoucs?: (e: Object) => any
  onBlur?: (e: Object) => any
  inputProps?: Object
}


