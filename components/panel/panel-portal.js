import { h, app } from 'hyperapp'
import Panel from './Panel'
import { runAndCleanUp } from '../transition/run-transition'

function runIf (fn) {
  if (fn) {
    fn()
  }
}

/**
 *
 * @param {HTMLElement} protalStart
 * @param {*} props
 * @param {*} children
 */
export function panelPortal (props, children) {
  let portalRoot
  let panelActions

  function openPanel () {
    portalRoot = document.createElement('div')
    portalRoot.className = 'panel-portal'
    panelActions = app(
      props,
      {
        update: (props) => props
      },
      (state, _) => {
        return (
          <Panel
            {...state}
            onOverlayClick={onOverlayClick}
            oncreate={onPanelCreate}
          >
            {children}
          </Panel>
        )
      },
      portalRoot
    )
    document.body.appendChild(portalRoot)
    runIf(props.onOpen)
    document.body.classList.add(`with-panel-${props.position}-${props.effect}`)
    if (!props.notAnimated) {
      runIf(props.onOpend)
    }
  }

  function closePanel () {
    runIf(props.onClose)
    if (!props.notAnimated) {
      document.body.classList.add('panel-closing')
      runIf(props.onClosed)
    }
    document.body.classList.remove(`with-panel-${props.position}-${props.effect}`)
  }

  function onOverlayClick () {
    runIf(props.onOverlayClick)
    closePanel()
  }

  function onPanelCreate (el) {
    runAndCleanUp(el, () => { }, () => {
      runIf(props.show ? props.onOpend : props.onClosed)
    })
  }

  function onUpdate (newProps) {
    if (newProps.show !== props.show ||
      newProps.effect !== props.effect ||
      newProps.position !== props.position ||
      newProps.panelActions !== props.panelActions ||
      newProps.notAnimated !== props.notAnimated
    ) {
      panelActions.update(newProps)
    }
    props = newProps
  }

  function forceUpdate (newProps, newchildren) {
    children = newchildren
    panelActions.update(newProps)
    props = newProps
  }

  function onRemove (_, done) {
    remove = done
    closePanel()
    document.body.removeChild(portalRoot)
  }

  openPanel()

  return {
    forceUpdate,
    onUpdate,
    onRemove
  }
}

export default class PanelPortal {
  onCreate (props, children) {
    this.children = children
    const div = document.createElement('div')
    div.className = 'panel-portal'
    const panelActions = app(
      props,
      {
        update: (props) => props
      },
      (state, _) => {
        return (
          <Panel
            {...state}
            onOverlayClick={this._onOvelayClick}
            oncreate={(el) => {
              runAndCleanUp(el, () => { }, () => {
                runIf(this.props.show ? this.this.props.onOpend : this.props.onClosed)
              })
            }}
          >
            {this.children}
          </Panel>
        )
      },
      div
    )
    document.body.appendChild(div)
    this.el = div
    this.actions = panelActions
    this.props = props
    this._openPanel()
  }
  _openPanel () {
    runIf(this.props.onOpen)
    document.body.classList.add(`with-panel-${this.props.position}-${this.props.effect}`)
    if (!this.props.notAnimated) {
      runIf(this.props.onOpend)
    }
  }
  _closePanel () {
    runIf(this.props.onClose)
    if (!this.props.notAnimated) {
      document.body.classList.add('panel-closing')
      runIf(this.props.onClosed)
    }
    document.body.classList.remove(`with-panel-${this.props.position}-${this.props.effect}`)
  }
  _onOvelayClick () {
    runIf(this.props.onOverlayClick)
    this._closePanel()
  }
  onUpdate (props) {
    if (props.show !== this.props.show ||
      props.effect !== this.props.effect ||
      props.position !== this.props.position ||
      props.panelActions !== this.props.panelActions ||
      props.notAnimated !== this.props.notAnimated
    ) {
      this.actions.update(props)
    }
    this.props = props
  }
  forceUpdate (props, children) {
    this.children = children
    this.actions.update(props)
    this.props = props
  }
  onRemove (_, done) {
    this._closePanel()
    document.body.removeChild(this.el)
    this.el = null
    this.actions = null
    this.children = null
  }
}
