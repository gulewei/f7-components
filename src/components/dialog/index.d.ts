interface DialogButtonProperties {
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


interface DialogProperties {
  /**
   * Visible
   */
  show?: boolean
  /**
   * Wraper element class name
   */
  wraperClass?: string
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
  /**
   * Enter transition class
   * Default as 'anim-bouncein'
   */
  enterClass?: string
  /**
   * Exit transition class
   * Default as 'anim-bouncout
   */
  exitClass?: string

}

/**
 * Dialog component
 */
const Dialog: Component<DialogProperties>

export default Dialog
