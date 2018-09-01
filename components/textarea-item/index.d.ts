import { Component } from '../_util/interfaces'
import { ListItemProps } from '../list'

export default TextareaItem

declare const TextareaItem: TextareaItemComponent<TextareaItemProperties>

interface TextareaItemComponent<P> extends Component<P> {
  resizableTextarea: (el: HTMLElement) => void
}

export interface TextareaItemProperties extends ListItemProps {
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


