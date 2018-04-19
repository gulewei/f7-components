// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Mask } from './Mask'
import { noop, addClass, css } from '../utils'
import cc from 'classnames'
import '../css/dialog.css'

// eslint-disable-next-line
const DialogButton = ({ text, click = noop, close }) => {
  return (
    <span class="modal-button" onclick={e => {
      click(e)
      close()
    }}>{text}</span>
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
 * @prop {(e) => void} click
 * 弹框
 * @typedef {Object} DialogProps
 * @prop {boolean} show
 * @prop {() => void} close
 * @prop {string} title
 * @prop {string} content
 * @prop {JSX.Element} [bottom]
 * @prop {DialogButtonProps[]} [buttons=[]]
 * @prop {() => void} [onMaskClick]
 * @prop {boolean} [reverse=false]
 * @param {DialogProps} props
 */
export const Dialog = (props) => {
  const {
    show = false,
    close,
    title,
    content,
    bottom,
    buttons = [],
    onMaskClick = noop,
    reverse = true,
    ...r
  } = props

  return (
    <div {...r}>
      {show && [
        <div class={cc('modal f7c-dialog', r.class)} oncreate={transitionEl}>
          <div class="modal-inner">
            <div class="modal-title">{title}</div>
            <div class="modal-text">{content}</div>
          </div>
          <div class={cc('modal-buttons', { 'modal-buttons-revers': reverse })}>
            {bottom || buttons.map(item => (
              <DialogButton {...item} close={close} />
            ))}
          </div>
        </div>,
        <Mask show click={onMaskClick} />
      ]}
    </div>
  )
}
