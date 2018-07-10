import _Picker from './Picker'
import plugin from './plugin'
import { install, apiMixin } from '../_util'

const apis = install(plugin)
const Picker = apiMixin(_Picker, apis)

export default Picker
export { ContentPicker, InlinePicker } from './Picker'
export { default as PickerToolbar } from './Toolbar'
