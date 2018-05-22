// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

const Navbar = ({ left, right, center, ...r }, children) => {
  return (
    <div {...r} class={cc('navbar', r.classs)}>
      <div class="navbar-inner">
        <div class="left">{left}</div>
        <div class="center">{center || children}</div>
        <div class="right">{right}</div>
      </div>
    </div>
  )
}

export default Navbar
