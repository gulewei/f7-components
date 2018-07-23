import { Component, ElementProperties } from '../_util/interfaces'

export interface SwitchProperties extends ElementProperties {
  checked?: boolean
  onChange?: (checked: boolean) => Object
  name?: string
  disabled?: boolean
  wraperClass?: string
}

declare const Switch : Component<SwitchProperties>

export default Switch
