import { ElementProperties, Component, Bordered } from '../_util/interfaces'

export interface ToolbarProperties extends Bordered, ElementProperties {
  
}

interface ToolbarComponent<P> extends Component<P> {
  /**
   * Toolbar does not have any parts, just plain links inside
   */
  Link: Component<ElementProperties>
}

/**
 * Toolbar is a fixed (with Fixed and Through layout types) area at the bottom of a screen that contains navigation elements.
 */
declare const Toolbar: ToolbarComponent<ToolbarProperties>

export default Toolbar
