import { WraperProperties, TransitionProperties, Component } from '../_util/interfaces'

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

export interface PickerColumnProperties {

  isDivider?: boolean

  content?: string

  class?: string

  key?: string

  width?: number

  align?: 'left' | 'center'
}

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

export interface PickerModalProperties {
  /**
   * Picker modal class
   */
  modalClass?: string
  /**
   * Picker toolbar element
   */
  toolbar?: JSX.Element
}

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

export interface PickerProperties extends PickerWraperProperties, PickerModalProperties, PickerColumnsProperties { }

export interface PickerMethodProperties extends PickerWraperProperties, PickerModalProperties, PickerColumnsProperties {
  content?: JSX.Element
  toolbarText?: string
  onDone?: (values: string[]) => void
}

export interface PickerComponent<P> extends Component<P> {
  open: (props: PickerMethodProperties) => void,
  openConent: (props: PickerMethodProperties) => void,
  close: () => void
}

/**
 * Picker component
 */
declare const Picker: PickerComponent<PickerProperties>

export default Picker

export interface ContentPickerProperties extends PickerWraperProperties, PickerModalProperties { }

/**
 * Custom picker content
 */
export const ContentPicker: Component<ContentPickerProperties>

export interface InlinePickerProperties extends PickerModalProperties, PickerColumnsProperties { }

/**
 * Inline picker
 */
export const InlinePicker: Component<InlinePickerProperties>

export interface PickerToolbarProperties {

  left?: JSX.Element

  right?: JSX.Element

  center?: JSX.Element

  toolbarClass?: string
}

export const PickerToolbar: Component<PickerToolbarProperties>
