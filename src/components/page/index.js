// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

/**
 * @typedef {Object} PageProps
 * @prop {JSX.Element} [navbar]
 * @prop {JSX.Element} [toolbar]
 * @param {PageProps} props
 * @param {JSX.Element[]} children
 */
const Page = (props, children) => {
  const {
    navbar,
    toolbar
  } = props

  return (
    <div {...props} class={cc('page', {
      'navbar-fixed': !!navbar,
      'toolbar-fixed': !!toolbar
    })}>
      {navbar}
      <div class="page-content">{children}</div>
      {toolbar}
    </div>
  )
}

export default Page
