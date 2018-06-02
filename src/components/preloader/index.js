import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

/**
 * @typedef {Object} PreloaderProps
 * @prop {boolean} [white]
 * @prop {string} preloaderClass
 *
 * @param {PreloaderProps} props
 */
const Preloader = (props) => {
  return (
    <span class={cc('preloader', props.preloaderClass, { 'preloader-white': props.white })}></span>
  )
}

export default Preloader
