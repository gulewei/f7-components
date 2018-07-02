import _Dialog from './Dialog'
import plugin from './plugin'
import { install, apiMixin } from '../_utils'

const apis = install(plugin)
const Dialog = apiMixin(_Dialog, apis)

export default Dialog
