import Panel from './Panel'
import methods from './method'
import { apiMixin } from '../_util'

const _Panel = apiMixin(Panel, methods)
export default _Panel
