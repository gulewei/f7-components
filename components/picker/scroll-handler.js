import BaseScroller from '../_util/scroller'
import { runAndCleanUp } from '../_util/run-and-clean'
import { on } from '../_util'

class ScrollerHandler extends BaseScroller {
  /**
   * @typedef {Object} PickerScrollerOptions
   * @prop {(val: string) => void} onChange
   * @prop {string} value
   * @prop {PickerColumnItemProps[]} items
   *
   * @param {HTMLElement} wraper
   * @param {PickerScrollerOptions} props
   */
  constructor (wraper, props) { // eslint-disable-line
    super()

    this.wraper = wraper
    /**
     * @type {PickerScrollerOptions}
     */
    this.props = {}

    const container = wraper.parentNode.offsetHeight
    const item = wraper.offsetHeight / wraper.children.length
    const currentTranslate = 0

    this.heights = { container, item }
    this.initializeState(currentTranslate)
    this.update(props)
    this.bindEvents()
  }

  // #region update

  update (newProps) {
    this.props.onChange = newProps.onChange

    if (!isSameItems(this.props.items, newProps.items)) {
      return this._updateItems(newProps.value, newProps.items)
    }

    if (newProps.value !== this.props.value) {
      this._updateValue(newProps.value, newProps.items)
    }
  }

  _updateItems (value, data) {
    // data
    this.props.items = data

    // resize size
    const itemLength = data.length
    const { container, item } = this.heights
    const maxTranslate = (container - item) / 2
    const minTranslate = (container - item * (itemLength * 2 - 1)) / 2
    this.setSize(maxTranslate, minTranslate)

    // update value
    this._updateValue(value, data)
  }

  _updateValue (value, data) {
    const foundIndex = data.map(item => item.value).indexOf(value)
    const foundInData = foundIndex > -1
    const activeIndex = foundInData ? foundIndex : 0

    // translate
    this._scrollToItem(activeIndex, false, !foundInData)
  }

  // #endregion

  _scrollToItem (activeIndex, animate, emitValue) {
    // translate
    const { maxTranslate: max } = this.size
    const finalTranslate = max - activeIndex * this.heights.item
    this.updateTranslate(finalTranslate)
    this._render(finalTranslate, animate)

    // value
    this.props.value = this.props.items[activeIndex].value

    // emit value
    if (emitValue) {
      animate
        ? runAndCleanUp(this.wraper, () => { }, () => this._emitValue())
        : this._emitValue()
    }
  }

  _render (translate, animate) {
    setTranslate(this.wraper.style, translate, animate)
  }

  _emitValue () {
    // console.log('emit value', { ...this.props })
    this.props.onChange && this.props.onChange(this.props.value)
  }

  // #region event entry

  bindEvents () {
    this.setCallback(this._onTouchScroll.bind(this))

    const events = {
      touchstart: (e) => {
        this.onTouchStart(e.targetTouches, Date.now())
      },
      touchmove: (e) => {
        this.onTouchMove(e.targetTouches, Date.now())
      },
      touchend: (e) => {
        this.onTouchEnd(e.targetTouches, Date.now())
      },
      // click to select
      click: (e) => {
        if (this.state.isMoved) {
          return
        }
        this._onItemClick(e)
      }
    }

    for (let eventName in events) {
      on(this.wraper, eventName, events[eventName])
    }
  }

  _onTouchScroll (translate, isMoved) {
    const animate = !isMoved

    if (isMoved) {
      this._render(translate, animate)
    } else {
      this._scrollToItem(this._getActiveIndex(translate), animate, true)
    }
  }

  _getActiveIndex (translate) {
    const { minTranslate: min, maxTranslate: max } = this.size
    const newTranslate = Math.max(Math.min(translate, max), min)
    const activeIndex = Math.round((max - newTranslate) / this.heights.item)
    return activeIndex
  }

  _onItemClick (e) {
    const itemCls = 'picker-item'
    const isItem = (el) => {
      return el.className.indexOf(itemCls) > -1 ? el : false
    }
    const target = isItem(e.target) || isItem(e.target.parentNode)

    if (target) {
      let activeIndex
      for (let i = 0, len = this.wraper.children.length; i < len; i++) {
        if (this.wraper.children[i] === target) {
          activeIndex = i
          break
        }
      }
      this._scrollToItem(activeIndex, true, true)
    }
  }

  // #endregion
}

export default ScrollerHandler

/**
 *
 * @param {PickerColumnItemProps[]} prev
 * @param {PickerColumnItemProps[]} data
 */
function isSameItems (prev, data) {
  return (
    prev &&
    data &&
    data.length === prev.length &&
    data.every((item, i) => item.value === prev[i].value)
  )
}

function setTranslate (nodestyle, translate, animate) {
  nodestyle.transform = `translate3d(0px, ${translate}px, 0px)`
  nodestyle.webkitTransform = `translate3d(0px, ${translate}px, 0px)`
  const duration = animate ? '' : '0ms'
  nodestyle.transitionDuration = duration
  nodestyle.webkitTransitionDuration = duration
}
