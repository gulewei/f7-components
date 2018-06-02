// eslint-disable-next-line no-unused-vars
import { h } from 'hyperapp'
import cc from 'classnames'
import { noop } from '../_utils'
import './index.less'

/**
 * @typedef {Object} ButtonProps
 * @prop {boolean} [fill=false]
 * @prop {boolean} [big=false]
 * @prop {boolean} [round=false]
 * @prop {boolean} [disabled=false]
 * @prop {string | JSX.Element} [text]
 * @prop {(e) => void} [onclick]
 * @prop {string} [class]
 * @prop {string} [key]
 *
 * @param {ButtonProps} props
 * @param {JSX.Element[]} children
 */
const Button = (props, children) => {
  const {
    fill = false,
    big = false,
    round = false,
    disabled = false,
    text = '',
    ...restProps
  } = props

  return (
    <a
      {...restProps}
      disabled={disabled}
      class={cc(restProps.class, 'button', {
        'button-big': big,
        'button-fill': fill,
        'button-round': round
      })
      }
    >{text || children}</a>
  )
}

export default Button
