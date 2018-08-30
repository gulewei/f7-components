import { WraperProperties, Component } from '../_util/interfaces';

export default Loading

/**
 * Loading indicator
 */
declare const Loading: LoadingComponent<LoadingProperties>

type CloseActions = { close: () => void }

export interface LoadingComponent<P> extends Component<P> {
  /**
   * Show loading indicator, you can close it use `Loading.close`
   */
  show: () => void
  /**
   * Close loading indicator created by `Loading.show`
   */
  hide: () => void
  /**
   * Create a showing loading indicator, return actions with a `close` method.
   */
  create: () => CloseActions
}

export interface LoadingProperties extends WraperProperties { }
