import { Component, ElementProperties } from '../_util/interfaces'

export default ImgIcon

/**
 * Simple backgroud-image based icons.
 */
declare const ImgIcon: ImgIconComponent<ImgIconProps>

interface ImgIconComponent<P> extends Component<P> {
  Back: JSX.Element,
  Forward: JSX.Element
}

export interface ImgIconProps extends ElementProperties {
  name: string
}
