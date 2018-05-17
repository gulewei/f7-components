// eslint-disable-next-line
import { h } from 'hyperapp'
import { isarray } from '../../utils'
import { noop, on, css } from '../_utils'
import cc from 'classnames'
import './picker-view.less'

/**
 * @typedef {Object} PickerItemsColsProps
 * @prop {{value: string, label: string}[]} data
 * @prop {Function} [onValueChange]
 * @prop {'left' | 'center'} [align]
 * @param {PickerItemsColsProps} props
 */
export const PickerItemsCol = (props) => {
  const {
    data,
    // onValueChange,
    align
  } = props

  return (
    <div class={cc('picker-items-col', { [`picker-items-col-${align}`]: align })}>
      <div class="picker-items-col-wrapper"
        oncreate={el => {
          el.__scroller = new Scrolling(el)
          console.log(el.__scroller)
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

function setTransform (nodestyle, translateY, duration = '') {
  nodestyle.transform = `translate3d(0px, ${translateY}px, 0px)`
  nodestyle.webkitTransform = `translate3d(0px, ${translateY}px, 0px)`
  nodestyle.transitionDuration = duration
  nodestyle.webkitTransitionDuration = duration
}

class Scrolling {
  // eslint-disable-next-line
  constructor(wraper, options) {
    // const {
    //   itemLength
    // } = options

    const container = wraper.parentNode
    const wraperHeight = wraper.offsetHeight
    const containerHeight = container.offsetHeight
    const itemLength = wraper.children.length

    this.options = options
    this.wraper = wraper
    this.calcSize(containerHeight, wraperHeight, itemLength)
    this.initializeState(this.size.maxTranslate)
    this.render(this.size.maxTranslate, '0ms')
    this.bindEvents()
  }

  calcSize (containerHeight, wraperHeight, itemLength) {
    const itemHeight = wraperHeight / itemLength
    const maxTranslate = (containerHeight - itemHeight) / 2
    const minTranslate = (containerHeight - itemHeight * (itemLength * 2 - 1)) / 2

    this.size = {
      itemHeight,
      maxTranslate,
      minTranslate
    }
  }

  initializeState (startTranslate) {
    this.state = {
      isTouched: false,
      startY: 0,
      startTime: '',
      startTranslate,
      currentY: 0,
      currentTime: '',
      currentTranslate: startTranslate,
      velocityTranslate: 0
    }
  }

  bindEvents () {
    on(this.wraper, 'touchstart', this._onTouchStart.bind(this))
    on(this.wraper, 'touchmove', this._onTouchMove.bind(this))
    on(this.wraper, 'touchend', this._onTouchEnd.bind(this))
  }

  render (translateY, duration = '') {
    setTransform(this.wraper.style, translateY, duration)
  }

  _setState (nextState) {
    const prevState = this.state
    this.state = {
      ...prevState,
      ...nextState
    }
  }

  _normalizeTranslate (translate) {
    const { minTranslate: min, maxTranslate: max } = this.size

    if (translate < min) {
      return min - Math.pow((min - translate), 0.8)
    } else if (translate > max) {
      return max + Math.pow((translate - max), 0.8)
    } else {
      return translate
    }
  }

  _velocityTranslate (endTime) {
    const {
      startTime,
      currentTranslate: curr,
      velocityTranslate: v
    } = this.state
    let newTranslate
    if (endTime - startTime > 300) {
      newTranslate = curr
    } else {
      newTranslate = curr + v * 7
    }

    return newTranslate
  }

  _getFinalActive (translate) {
    const { minTranslate: min, maxTranslate: max, itemHeight } = this.size
    const newTranslate = Math.max(Math.min(translate, max), min)
    const activeIndex = Math.round((max - newTranslate) / 36)
    const finalTranslate = max - activeIndex * itemHeight
    return { activeIndex, finalTranslate }
  }

  _onTouchStart (e) {
    this._setState({
      isTouched: true,
      startY: e.targetTouches[0].pageY,
      startTime: (new Date()).getTime()
    })

    this.render(this.state.startTranslate, '0ms')
  }

  _onTouchMove (e) {
    if (!this.state.isTouched) {
      return
    }

    const currentY = e.targetTouches[0].pageY
    const newTranslate = this.state.startTranslate + currentY - this.state.startY
    const currentTranslate = this._normalizeTranslate(newTranslate)

    this._setState({
      currentY,
      currentTime: (new Date()).getTime(),
      currentTranslate,
      velocityTranslate: currentTranslate - this.state.currentTranslate
    })

    this.render(currentTranslate, '0ms')
  }

  _onTouchEnd (e) {
    if (!this.state.isTouched) {
      this._setState({ isTouched: false })
      return
    }

    const endTime = (new Date()).getTime()

    const velocityTranslate = this._velocityTranslate(endTime)
    const { finalTranslate } = this._getFinalActive(velocityTranslate)

    this._setState({
      isTouched: false,
      startTranslate: finalTranslate
    })

    this.render(finalTranslate)
  }
}

/**
 * @typedef {Object} PickerViewProps
 * @prop {Object[]} data
 * @prop {string[]} value
 * @prop {() => void} [onColChange]
 * @prop {boolean} [cascade=false]
 * @param {PickerViewProps} props
 */
const PickerView = props => {
  const {
    data,
    value,
    onColChange = noop,
    cascade = false
  } = props

  const cols = compatData(cascade ? getCascadeData(data, value) : data)

  return (
    <div class="f7c-picker-view"
      cols={cols}
    ></div>
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
 * @param {*} data
 */
function compatData (data) {
  return isarray(data[0]) ? data : [data]
}

/**
 * 映射为f7cols数据结构
 * @param {*} cols
 */
function mapF7Cols (cols) {
  return cols.map(col => ({
    values: col.map(item => item.value),
    displayValues: col.map(item => item.label)
  }))
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

/**
 * 替换变更的列数据
 * @param {number[]} diff
 * @param {(values: string[], displayValues: string[]) => void} f7Cols
 */
function applyDiff (diff, f7Cols, cols) {
  diff.map(index => {
    f7Cols[index].replaceValues(
      cols[index].map(item => item.value),
      cols[index].map(item => item.label)
    )
  })
}

export default PickerView
