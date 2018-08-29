import { WraperProperties, Component } from '../_util/interfaces'

/**
 * Data item
 */
export interface PickerItemProperites {
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
  children?: Array<PickerItemProperites>
}

/**
 * Column style props
 */
export interface PickerColumnProperties {

  isDivider?: boolean

  content?: string

  class?: string

  key?: string

  width?: number

  align?: 'left' | 'center'
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
  items: Array<PickerItemProperites> | Array<Array<PickerItemProperites>>
  /**
   * Picker value
   */
  values: string[]
  /**
   * Picker column style
   */
  columns?: Array<PickerColumnProperties>
  /**
   * Callback when picker value change
   */
  onChange: (values: string[]) => any
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
  // /**
  //  * Enter-animation complete hook
  //  */
  // onEntered?: (el: HTMLElement) => void
  /**
   * Destory hook
   */
  onClose?: (el: HTMLElement) => void
}

/**
 * Default picker, with Modal and Columns
 */
export interface PickerProperties extends PickerWraperProperties, PickerModalProperties, PickerColumnsProperties { }

export interface ModalPickerProperties extends PickerWraperProperties, PickerModalProperties { }

export interface InlinePickerProperties extends PickerModalProperties, PickerColumnsProperties { }

export interface PickerToolbarProperties {

  left?: JSX.Element

  right?: JSX.Element

  center?: JSX.Element

  toolbarClass?: string
}

/**
 * 
 */
export interface PickerMethodProperties extends PickerWraperProperties, PickerModalProperties, PickerColumnsProperties {
  /**
   * Modal picker content
   */
  content?: JSX.Element
  // toolbarText?: string
  // onDone?: (values: string[]) => void
  toolbarClass?: string
  okText?: string
  cancelText?: string
  onOk?: (values: string[]) => void
  onCancel?: (values: string[]) => void
}

interface PickerComponent<P> extends Component<P> {
  /**
 * Custom picker content
 */
  Modal: Component<ModalPickerProperties>
  /**
   * Inline picker
   */
  Inline: Component<InlinePickerProperties>

  Toolbar: Component<PickerToolbarProperties>

  open: (props: PickerMethodProperties) => void,
  openModal: (props: PickerMethodProperties) => void,
  close: () => void
}

/**
 * Picker component
 */
declare const Picker: PickerComponent<PickerProperties>

export default Picker

