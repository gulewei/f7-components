// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import CSSTransition from '../animation'
import { sizeEl, ANIM_NAMES } from '../_util'
import cc from 'classnames'

/**
 *
 * @param {HTMLElement} el
 */
function sizeModal (el) {
  sizeEl(el, true)
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
 * @prop {string} [wraperClass]
 * @prop {string} title
 * @prop {string} text
 * @prop {string} [afterText]
 * @prop {DialogButtonProps[]} [buttons=[]]
 * @prop {() => void} [onButtonsClick]
 * @prop {() => void} [onMaskClick]
 * @prop {boolean} [verticalButtons=false]
 * @prop {string} [enterClass='anim-bouncein']
 * @prop {string} [exitClass='anim-bouncout]
 * @prop {string} [wraperKey]
 *
 * @param {DialogProps} props
 */
const Dialog = (props) => {
  const {
    title,
    text,
    afterText,
    buttons = [],
    onButtonsClick,
    onOverlayClick,
    verticalButtons,
    show,
    wraperClass = 'dialog-wraper',
    wraperKey,
    enterClass = ANIM_NAMES.bounceIn,
    exitClass = ANIM_NAMES.bounceOut
  } = props

  const buttonWraperCls = cc('modal-buttons', {
    'modal-buttons-vertical': verticalButtons
  })

  return (
    <div key={wraperKey} class={wraperClass}>
      {show && [
        <Overlay onOverlayClick={onOverlayClick} />,
        <CSSTransition
          enter={enterClass}
          exit={exitClass}
        >
          <div class="modal" oncreate={sizeModal}>
            <div class="modal-inner">
              <div class="modal-title">{title}</div>
              <div class="modal-text">{text}</div>
              {afterText}
            </div>
            <div class={buttonWraperCls} onclick={onButtonsClick} >
              {
                buttons.map(button => {
                  return (
                    <span
                      class={cc('modal-button', { 'modal-button-bold': button.bold })}
                      onclick={button.onclick}
                    >
                      {button.text}
                    </span>
                  )
                })
              }
            </div>
          </div>
        </CSSTransition>
      ]}
    </div>
  )
}

export default Dialog
