import { ElementProperties, Component } from '../_util/interfaces'

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
