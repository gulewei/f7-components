import { ElementProperties, OuterHairlines, InnerHairlines, Component } from '../_utils/interfaces'

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
declare const List: Component<ListProperties>

export default List

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
