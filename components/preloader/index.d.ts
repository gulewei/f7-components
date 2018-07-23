import { ElementProperties, Component } from '../_util/interfaces'

export interface PreloaderProperties extends ElementProperties {
  /**
   * Color
   */
  white?: boolean

}

/**
 * Preloader component
 */
declare const Preloader: Component<PreloaderProperties>

export default Preloader
