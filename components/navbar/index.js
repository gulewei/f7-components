// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

export default ({ left, right, center, noBorder, ...r }, children) => {
  return (
    <div {...r} class={cc('navbar', { 'no-border': noBorder }, r.class)}>
      <div class="navbar-inner">
        <div class="left">{left}</div>
        <div class="center">{center || children}</div>
        <div class="right">{right}</div>
      </div>
    </div>
  )
}
