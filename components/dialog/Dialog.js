// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import Transition from '../transition'
import { sizeEl, ANIM_NAMES } from '../_util'
import cc from 'classnames'

/**
 * 按钮
 * @typedef {Object} DialogButtonProps
 * @prop {string} text
 * @prop {(e) => void} onclick
 * @prop {boolean} [bold=false]
 * 弹框
 * @typedef {Object} DialogProps
 * @prop {boolean} show
 * @prop {string} [wraperClass]
 * @prop {string} title
 * @prop {string} text
 * @prop {string} [afterText]
 * @prop {DialogButtonProps[]} [buttons=[]]
 * @prop {() => void} [onButtonsClick]
 * @prop {() => void} [onOverlayClick]
 * @prop {(el: HTMLElement) => void} [onOpen]
 * @prop {(el: HTMLElement) => void} [onClose]
 * @prop {boolean} [verticalButtons=false]
 * @prop {string} [enterClass='anim-bouncein']
 * @prop {string} [exitClass='anim-bouncout]
 * @prop {string} [wraperKey]
 *
 * @param {DialogProps} props
 */
const Dialog = (props, children) => {
  const {
    title,
    text = children,
    afterText,
    buttons = [],
    onButtonsClick,
    onOverlayClick,
    verticalButtons,
    onOpen,
    onClose,
    show,
    wraperClass = 'dialog-wraper',
    wraperKey,
    enterClass = ANIM_NAMES.bounceIn,
    exitClass = ANIM_NAMES.bounceOut
  } = props

  const buttonWraperCls = cc(
    'modal-buttons',
    {
      'modal-buttons-vertical': verticalButtons
    }
  )

  const footer = buttons.map(button => {
    return (
      <span
        class={cc('modal-button', { 'modal-button-bold': button.bold })}
        onclick={button.onclick}
      >
        {button.text}
      </span>
    )
  })

  const modal = (
    <div
      class="modal"
      oncreate={(el) => {
        sizeEl(el, true)
        onOpen && onOpen(el)
      }}
      ondestroy={onClose}
    >
      <div class="modal-inner">
        <div class="modal-title">{title}</div>
        <div class="modal-text">{text}</div>
        {afterText}
      </div>
      <div
        class={buttonWraperCls}
        onclick={onButtonsClick}
      >
        {footer}
      </div>
    </div>
  )

  return (
    <div key={wraperKey} class={wraperClass}>
      {show && [
        <Overlay onOverlayClick={onOverlayClick} />,
        <Transition
          enter={enterClass}
          exit={exitClass}
        >
          {modal}
        </Transition>
      ]}
    </div>
  )
}

export default Dialog
