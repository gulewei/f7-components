// eslint-disable-next-line
import { h } from 'hyperapp'
import EasyScroller from '../scroller/easy-scroller'
// import cc from 'classnames'

export const Ptr = (props, children) => {
  const {
    startCallback,
    transform,
    render
  } = props
  return (
    <div className="ptr" style={{ height: '300px', overflow: 'auto', border: '1px solid #555' }}>
      <div className="ptr-inner"
        style={{ transform }}
        oncreate={el => attacthPullToRefresh(el, render, startCallback)}
      >
        <div className="ptr-layer" style={{ height: '50px', 'margin-top': '-50px', 'background-color': 'skyblue' }}></div>
        {children}
      </div>
    </div>
  )
}

function attacthPullToRefresh (el, render, startCallback) {
  el.__scroller = new EasyScroller(
    el,
    (x, y, z) => {
      console.log({x, y, z})
      if (y < 0) {
        render(y)
      }
    },
    { scrollingX: false }
  ).scroller

  const done = _ => el.__scroller.finishPullToRefresh()
  el.__scroller.activatePullToRefresh(50,
    _ => console.log('active ...'),
    _ => console.log('deactive ...'),
    _ => startCallback(done)
  )
}
