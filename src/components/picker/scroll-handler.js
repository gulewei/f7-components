import { on, transitionEnd } from '../_utils'
import BaseScroller from '../_utils/scroller'

class ScrollerHandler extends BaseScroller {
  /**
   * @typedef {Object} PickerScrollerOptions
   * @prop {Function} callback
   * @prop {string} value
   * @prop {PickerColumnItemProps[]} data
   * @param {HTMLElement} wraper
   * @param {PickerScrollerOptions} props
   */
  constructor(wraper, props) { // eslint-disable-line
    super()
    this._mustControll(props)
    this.wraper = wraper
    this.props = {}
    this.heights = this._getHeights(wraper)
    this.initializeState(0)
    this.update(props)
    this.bindEvents()
  }

  _mustControll (props) {
    if (!props.data) {
      throw new Error('picker must have data !')
    }

    if (typeof props.onChange !== 'function') {
      throw new Error('Picker must be controlled')
    }
  }

  _getHeights (wraper) {
    const container = wraper.parentNode.offsetHeight
    const item = wraper.offsetHeight / wraper.children.length

    return { container, item }
  }

  update (newProps) {
    this.props.onChange = newProps.onChange

    if (!isSameData(this.props.data, newProps.data)) {
      console.log('update data')
      return this._updateData(newProps.value, newProps.data)
    }

    if (newProps.value !== this.props.value) {
      this._updateValue(newProps.value, newProps.data)
    }
  }

  _updateData (value, data) {
    // data
    this.props.data = data

    // size
    const itemLength = data.length
    const { container, item } = this.heights
    const maxTranslate = (container - item) / 2
    const minTranslate = (container - item * (itemLength * 2 - 1)) / 2
    this.initializeSize(maxTranslate, minTranslate)

    // value
    this._updateValue(value, data)
  }

  _updateValue (value, data) {
    // value
    this.props.value = value

    // translate
    const activeIndex = data.reduce((active, item, i) => {
      return item.value === value ? i : active
    }, 0)
    this.scrollToItem(activeIndex, false)
  }

  scrollToItem (activeIndex, animate) {
    // translate
    const { maxTranslate: max } = this.size
    const finalTranslate = max - activeIndex * this.heights.item
    this.updateTranslate(finalTranslate)
    this.render(finalTranslate, animate)

    // value
    this.props.value = this.props.data[activeIndex].value
    transitionEnd(this.wraper, () => {
      this.props.onChange(this.props.value)
    })
  }

  render (translate, animate) {
    setTranslate(this.wraper.style, translate, animate)
  }

  bindEvents () {
    on(this.wraper, 'touchstart', (e) => {
      this.onTouchStart(e.targetTouches, Date.now())
    })

    on(this.wraper, 'touchmove', (e) => {
      this.onTouchMove(e.targetTouches, Date.now())
      this.render(this.getTranslate(), false)
    })

    on(this.wraper, 'touchend', (e) => {
      this.onTouchEnd(e.targetTouches, Date.now())
      this.scrollToItem(this.getActiveIndex(this.getTranslate()), true)
    })

    // click to select
    on(this.wraper, 'click', this.onItemClick.bind(this))
  }

  getActiveIndex (translate) {
    const { minTranslate: min, maxTranslate: max } = this.size
    const newTranslate = Math.max(Math.min(translate, max), min)
    const activeIndex = Math.round((max - newTranslate) / this.heights.item)
    return activeIndex
  }

  onItemClick (e) {
    if (this.state.isTouched) {
      return
    }

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
      this.scrollToItem(activeIndex, true)
    }
  }
}

export default ScrollerHandler

/**
 *
 * @param {PickerColumnItemProps[]} prev
 * @param {PickerColumnItemProps[]} data
 */
function isSameData (prev, data) {
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
