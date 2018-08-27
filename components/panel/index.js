import Panel from './Panel'
import plugin from './plugin'
import { install, apiMixin } from '../_util'

const _Panel = apiMixin(Panel, install(plugin))
export default _Panel
