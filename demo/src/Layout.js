/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Link } from 'hyperapp-hoa-router'
import { Page, Navbar, ImgIcon } from '../../src'

export default ({ key, title, outside }, children) => {
  return (
    <Page
      key={key}
      navbar={
        <Navbar
          left={
            <Link to='/'><ImgIcon name='back' /></Link>
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
