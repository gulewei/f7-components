import { Component } from 'hyperapp'

export as namespace F7cPicker

interface PickerProps extends PickerModalProps, PickerColumnsProps {
  show: boolean
  onOverlayClick: () => void
}

/**
 * Picker component
 */
const Picker: Component<PickerProps>
export default Picker

type PickerModalProps = {
  toolbar?: JSX.Element
  noColumns?: boolean
  inline?: boolean
  class?: string
}

export const PickerModal: Component<PickerColumnsProps>

type Items = ItemProps[] | ItemProps[][] | CascadeItem[]

type PickerColumnsProps = {
  cascade?: boolean
  items: Items
  values: string[]
  /**
   * Use to set colums style and dividers. When provided, it's length must agree with the real columns length
   */
  columns: ColumnModel
  onChange: (val: string) => void
}

/**
 * PickerColumns component
 */
export const PickerColumns: Component<Component>

/**
 * Picker item props
 */
interface ItemProps {
  label: string,
  value: string
}

/**
 * Cascade item props
 */
interface CascadeItem {
  label: string,
  value: string,
  children: CascadeItem[]
}

/**
 * column common props
 */
interface ColumnProps {
  calss?: string,
  key?: string,
  width?: number,
  align?: 'left' | 'center'
}

interface ColumnModel {
  props?: ColumnProps,
  isDivder?: boolean,
  /**
   * Divider only
   */
  content?: string
}

interface ColumnContent {
  items: ItemProps[],
  value: string
}

/**
 * Final column model
 */
interface FinalColumnModel {
  props?: ColumnProps,
  isDivder?: boolean,
  content: ColumnContent | string
}
