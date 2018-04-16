import { h } from 'hyperapp'
import cc from 'classnames'

export const Navbar = ({ left, center, right, ...r }) => {
  return (
    <div class={cc('navbar', r.classs)} {...r}>
      <div class="navbar-inner">
        <div class="left">{left}</div>
        <div class="center">{center}</div>
        <div class="right">{right}</div>
      </div>
    </div>
  )
}