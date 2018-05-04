// eslint-disable-next-line
import { h } from 'hyperapp'
import EasyScroller from '../scroller/easy-scroller'
// import cc from 'classs'

export const Ptr = (props, children) => {
  const {
    startCallback
  } = props
  return (
    <div class="ptr" style={{ height: '300px', overflow: 'auto', border: '1px solid #555' }}>
      <div>
        <div class="ptr-container">
          <div class="ptr-content" oncreate={el => attacthPullToRefresh(el, startCallback)}>
            <div class="ptr-layer" style={{ height: '50px', 'margin-top': '-50px', 'background-color': 'skyblue' }}></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function attacthPullToRefresh (el, startCallback) {
  const es = new EasyScroller(
    el,
    (x, y, z, render) => {
      if (y <= 0) {
        render(x, y, z)
      }
    },
    {
      scrollingX: false,
      animating: true,
      penetrationAcceleration: 0.08
    }
  )

  const scroller = es.scroller
  const done = _ => scroller.finishPullToRefresh()

  scroller.activatePullToRefresh(80,
    _ => console.log('active ...'),
    _ => console.log('deactive ...'),
    _ => startCallback(done)
  )

  el.__scroller = scroller
}
