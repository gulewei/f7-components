import { Component, ElementProperties } from '../_utils/interfaces'

export interface ImgIconProperties extends ElementProperties {
  name: string
}

declare const ImgIcon: Component<ImgIconProperties>

export default ImgIcon
