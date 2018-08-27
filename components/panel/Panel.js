import { h } from 'hyperapp'
import cc from 'classnames'
import { runAndCleanUp } from '../transition/run-transition'

function runIf (fn) {
  if (fn) {
    fn()
  }
}

const body = document.body
const addBodyClass = cls => body.classList.add(cls)
const removeBodyClass = cls => body.classList.remove(cls)
const raf = window.requestAnimationFrame

/**
 * @typedef {Object} PanelProps
 * @prop {boolean} notAnimated
 * @prop {'left' | 'right'} position
 * @prop {'cover' | 'reveal'} effect
 * @prop {string} panelClass
 * @prop {() => void} onOverlayClick
 *
 * @param {PanelProps} props
 */
const Panel = (props, children) => {
  const {
    notAnimated,
    position = 'left',
    effect = 'cover',
    overlayClass,
    panelClass,
    onOverlayClick,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    ...rests
  } = props
  const animateClass = { 'not-animated': notAnimated }
  const bodyClass = `with-panel-${position}-${effect}`

  return [
    <div
      key="panel-overlay"
      class={cc('panel-overlay', overlayClass, animateClass)} onclick={onOverlayClick}
    >
    </div>,
    <div
      {...rests}
      key="panel"
      class={cc(`panel panel-${position} panel-${effect}`, panelClass, animateClass)}
      style={{ display: 'block', ...rests.style }}
      oncreate={(el) => {
        runAndCleanUp(
          el,
          () => {
            runIf(onOpen)
            raf(() => raf(
              () => addBodyClass(bodyClass)
            ))
            runIf(notAnimated && onOpened)
          },
          () => {
            runIf(onOpened)
          }
        )
      }}
      onremove={(el, done) => {
        runAndCleanUp(
          el,
          () => {
            runIf(onClose)
            runIf(notAnimated ? onClosed : () => addBodyClass('panel-closing'))
            removeBodyClass(bodyClass)
          },
          () => {
            runIf(onClosed)
            removeBodyClass('panel-closing')
            done()
          }
        )
      }}
      ondestroy={() => {
        removeBodyClass('panel-closing')
        removeBodyClass(bodyClass)
      }}
    >
      {children}
    </div>
  ]
}

export default Panel
