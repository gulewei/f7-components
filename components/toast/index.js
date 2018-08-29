import _Toast from './Toast'
import methods from './method'
import { apiMixin } from '../_util'

const Toast = apiMixin(_Toast, methods)

export default Toast
