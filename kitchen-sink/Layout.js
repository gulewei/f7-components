/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Page, Navbar, ImgIcon, CSSTransition } from '../components'

export default ({ key, title, outside }, children) => {
  return (
    <CSSTransition>
      <Page
        key={key}
        navbar={
          <Navbar
            left={
              <a onclick={() => window.history.back()}><ImgIcon name='back' /></a>
            }
            center={title}
          />
        }
        outside={outside}
      >
        {children}
      </Page>
    </CSSTransition>
  )
}
