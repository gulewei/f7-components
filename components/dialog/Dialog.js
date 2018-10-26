import { h } from 'hyperapp'
import Overlay from '../overlay'
import Transition from '../transition'
import { sizeEl, ANIM_NAMES } from '../_util'
import cc from 'classnames'

/**
 * Button
 * @typedef {Object} DialogButtonProps
 * @prop {string} [key]
 * @prop {string} text
 * @prop {(e) => void} [onclick]
 * @prop {boolean} [bold=false]
 * Dialog
 * @typedef {Object} DialogProps
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {string} [afterText]
 * @prop {DialogButtonProps[]} [buttons]
 * @prop {boolean} [verticalButtons=false]
 * @prop {() => void} [onButtonsClick]
 * @prop {() => void} [onOverlayClick]
 * @prop {(el: HTMLElement) => void} [onOpen]
 * @prop {(el: HTMLElement) => void} [onClose]
 * @prop {boolean} show
 * @prop {string} [wraperClass]
 * @prop {string} [wraperKey]
 * @prop {string} [enterClass='anim-bouncein']
 * @prop {string} [exitClass='anim-bouncout]
 *
 * @param {DialogProps} props
 */
const Dialog = (props, children) => {
  const {
    title,
    text = children.length && children,
    afterText,
    buttons,
    verticalButtons,
    onButtonsClick,
    onOverlayClick,
    onOpen,
    onClose,
    show,
    wraperClass = 'dialog-wraper',
    wraperKey,
    enterClass = ANIM_NAMES.bounceIn,
    exitClass = ANIM_NAMES.bounceOut
  } = props

  const modal = (
    <div
      key="_dialog_modal"
      class={cc('modal', { 'modal-no-buttons': !buttons })}
      oncreate={(el) => {
        sizeEl(el, true)
        onOpen && onOpen(el)
      }}
      ondestroy={onClose}
    >
      <div class="modal-inner">
        {title && <div key="title" class="modal-title">{title}</div>}
        {text && <div key="text" class="modal-text">{text}</div>}
        {afterText}
      </div>
      {buttons &&
        <div
          class={cc('modal-buttons', { 'modal-buttons-vertical': verticalButtons })}
          onclick={onButtonsClick}
        >
          {
            buttons.map(button => {
              return (
                <span
                  key={button.key}
                  class={cc('modal-button', { 'modal-button-bold': button.bold })}
                  onclick={button.onclick}
                >
                  {button.text}
                </span>
              )
            })
          }
        </div>
      }
    </div>
  )

  return (
    <div key={wraperKey} class={wraperClass}>
      {show && [
        <Overlay onOverlayClick={onOverlayClick} key="_dialog_overlay" />,
        // eslint-disable-next-line react/jsx-key
        <Transition enter={enterClass} exit={exitClass}>
          {modal}
        </Transition>
      ]}
    </div>
  )
}

export default Dialog
