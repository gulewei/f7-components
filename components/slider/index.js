// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @typedef {Object} RangeSliderProps
 * @prop {number} min
 * @prop {number} max
 * @prop {number} step
 * @prop {number} value
 * @prop {(value: string) => any} onChange
 * @prop {string} wraperClass
 *
 * @param {RangeSliderProps} props
 */
const RangeSlider = props => {
  const {
    wraperClass,
    value,
    min,
    max,
    step,
    onChange = () => { },
    sliderProps,
    ...rests
  } = props

  return (
    <div
      {...rests}
      class={cc('range-slider', wraperClass)}
    >
      <input
        {...{ ...sliderProps, value, min, max, step }}
        onchange={e => onChange(Number(e.target.value))}
        type="range"
      />
    </div>
  )
}

export default RangeSlider
