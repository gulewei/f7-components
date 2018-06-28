// eslint-disable-next-line
import { h } from 'hyperapp'

/**
 * @typedef {Object} RangeSliderProps
 * @prop {number} min
 * @prop {number} max
 * @prop {number} step
 * @prop {number} value
 *
 * @param {RangeSliderProps} props
 */
const RangeSlider = props => {
  return (
    <div class="range-slider">
      <input {...props} type="range" />
    </div>
  )
}

export default RangeSlider
