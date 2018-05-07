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
 * @prop {(e) => void} [onClick]
 * @prop {string | JSX.Element} [text]
 * @param {ButtonProps} props
 * @param {JSX.Element[]} children
 */
const Button = (props, children) => {
  const {
    fill = false,
    big = false,
    round = false,
    disabled = false,
    onClick = noop,
    text = '',
    ...r
  } = props

  return (
    <a
      {...r}
      disabled={disabled}
      class={cc(r.class, 'button', {
        'button-big': big,
        'button-fill': fill,
        'button-round': round
      })
      }
      onclick={onClick}
    >{text || children}</a>
  )
}

export default Button
