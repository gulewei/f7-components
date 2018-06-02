import { ElementProperties } from '../_utils/interfaces'
import { Component } from 'hyperapp';

export interface ListProperties extends ElementProperties {

  inset?: boolean

  label?: string | JSX.Element

}

/**
 * List component
 */
declare const List: Component<ListProperties>

export default List

export interface ListItemProperites extends ElementProperties {

  isLink?: boolean

  alignTop?: boolean

  media?: JSX.Element

  title: JSX.Element

  after?: JSX.Element

  subTitle?: JSX.Element

  text?: JSX.Element

  inpute?: JSX.Element

  extraMedia?: JSX.Element


}