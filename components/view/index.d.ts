import { ElementProperties, Component } from '../_util/interfaces'

export interface ViewProperties extends ElementProperties {
  outside?: JSX.Element
}

declare const View: Component<ViewProperties>

export default View
