import { Component } from "hyperapp"
import { ElementProperties } from '../_utils/interfaces'

export interface PageProperties extends ElementProperties {

  navbar?: JSX.Element

  toolbar?: JSX.Element

  outside?: JSX.Element
}

/**
 * Page component
 */
declare const Page: Component<PageProperties>

export default Page
