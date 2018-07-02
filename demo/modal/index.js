/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import ContentBlock from '../../src/components/content-block'
import Preloader from '../../src/components/preloader'
import Overlay from '../../src/components/overlay'
import Toast from '../../src/components/toast'
import Loading from '../../src/components/loading'
import Dialog from '../../src/components/dialog'

// import install, { loadingPlugin, dialogPlugin } from '../../src/plugins'

// const modals = install(loadingPlugin, dialogPlugin)

// window.$modals = modals

app(
  {
    overlay: {
      show: false
    },
    toast: {
      show: false,
      msg: '',
      duration: 1500
    },
    loading: {
      show: false
    },
    alert: {
      show: false,
      title: '',
      text: '',
      buttonText: 'Ok'
    },
    confirm: {
      show: false,
      title: '',
      text: '',
      okText: 'Ok',
      cancelText: 'Cancel',
      okCallback: () => { },
      cancelCallback: () => { }
    }
  },
  {
    overlay: {
      show: show => ({ show })
    },
    toast: {
      show: ({ msg, duration = 1500 }) => (state, actions) => {
        actions.set({ msg, duration, show: true })
        actions.schedule()
      },
      schedule: () => (state, actions) => {
        setTimeout(() => {
          actions.set({ show: false, msg: '', duration: 1500 })
        }, state.duration)
      },
      set: (props) => props
    },
    loading: {
      show: (show) => {
        return { show }
      }
    },
    alert: {
      show: ({ title = 'Framework7', text }) => {
        return { title, text, show: true }
      },
      hide: () => {
        return {
          show: false,
          title: '',
          text: ''
        }
      }
    },
    confirm: {
      show: ({ title = 'Framework7', ...r }) => {
        return { ...r, title, show: true }
      },
      hide: () => {
        return {
          show: false,
          title: '',
          text: '',
          okText: 'Ok',
          cancelText: 'Cancel',
          okCallback: () => { },
          cancelCallback: () => { }
        }
      }
    }
  },
  (state, actions) => {
    window.$_modal = { state, actions }

    return (
      <Page
        outside={[
          <Dialog
            key='confirm'
            show={state.confirm.show}
            title={state.confirm.title}
            text={state.confirm.text}
            onButtonsClick={actions.confirm.hide}
            buttons={[
              { text: state.confirm.cancelText, onclick: state.confirm.cancelCallback },
              { text: state.confirm.okText, onclick: state.confirm.okCallback }
            ]}
          />,
          <Dialog
            key='alert'
            show={state.alert.show}
            title={state.alert.title}
            text={state.alert.text}
            onButtonsClick={actions.alert.hide}
            buttons={[
              { text: state.alert.buttonText }
            ]}
          />,
          <Loading key='loading' show={state.loading.show} />,
          <Toast key='toast' show={state.toast.show} msg={state.toast.msg} />,
          state.overlay.show && <Overlay key="overlay" onOverlayClick={() => actions.overlay.show(false)} />
        ]}
      >
        <ContentBlock
          title="Predefined Modals"
        >
          <p onclick={e => {
            // actions.alert.show({ text: 'Here goes alert text' })
            Dialog.alert('Here goes alert text')
          }}>
            <a>Alert With Text</a>
          </p>

          <p onclick={e => {
            //  modals.alert('Here goes alert text', 'Custom Title!')
            actions.alert.show({ text: 'Here goes alert text', title: 'Custom Title!' })
          }}>
            <a>Alert With Text and Title</a>
          </p>

          <p onclick={e => {
            // modals.confirm('Are you sure?', () => {
            //   console.log('You clicked Ok button')
            // })
            actions.confirm.show({
              text: 'Are you sure?',
              okCallback: () => {
                actions.alert.show({ text: 'You clicked Ok button' })
              }
            })
          }}>
            <a>Confirm with text and Ok callback</a>
          </p>

          <p onclick={e => {
            // modals.confirm('Are you sure?',
            //   () => console.log('You clicked Ok button'),
            //   () => console.log('You clicked Cancel button')
            // )
            actions.confirm.show({
              text: 'Are you sure?',
              okCallback: () => {
                actions.alert.show({ text: 'You clicked Ok button' })
              },
              cancelCallback: () => {
                actions.alert.show({ text: 'You clicked Cancel button' })
              }
            })
          }}>
            <a>Confirm with text, Ok and Cancel callbacks</a>
          </p>

          <p onclick={e => {
            // modals.dialog(
            //   'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
            //   'Modal with 3 buttons',
            //   [
            //     { text: 'B1', onclick: () => console.log('You clicked first button!') },
            //     { text: 'B2', onclick: () => console.log('You clicked second button!') },
            //     { text: 'B3', onclick: () => console.log('You clicked third button!') }
            //   ]
            // )
          }}>
            <a>Modal With 3 Buttons</a>
          </p>

          <p onclick={e => {
            // modals.customDialog({
            //   text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
            //   title: 'Vertical Buttons Layout',
            //   verticalButtons: true,
            //   buttons: [
            //     { text: 'B1', onclick: () => console.log('You clicked first button!') },
            //     { text: 'B2', onclick: () => console.log('You clicked second button!') },
            //     { text: 'B3', onclick: () => console.log('You clicked third button!') }
            //   ]
            // })
          }}>
            <a>Modal With Vertical Buttons</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Toast">
          <p onclick={e => {
            actions.toast.show({ msg: `It's a toast` })
          }}>
            <a>Toast</a>
          </p>

          <p onclick={e => {
            actions.toast.show({ msg: `It's a 2s toast`, duration: 2000 })
          }}>
            <a>Toast with 2s duration</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Overlay">
          <p onclick={e => actions.overlay.show(true)}>
            <a>Overlay</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Preloader">
          <Preloader />
        </ContentBlock>

        <ContentBlock title="Loading">
          <p onclick={e => {
            // modals.showLoading()
            // setTimeout(modals.hideLoading, 2000)
            actions.loading.show(true)
            setTimeout(() => {
              actions.loading.show(false)
            }, 2000)
          }}
          ><a>loading</a></p>
        </ContentBlock>
      </Page >
    )
  },
  document.body
)
