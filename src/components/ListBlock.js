// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

export const ListBlock = ({ whiteBg, margins, ...r }, children) => {
  return (
    <div
      class={cc('list-block', margins, { 'white-bg': whiteBg }, ...r)}
    >
      {children.map(child => <li>{child}</li>)}
    </div>
  )
}
