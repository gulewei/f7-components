// eslint-disable-next-line
import { h } from 'hyperapp'
import { isarray } from '../../utils'
import { noop, on } from '../_utils'
import BaseScroller from '../_utils/scroller'
import cc from 'classnames'
import './picker-view.less'

/**
 * @typedef {{value: string, label: string}} PickerDataItem
 * @typedef {Object} PickerItemsColsProps
 * @prop {PickerDataItem[]} data
 * @prop {string[]} value
 * @prop {Function} [onChange]
 * @prop {'left' | 'center'} [align]
 * @param {PickerItemsColsProps} props
 */
export const PickerItemsCol = (props) => {
  const {
    data,
    value,
    onChange,
    align
  } = props

  return (
    <div class={cc('picker-items-col', { [`picker-items-col-${align}`]: align })}>
      <div class="picker-items-col-wrapper"
        oncreate={el => {
          el._scroller = new PickerScroller(el, { data, value, callback: onChange })
          console.log(el._scroller)
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
   * @param {PickerScrollerOptions} options
   */
  constructor(wraper, options) { // eslint-disable-line
    if (!options.data) {
      throw new Error('picker must have data !')
    }

    super()
    this.wraper = wraper
    this.options = options

    const { itemHeight, maxTranslate, minTranslate } = this.calcSize(wraper)
    this.initializeSize(maxTranslate, minTranslate)
    this.itemHeight = itemHeight

    const translate = this.calcTranslate()
    this.initializeState(translate)

    this.render(translate)
    this.bindEvents()
  }

  calcSize (wraper) {
    const container = wraper.parentNode
    const containerHeight = container.offsetHeight
    const wraperHeight = wraper.offsetHeight
    const itemLength = wraper.children.length
    const itemHeight = wraperHeight / itemLength

    const maxTranslate = (containerHeight - itemHeight) / 2
    const minTranslate = (containerHeight - itemHeight * (itemLength * 2 - 1)) / 2

    return {
      maxTranslate, minTranslate, itemHeight
    }
  }

  calcTranslate () {
    const { value, data } = this.options

    const activeIndex = data.reduce((active, item, i) => {
      return item.value === value ? i : active
    }, 0)

    return this.getActiveTranslate(activeIndex)
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
      this.scrollToItem(this.getActiveIndex(this.getTranslate()))
    })

    on(this.wraper, 'click', this.onItemClick.bind(this))
  }

  render (translate, animate) {
    this.setTranslate(this.wraper.style, translate, animate)
  }

  scrollToItem (activeIndex) {
    const finalTranslate = this.getActiveTranslate(activeIndex)
    this.updateTranslate(finalTranslate)
    this.render(finalTranslate, true)
    if (this.options.callback) {
      this.options.callback(this.options.data[activeIndex])
    }
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
      this.scrollToItem(activeIndex)
    }
  }

  getActiveIndex (translate) {
    const { minTranslate: min, maxTranslate: max } = this.size
    const newTranslate = Math.max(Math.min(translate, max), min)
    const activeIndex = Math.round((max - newTranslate) / 36)
    return activeIndex
  }

  getActiveTranslate (activeIndex) {
    const { maxTranslate: max } = this.size
    const finalTranslate = max - activeIndex * this.itemHeight
    return finalTranslate
  }

  setTranslate (nodestyle, translate, animate) {
    nodestyle.transform = `translate3d(0px, ${translate}px, 0px)`
    nodestyle.webkitTransform = `translate3d(0px, ${translate}px, 0px)`
    const duration = animate ? '' : '0ms'
    nodestyle.transitionDuration = duration
    nodestyle.webkitTransitionDuration = duration
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
    // onChange = noop,
    cascade = false
  } = props

  const cols = cascade ? getCascadeData(data, value) : compatData(data)

  return (
    <div class="picker-modal-inner picker-items">
      {
        cols.map((data, i) => {
          return (
            <PickerItemsCol data={data} value={value[i]} />
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
 * @returns {PickerDataItem[]}
 */
function getCascadeData (data, value) {
  const f = (data, [val, ...vals], acc) => {
    return vals.length > 0
      ? f(
        data.filter(item => item.value === val).pop().children,
        vals,
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
 * 检查列数据是否发生变化
 * @param {*} prev
 * @param {*} data
 */
function diffCols (prev, data) {
  const compare = (a, b) => a.label === b.label && a.value === b.value
  const compareCol = (prev, col) => col.every((item, i) => compare(item, prev[i]))

  return data.reduce(
    (acc, col, i) => compareCol(col, prev[i]) ? acc : acc.concat(i),
    []
  )
}

export default PickerView
