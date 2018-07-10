// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @typedef {Object} PreloaderProps
 * @prop {boolean} [white]
 * @prop {string} [class]
 *
 * @param {PreloaderProps} props
 */
const Preloader = (props) => {
  const {
    white,
    ...rest
  } = props

  return (
    <span {...rest} class={cc('preloader', rest.class, { 'preloader-white': white })}></span>
  )
}

export default Preloader
