import { Component } from '../_util/interfaces'
import { ListItemProperties } from '../list'

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

interface TextareaItemComponent<P> extends Component<P> {
  resizableTextarea: (el: HTMLElement) => void
}

declare const TextareaItem: TextareaItemComponent<TextareaItemProperties>

export default TextareaItem
