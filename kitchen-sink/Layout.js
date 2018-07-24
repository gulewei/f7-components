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
                style={{ display: 'flex' }}
                onclick={() => {
                  pageAnim.changeDirection('backward')
                  window.history.back()
                }}
              >
                <ImgIcon name='back' />
                <span style={{ 'margin-left': '8px' }}>Back</span>
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
