import { Component } from 'hyperapp'
import { ElementProperties } from '../_utils/interfaces'

export interface ViewProperties extends ElementProperties {}

declare const View: Component<ViewProperties>

export default View
