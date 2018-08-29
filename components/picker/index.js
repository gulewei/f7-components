import { Picker, ModalPicker, InlinePicker } from './Picker'
import Toolbar from './Toolbar'
import methods from './method'
import { apiMixin } from '../_util'

Picker.Modal = ModalPicker
Picker.Inline = InlinePicker
Picker.Toolbar = Toolbar

const _Picker = apiMixin(Picker, methods)
export default _Picker
