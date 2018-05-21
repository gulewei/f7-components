import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

/**
 * @typedef {Object} PreloaderProps
 * @prop {boolean} [white]
 * TODO: material theme
 * @prop {'ios' | 'material'} [theme='ios']
 * @param {PreloaderProps} props
 */
const Preloader = (props) => {
  return (
    <span class={cc('preloader', { 'preloader-white': props.white })}></span>
  )
}

export default Preloader
