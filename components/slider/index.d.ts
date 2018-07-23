import { ElementProperties, Component } from '../_util/interfaces'

export interface RangeSliderProperties extends ElementProperties {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => any
  sliderProps?: Object
  wraperClass?: string
}

declare const RangeSlider: Component<RangeSliderProperties>

export default RangeSlider
