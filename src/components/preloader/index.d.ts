import { Component } from 'hyperapp'
import { ElementProperties } from '../_utils/interfaces'

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
