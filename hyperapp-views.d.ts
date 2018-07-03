import { VNode } from 'hyperapp'

export as namespace HyperappViews

//// ======== interfaces ======== ////

export type Fragment = Array<VNode | string | number | boolean | null>

export interface Component<P extends ElementProperties = {}> {
  (props: P, children: Array<VNode>): VNode | Fragment
}

export interface ElementProperties {

  key?: string

  class?: string

  onclick?: (e: Event) => void

  oncreate?: (el: HTMLElement) => void

  onupdate?: (el: HTMLElement, oldAttr: any) => void

  onremove?: (el: HTMLElement, done: () => void) => void

  ondestroy?: (el: HTMLElement) => void

  [restProps: string]: any

}

export interface TransitionProperties {
  /**
   * Enter transition class
   */
  enterClass?: string
  /**
   * Exit transition class
   */
  exitClass?: string

}

export interface WraperProperties {
  /**
   * Wrapered element visible
   */
  show: boolean
  /**
   * Wraper element key
   */
  wraperKey?: string
  /**
   * Wraper element class name
   */
  wraperClass?: string

}

export interface OuterHairlines {
  /**
   * Removes outer hairlines
   */
  noHairlines?: boolean
}

export interface InnerHairlines {
  /**
   * Removes inner hairlines
   */
  noHairlinesBetween?: boolean
}

export interface CheckProperties {

  checked: boolean

  name: string

  value: string

  onchange: (e: Event) => void

  disabled?: boolean

  readonly?: boolean

  required?: boolean
}

//// ======== CSSTransition ======== ////

/**
 * Perform an animation
 */
export function runAndCleanUp (): {
  (element: HTMLElement, startAnimation: () => void, finishAnimation: () => void): void
}
export interface CSSTransitionProperties {
  /**
   * Enter class name
   */
  enter?: string

  enterActive?: string

  exit?: string

  exitActive?: string
}
/**
 * Transition decarator component
 */
export const CSSTransition: Component<CSSTransitionProperties>

//// ======== Button ======== ////

export interface ButtonProperties extends ElementProperties {
  /**
   * Makes button filled color
   */
  fill?: boolean
  /**
   * Makes big button
   */
  big?: boolean
  /**
   * Makes button round
   */
  round?: boolean
  /**
   * Button content
   */
  text?: string | JSX.Element

  disabled?: boolean

}
/**
 * Buttons ready to use
 */
export const Button: Component<ButtonProperties>

//// ======== CheckboxItem ======== ////

export interface CheckboxItemProperties extends CheckProperties, ListItemProperties { }
/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
export const CheckboxItem: Component<CheckboxItemProperties>

//// ======== ContentBlock ======== ////

export interface ContentBlockProperties extends ElementProperties, OuterHairlines {
  /**
   * Adds additional "inner" element for content extra highlighting
   */
  inner?: boolean
  /**
   * Makes block inset
   */
  inset?: boolean
  /**
   * Add block title before Block (content-block or list-block)
   */
  title?: string | JSX.Element
}
/**
 * Content blocks designed (mostly) to add extra formatting and required spacing for text content:
 */
export const ContentBlock: Component<ContentBlockProperties>

//// ======== List ======== ////

export interface ListProperties extends ElementProperties, OuterHairlines, InnerHairlines {
  /**
   * Makes list block inse
   */
  inset?: boolean
  /**
   * Add list block label at the end of list block
   */
  label?: string | JSX.Element
  /**
   * Enables <form> tag on list block instead of <div>
   */
  useForm?: boolean
}
/**
 * List component
 */
export const List: Component<ListProperties>
export interface ListItemProperties extends ElementProperties {

  isLink?: boolean

  alignTop?: boolean

  useLabel?: boolean

  contentStart?: JSX.Element

  media?: JSX.Element

  title: string | JSX.Element

  input?: JSX.Element

  after?: string | JSX.Element

  subTitle?: JSX.Element

  text?: JSX.Element

}
export const ListItem: Component<ListItemProperties>


//// ======== Dialog ======== ////

export interface DialogButtonProperties {
  /**
   * Button content
   */
  text: string | JSX.Element
  /**
   * Click handler
   */
  onclick?: (e: Event) => void
  /**
   * bold font
   */
  bold?: boolean
}
export interface DialogProperties extends WraperProperties, TransitionProperties {
  /**
   * Title content
   */
  title: string | JSX.Element
  /**
   * Main content
   */
  text: string | JSX.Element
  /**
   * Sub-main content
   */
  afterText?: string | JSX.Element
  /**
   * Button properties
   */
  buttons: Array<DialogButtonProperties>
  /**
   * Event handler when any button is clicked
   */
  onButtonsClick?: (e: Event) => void
  /**
   * Event handler when mask is clicked
   */
  onMaskClick?: (e: Event) => void
  /**
   * Display buttons vertially
   */
  verticalButtons?: boolean
}
export interface DialogComponent<P> extends Component<P> {
  alert: (text: string, title?: string, onOk?: () => void) => () => void
  confirm: (text: string, title?: string, onOk?: () => void, onCancel?: () => void) => () => void
  action: (text: string, title?: string, buttons?: DialogButtonProperties[]) => () => void
  custom: (props: DialogProperties) => () => void
  setDefault: (options: { title?: string, okText?: string, cancelText?: string }) => void
}
/**
 * Dialog component
 */
