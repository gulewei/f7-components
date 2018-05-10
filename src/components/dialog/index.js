// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Mask from '../Mask'
import { addClass, css, requestAnimationFrame } from '../_utils'
import cc from 'classnames'
import './index.less'

// eslint-disable-next-line
const DialogButton = ({ text, bold, onclick }) => {
  return (
    <span
      class={cc('modal-button', { 'modal-button-bold': bold })}
      onclick={onclick}
    >{text}</span>
  )
}

/**
 *
 * @param {HTMLElement} el
 */
const transitionEl = el => {
  requestAnimationFrame(_ => {
    css(el, { display: 'block' })
    css(el, { 'margin-top': `-${el.offsetHeight / 2}px` })
    addClass(el, 'modal-in')
  })
}

/**
 * 按钮
 * @typedef {Object} DialogButtonProps
 * @prop {string} text
 * @prop {(e) => void} onclick
 * @prop {boolean} [bold=false]
 * 弹框
 * @typedef {Object} DialogProps
 * @prop {boolean} show
 * @prop {string} title
 * @prop {string} text
 * @prop {string} [afterText]
 * @prop {DialogButtonProps[]} [buttons=[]]
 * @prop {() => void} [onButtonsClick]
 * @prop {() => void} [onMaskClick]
 * @prop {boolean} [verticalButtons=false]
 * @param {DialogProps} props
 */
const Dialog = (props) => {
  const {
    show,
    title,
    text,
    afterText,
    buttons = [],
    onButtonsClick,
    onMaskClick,
    verticalButtons,
    ...r
  } = props

  const buttonWraperCls = cc('modal-buttons', { 'modal-buttons-vertical': verticalButtons })

  return (
    <div {...r}>
      {show && [
        <div class="modal" oncreate={transitionEl}>
          <div class="modal-inner">
            <div class="modal-title">{title}</div>
            <div class="modal-text">{text}</div>
            {afterText}
          </div>
          <div class={buttonWraperCls} onclick={onButtonsClick} >
            {buttons.map(button => <DialogButton {...button} />)}
          </div>
        </div>,
        <Mask show onclick={onMaskClick} />
      ]}
    </div>
  )
}

export default Dialog
