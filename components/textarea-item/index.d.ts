import { Component } from '../_util/interfaces'
import { ListItemProperties } from '../list'

export function resizableTextarea(): {
  (el: HTMLElement): void
}

export interface TextareaItemProperties extends ListItemProperties {
  value?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  resizable?: boolean
  textareaProps?: Object
  onChange?: (val: string) => void
  onFocus?: (val: string) => void
  onBlur?: (val: string) => void
}

declare const TextareaItem: Component<TextareaItemProperties>

export default TextareaItem
