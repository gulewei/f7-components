// eslint-disable-next-line no-unused-vars
import { h } from 'hyperapp'
import cc from 'classnames'
import '../css/button.css'
import { noop } from '../utils'

/**
 * @typedef {Object} ButtonProps
 * @prop {boolean} [fill=false]
 * @prop {boolean} [big=false]
 * @prop {boolean} [round=false]
 * @prop {boolean} [disabled=false]
 * @prop {(e) => void} [click]
 * @prop {string | JSX.Element} [text]
 * @param {ButtonProps} param0
 * @param {JSX.Element[]} children
 */
export const Button = (props, children) => {
  const {
    fill = false,
    big = false,
    round = false,
    disabled = false,
    onclick = noop,
    text = '',
    ...r
  } = props

  return (
    <a
      {...r}
      disabled={disabled}
      class={cc('button f7c-button', { 'button-big': big, 'button-fill': fill, 'button-round': round }, r.class)}
      onclick={onclick}
    >{text || children}</a>
  )
}
