import { WraperProperties, Component } from '../_util/interfaces';

export interface LoadingProperties extends WraperProperties {}

export interface LoadingComponent<P> extends Component<P> {
  show: () => void,
  hide: () => void
}

/**
 * Loading component
 */
declare const Loading: LoadingComponent<LoadingProperties>

export default Loading
