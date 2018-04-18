// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @param {*} props
 * @param {JSX.Element[]} children
 */
export const PageContent = (props, children) => {
  return (
    <div {...props} class={cc('page-content', props.class)}
    >{children}</div>
  )
}

/**
 * @typedef {Object} PageProps
 * @prop {boolean} [navbarFixed=false]
 * @prop {boolean} [toolbarFixed=false]
 * @param {PageProps} props
 * @param {JSX.Element[]} children
 */
export const Page = (props, children) => {
  const { navbarFixed, toolbarFixed } = props

  return (
    <div {...props} class={cc('page', {
      'navbar-fixed': navbarFixed,
      'toolbar-fixed': toolbarFixed
    })}>{children}</div>
  )
}
