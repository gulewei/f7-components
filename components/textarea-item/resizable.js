import { on, css } from '../_util'

/**
 *
 * @param {HTMLElement} textareaEl
 */
export function resizableTextarea (textareaEl) {
  let textareaTimeout
  function handleTextarea () {
    clearTimeout(textareaTimeout)
    textareaTimeout = setTimeout(() => {
      resizeTextarea(textareaEl)
    }, 0)
  }
  return on(textareaEl, 'change keydown keypress keyup paste cut', handleTextarea)
}

/**
 *
 * @param {HTMLElement} textareaEl
 */
function resizeTextarea (textareaEl) {
  css(textareaEl, { 'height': '' })

  const height = textareaEl.offsetHeight
  const diff = height - textareaEl.clientHeight
  const scrollHeight = textareaEl.scrollHeight

  if (scrollHeight + diff > height) {
    const newAreaHeight = scrollHeight + diff
    css(textareaEl, { height: newAreaHeight + 'px' })
  }
}
