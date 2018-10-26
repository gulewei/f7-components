import { h } from 'hyperapp'
import { Page, Navbar, ImgIcon } from './components'

export default ({ key, title, outside, noBackIcon }, children) => {
  return (
    <Page
      key={key}
      navbar={
        <Navbar
          left={
            !noBackIcon && (
              <a
                style={{ display: 'flex' }}
                onclick={() => {
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
