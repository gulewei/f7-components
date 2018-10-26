import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @typedef {Object} ButtonProps
 * @prop {boolean} [fill=false]
 * @prop {boolean} [big=false]
 * @prop {boolean} [round=false]
 * @prop {string | JSX.Element} [text]
 * @prop {(e) => void} [onClick]
 *
 * @param {ButtonProps} props
 * @param {JSX.Element[]} children
 */
const Button = (props, children) => {
  const {
    fill,
    big,
    round,
    text = children,
    onClick,
    ...rests
  } = props

  return (
    <a
      {...rests}
      class={cc(
        rests.class,
        'button',
        {
          'button-big': big,
          'button-fill': fill,
          'button-round': round
        }
      )}
      onclick={onClick || rests.onclick}
    >
      {text}
    </a>
  )
}

export default Button
