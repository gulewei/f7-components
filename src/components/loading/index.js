import _Loading from './Loading'
import plugin from './plugin'
import { install, apiMixin } from '../_utils'

const apis = install(plugin)
const Loading = apiMixin(_Loading, apis)

export default Loading
