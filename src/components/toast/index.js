import _Toast from './Toast'
import plugin from './plugin'
import { install, apiMixin } from '../_utils'

const apis = install(plugin)
const Toast = apiMixin(_Toast, apis)

export default Toast
