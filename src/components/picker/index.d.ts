interface PickerItemProperites {
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

interface PickerColumnProperties {

  isDivider?: boolean

  content?: string

  prop
}

interface PickerProperties {
  /**
   * Visible
   */
  show: boolean
  /**
   * Wraper element class
   */
  wraperClass?: string
  /**
   * Wraper element key
   */
  wraperKey?: string

  onOverlayClick?: (e: Event) => void

  modalClass?: string

  toolbar?: JSX.Element

  cascade?: boolean

  items: Array<PickerItemProperites>

  values: string[]

  columns?: Array
}