// eslint-disable-next-line
import { h } from 'hyperapp'
import { isarray } from '../../utils'
import { on } from '../_utils'
import BaseScroller from '../_utils/scroller'
import cc from 'classnames'
import './picker-view.less'

/**
 * Picker must be controlled
 * @typedef {{value: string, label: string}} PickerDataItem
 * @typedef {Object} PickerItemsColsProps
 * @prop {PickerDataItem[]} data
 * @prop {string[]} value
 * @prop {(value: string) => void} [onChange]
 * @prop {'left' | 'center'} [align]
 * @param {PickerItemsColsProps} props
 */
export const PickerItemsCol = (props) => {
  const {
    data,
    value,
    onChange,
    align,
    key
  } = props

  return (
    <div class={cc('picker-items-col', { [`picker-items-col-${align}`]: align })}>
      <div class="picker-items-col-wrapper"
        key={key}
        onupdate={(el) => {
          const scroller = el._scroller
          if (scroller) {
            try {
              scroller.update(props)
            } catch (e) { }
          }
        }}
        oncreate={el => {
          el._scroller = new PickerScroller(el, { data, value, onChange: onChange })
          console.log(el._scroller)
        }}
        ondestroy={el => {
          el._scroller && (el._scroller = null)
        }}
      >
        {
          data.map(({ label }) => {
            return (
              <div class="picker-item">
                <span>{label}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

class PickerScroller extends BaseScroller {
  /**
   * @typedef {Object} PickerScrollerOptions
   * @prop {Function} callback
   * @prop {string} value
   * @prop {PickerDataItem[]} data
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

    // callback
    this.props.value = this.props.data[activeIndex].value
    if (this.props.onChange) {
      this.props.onChange(this.props.value)
    }
  }

  render (translate, animate) {
    this._setTranslate(this.wraper.style, translate, animate)
  }

  _setTranslate (nodestyle, translate, animate) {
    nodestyle.transform = `translate3d(0px, ${translate}px, 0px)`
    nodestyle.webkitTransform = `translate3d(0px, ${translate}px, 0px)`
    const duration = animate ? '' : '0ms'
    nodestyle.transitionDuration = duration
    nodestyle.webkitTransitionDuration = duration
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

/**
 * @typedef {Object} PickerViewProps
 * @prop {Object[]} data
 * @prop {string[]} value
 * @prop {() => void} [onChange]
 * @prop {boolean} [cascade=false]
 * @param {PickerViewProps} props
 */
const PickerView = props => {
  const {
    data,
    value,
    onChange,
    cascade = false
  } = props

  const cols = cascade ? getCascadeData(data, value) : compatData(data)

  return (
    <div class="picker-modal-inner picker-items">
      {
        cols.map((data, i) => {
          return (
            <PickerItemsCol
              data={data}
              value={value[i]}
              onChange={val => {
                const newValue = value.map((prev, j) => j === i ? val : prev)
                onChange(newValue)
              }}
            />
          )
        })
      }
      <div key="center-highlight" class="picker-center-highlight"></div>
    </div>
  )
}

/**
 * 转换级联数据
 * @typedef {Object} CascadeProps
 * @prop {string} label
 * @prop {string} value
 * @prop {CascadeProps[]} children
 * @param {CascadeProps[]} data
 * @param {string[]} value
 * @returns {PickerDataItem[][]}
 */
function getCascadeData (data, value) {
  const f = (data, [val, ...restVals], acc) => {
    const selected = data.filter(item => item.value === val).pop()

    return restVals.length > 0
      ? f(
        selected.children,
        restVals,
        acc.concat([
          data.map(({ label, value }) => ({ label, value }))
        ])
      )
      : acc.concat([data])
  }
  return f(data, value, [])
}

/**
 * 兼容多列与单列数据
 * @param {PickerDataItem[] | PickerDataItem[][]} data
 * @returns {PickerDataItem[][]}
 */
function compatData (data) {
  return isarray(data[0]) ? data : [data]
}

/**
 *
 * @param {PickerDataItem[]} prev
 * @param {PickerDataItem[]} data
 */
function isSameData (prev, data) {
  return (
    prev &&
    data &&
    data.length === prev.length &&
    data.every((item, i) => item.value === prev[i].value)
  )
}

export default PickerView
