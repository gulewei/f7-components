import { WraperProperties, Component } from '../_util/interfaces'

export default Picker

/**
 * Picker component
 */
declare const Picker: PickerComponent<PickerProperties>

interface PickerComponent<P> extends Component<P> {
  /**
   * Picker with custom content and no columns
   */
  Modal: Component<ModalPickerProperties>
  /**
   * Inline picker
   */
  Inline: Component<InlinePickerProperties>
  /**
   * Predefined picker toolbar
   */
  Toolbar: Component<PickerToolbarProperties>
  /**
   * open a predefined picker
   */
  open: (options: PickerOptions) => void,
  openModal: (options: PickerOptions) => void,
  close: () => void
}

/**
 * Default picker, with Modal and Columns
 */
export interface PickerProperties extends PickerWraperProperties, PickerModalProperties, PickerColumnsProperties { }

export interface ModalPickerProperties extends PickerWraperProperties, PickerModalProperties { }

export interface InlinePickerProperties extends PickerModalProperties, PickerColumnsProperties { }

export interface PickerOptions extends PickerWraperProperties, PickerModalProperties, PickerColumnsProperties, PickerToolbarProperties {
  /**
   * Modal picker content
   */
  content?: JSX.Element
  /**
   * Overload toolbar prop
   */
  onOk?: (values: string[]) => void
  onCancel?: (values: string[]) => void
  /**
   * Rendered as children of `Toolbar`
   */
  title?: string
}

export interface PickerToolbarProperties {
  toolbarClass?: string
  okText?: string
  cancelText?: string
  onOk?: (el: HTMLElement) => void
  onCancel?: (el: HTMLElement) => void
}

/**
 * Wraper element props
 */
export interface PickerWraperProperties extends WraperProperties {
  /**
   * Visible
   */
  show: boolean
  /**
   * Wraper element class
   * Default as 'picker-wraper'
   */
  wraperClass?: string
  /**
   * Wraper element key
   */
  wraperKey?: string
  /**
   * Event handler when overlay clicked
   */
  onOverlayClick?: (e: Event) => void
}

/**
 * Modal props and Toolbar
 */
export interface PickerModalProperties {
  /**
   * Picker modal class
   */
  modalClass?: string
  /**
   * Picker toolbar element
   */
  toolbar?: JSX.Element
  /**
   * Create hook
   */
  onOpen?: (el: HTMLElement) => void
  /**
   * Destory hook
   */
  onClose?: (el: HTMLElement) => void
}

/**
 * Picker Columns
 */
export interface PickerColumnsProperties {
  /**
   * Cascade data
   */
  cascade?: boolean
  /**
   * Picker data
   */
  items: Array<ItemModel> | Array<Array<ItemModel>>
  /**
   * Picker value
   */
  values: string[]
  /**
   * Picker column style
   */
  columns?: Array<ColumnModel>
  /**
   * Callback when picker value change
   */
  onChange: (values: string[]) => any
}

/**
 * Data item
 */
export interface ItemModel {
  /**
   * Display label
   */
  label: string
  /**
   * Actual value
   */
  value: string
  /**
   * Children items (cascade picker only)
   */
  children?: Array<ItemModel>
}

/**
 * Column style props
 */
export interface ColumnModel {
  isDivider?: boolean
  content?: string
  class?: string
  key?: string
  width?: number
  align?: 'left' | 'center'
}