export const Dialog: DialogComponent<DialogProperties>

//// ======== ImgIcon ======== ////

export interface ImgIconProperties extends ElementProperties {
  name: string
}
export const ImgIcon: Component<ImgIconProperties>

//// ======== Loading ======== ////

export interface LoadingProperties extends WraperProperties { }
export interface LoadingComponent<P> extends Component<P> {
  show: () => void,
  hide: () => void
}
/**
 * Loading component
 */
export const Loading: LoadingComponent<LoadingProperties>

//// ======== Overlay ======== ////

interface PossibleOverlayTypes {
  /**
   * Default overlay for most modals
   */
  modal: 'modal',
  /**
   * Invisible overlay
   */
  preloader: 'preloader-indicator',
  /**
   * Overlay for popup
   */
  popup: 'popup',
  /**
   * Overlay for picker
   */
  picker: 'picker-modal'
}
/**
 * Possible overlay types
 */
export const enumOverlayTypes: PossibleOverlayTypes

export interface OverlayProperties {
  /**
     * Overlay type
     */
  type: 'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'
  /**
   * Use animation when enter or exit
   */
  notAnimated?: boolean
  /**
   * Click handler when overlay clicked
   */
  onOverlayClick?: (e: Event) => void
  /**
   * Additional class name
   */
  overlayClass?: string
  /**
   * Element key
   */
  key?: string
}
/**
 * Overlay component
 */
export const Overlay: Component<OverlayProperties>

//// ======== Page ======== ////

export interface PageProperties extends ElementProperties {

  navbar?: JSX.Element

  toolbar?: JSX.Element

  outside?: JSX.Element
}
/**
 * Page component
 */
export const Page: Component<PageProperties>

//// ======== Picker ======== ////

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
  items: Array<PickerItemProperites>
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
/**
 * Picker component
 */
export const Picker: Component<PickerProperties>
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

//// ======== Preloader ======== ////

export interface PreloaderProperties extends ElementProperties {
  /**
   * Color
   */
  white?: boolean
}
/**
 * Preloader component
 */
export const Preloader: Component<PreloaderProperties>

//// ======== PullToRefresh ======== ////

interface PossibleRefreshStatus {
  deactivate: 'deactivate',
  activate: 'activate',
  release: 'release',
  finish: 'finish'
}
export const enumRefreshStatus: PossibleRefreshStatus
export interface IPullToRefreshIndicator {
  deactivate?: VNode
  activate?: VNode
  release?: VNode
  finish?: VNode
}
export interface PullToRefreshProperties extends ElementProperties {
  /**
   * 
   */
  distance: number
  /**
   * 
   */
  indicator?: IPullToRefreshIndicator

  onRefresh: (finish: () => void) => void

  onContainerScroll?: (e: HTMLElement) => void
  /**
   * Initial state can only be 'deactivate' or 'release'.
   */
  refreshStatus: string

  onRefreshChange: (status: string) => any

}
export const PullToRefresh: Component<PullToRefreshProperties>

//// ======== RadioItem ======== ////

export interface RadioItemProperties extends CheckProperties, ListItemProperties { }
/**
 * Checkboxes & Radios is not a separate component, but just a particular case of using <List> and <ListItem> components.
 */
export const RadioItem: Component<RadioItemProperties>

//// ======== RangeSlider ======== ////

export interface RangeSliderProperties extends ElementProperties { }
export const RangeSlider: Component<ElementProperties>

//// ======== Toast ======== ////

export interface ToastProperties extends WraperProperties, TransitionProperties {
  /**
   * A toast message of string or a VNode
   */
  msg: string | JSX.Element
  /**
   * Click handler when toast element is clicked
   */
  onToastClick?: (e: Event) => void

  /**
   * Specify class name of toast element
   */
  toastClass?: string
}
export interface ToastComponent<P> extends Component<P> {
  text: (msg: string, duration?: number) => void
}
/**
 * Toast componet
 */
export const Toast: ToastComponent<ToastProperties>

//// ======== Toolbars ======== ////

interface Bordered {
  noBorder?: boolean
}
export interface NavbarProperties extends Bordered, ElementProperties { }
/**
 * Navbar is a fixed (with Fixed and Through layout types) area at the top of a screen that contains Page title and navigation elements.
 */
export const Navbar: Component<NavbarProperties>
export interface ToolbarProperties extends Bordered, ElementProperties { }
/**
 * Toolbar is a fixed (with Fixed and Through layout types) area at the bottom of a screen that contains navigation elements.
 */
export const Toolbar: Component<ToolbarProperties>
/**
 * Toolbar does not have any parts, just plain links inside
 */
export const ToolbarLink: Component<ElementProperties>

//// ======== Views ======== ////

export interface ViewProperties extends ElementProperties { }
export const View: Component<ViewProperties>
