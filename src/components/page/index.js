// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

/**
 * @typedef {Object} PageProps
 * @prop {JSX.Element} [navbar]
 * @prop {JSX.Element} [toolbar]
 * @prop {JSX.Element} [outside]
 *
 * @param {PageProps} props
 * @param {JSX.Element[]} children
 */
const Page = (props, children) => {
  const {
    navbar,
    toolbar,
    outside,
    ...keyAndLifecycles
  } = props

  return (
    <div {...keyAndLifecycles} class={cc('page', {
      'navbar-fixed': !!navbar,
      'toolbar-fixed': !!toolbar
    })}>
      {navbar}
      <div key='content' class="page-content">{children}</div>
      {toolbar}
      {outside &&
        <div key='outside' class="page-outside">{outside}</div>
      }
    </div>
  )
}

export default Page
