import { Picker, ModalPicker, InlinePicker } from './Picker'
import Toolbar from './Toolbar'
import plugin from './plugin'
import { install, apiMixin } from '../_util'

Picker.Modal = ModalPicker
Picker.Inline = InlinePicker
Picker.Toolbar = Toolbar

const _Picker = apiMixin(Picker, install(plugin))
export default _Picker
