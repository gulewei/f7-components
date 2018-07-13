/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Page, Navbar, ImgIcon, runEnter, runExit } from '../components'

export default ({ key, title, outside }, children) => {
  return (
    <Page
      key={key}
      // oncreate={(el) => {
      //   runEnter(el, 'page-from-right-to-center', 'page-on-right')
      // }}
      // onremove={(el, done) => {
      //   runExit(el, 'page-from-center-to-left', 'page-on-center', done)
      // }}
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
  )
}
