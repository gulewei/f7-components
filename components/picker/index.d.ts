import { WraperProperties, Component } from '../_util/interfaces'

export default Picker

/**
 * Picker component
 */
declare const Picker: PickerComponent<PickerProperties>

type ClosePicker = () => void

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
  open: (options: PickerOptions) => ClosePicker
  modal: (options: ModalOptions) => ClosePicker
}

type ActionAccessor = (_, { close: ClosePicker }) => any

interface PickerOptions extends PickerProperties, PickerToolbarProperties {
  onChange?: (values: string[]) => ActionAccessor
  onOverlayClick?: (e: Event) => ActionAccessor
  onOk?: (values: string[]) => ActionAccessor
  onCancel?: (values: string[]) => ActionAccessor
  onOpen?: (el: HTMLElement) => ActionAccessor
  onClose?: (el: HTMLElement) => ActionAccessor
}

interface ModalOptions extends ModalPickerProperties, PickerToolbarProperties {
  content: JSX.Element
  onOverlayClick?: (e: Event) => ActionAccessor
  onOk?: (values: string[]) => ActionAccessor
  onCancel?: (values: string[]) => ActionAccessor
  onOpen?: (el: HTMLElement) => ActionAccessor
  onClose?: (el: HTMLElement) => ActionAccessor
}

/**
 * Default picker, with Modal and Columns
 */
export interface PickerProperties extends PickerWraperProperties, PickerModalProperties, PickerColumnsProperties { }
export interface ModalPickerProperties extends PickerWraperProperties, PickerModalProperties { }
export interface InlinePickerProperties extends PickerModalProperties, PickerColumnsProperties { }

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
  toolbar?: JSX.Element<ToolbarProperties>
  /**
   * Create hook
   */
  onOpen?: (el: HTMLElement) => void
  /**
   * Destory hook
   */
  onClose?: (el: HTMLElement) => void
}

export interface PickerToolbarProperties {
  /**
   * Rendered as children of `Toolbar`
   */
  title?: string
  okText?: string
  cancelText?: string
  toolbarClass?: string
  onOk?: (el: HTMLElement) => void
  onCancel?: (el: HTMLElement) => void
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
type ItemModel = {
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
type ColumnModel = {
  isDivider?: boolean
  content?: string
  class?: string
  key?: string
  width?: number
  align?: 'left' | 'center'
}
