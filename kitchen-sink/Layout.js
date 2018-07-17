/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Page, Navbar, ImgIcon } from '../components'

export default ({ key, title, outside, noBackIcon }, children) => (_, { pageAnim }) => {
  return (
    <Page
      key={key}
      oncreate={pageAnim.pageCreate}
      onremove={(el, done) => { pageAnim.pageRemove({ el, done }) }}
      navbar={
        <Navbar
          left={
            !noBackIcon && (
              <a
                onclick={() => {
                  pageAnim.changeDirection('backward')
                  window.history.back()
                }}
              >
                <ImgIcon name='back' />
              </a>
            )
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
