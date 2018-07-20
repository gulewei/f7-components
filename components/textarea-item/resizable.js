import { on, css } from '../_util'

/**
 *
 * @param {HTMLElement} textareaEl
 */
export function resizable (textareaEl) {
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

  const height = textareaEl[0].offsetHeight
  const diff = height - textareaEl[0].clientHeight
  const scrollHeight = textareaEl[0].scrollHeight

  if (scrollHeight + diff > height) {
    const newAreaHeight = scrollHeight + diff
    css({ height: newAreaHeight + 'px' })
  }
}
