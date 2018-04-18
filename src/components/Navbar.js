// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import '../css/navbar.css'

export const Navbar = ({ left, right, title, ...r }, children) => {
  return (
    <div class={cc('navbar f7c-navbar', r.classs)} {...r}>
      <div class="navbar-inner">
        <div class="left">{left}</div>
        <div class="center">{title || children}</div>
        <div class="right">{right}</div>
      </div>
    </div>
  )
}
