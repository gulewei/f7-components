import { WraperProperties, Component } from '../_util/interfaces';

export default Loading

/**
 * Loading indicator
 */
declare const Loading: LoadingComponent<LoadingProperties>

type CloseLoading = () => void

export interface LoadingComponent<P> extends Component<P> {
  /**
   * Create a showing loading indicator, and remove it when close.
   */
  showIndicator: () => CloseLoading
  /**
   * Create an app instance and return it's actions, then you call action method to
   * show or hide or destroy this loading indicator
   */
  create: () => {
    show: () => void
    hide: () => void
    destroy: () => void
  }
}

export interface LoadingProperties extends WraperProperties { }
