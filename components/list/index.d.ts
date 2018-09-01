import { ElementProperties, OuterHairlines, InnerHairlines, Component, Slot } from '../_util/interfaces'

export default List

/**
 * `List` is your list view elements wrapper, all your list elements should be wrapped within.
 */
declare const List: ListComponent<ListProps>

interface ListComponent<P> extends Component<P> {
  /**
   * Single list element has pretty complex but flexible layout.
   */
  Item: Component<ListItemProps>
}

export interface ListProps extends ElementProperties, OuterHairlines, InnerHairlines {
  /**
   * Makes list block inset
   */
  inset?: boolean
  /**
   * Add list block label at the end of list block
   */
  label?: Slot
  /**
   * Enables `<form>` tag on list block instead of `<div>`
   */
  useForm?: boolean
}

export interface ListItemProps extends ElementProperties {
  /**
   * List item media (icon, image, etc) 
   */
  media?: Slot
  /**
   * List item title
   */
  title: Slot
  /**
   * List item label
   */
  after?: Slot
  /**
   * List item subtitle (Media List) 
   */
  subTitle?: Slot
  /**
   * List item text (Media List) 
   */
  text?: Slot
  /**
   *  Use link element style
   */
  isLink?: boolean
  /**
   * List item contained form input HTML element
   */
  input?: Slot
  /**
   * Use `<label>` as wraper element
   */
  useLabel?: boolean
  /**
   * Element will be inserted in the beginning of `<div class="item-content">` element
   */
  contentStart?: Slot
  /**
   *  Change alignment to flex-start
   */
  alignTop?: boolean
}
