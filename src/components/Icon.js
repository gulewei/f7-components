// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

export const Icon = ({ name, ...r }) => {
  return (
    <i {...r} class={cc('icon f7c-icon', 'icon-' + name, r.class)}></i>
  )
}
