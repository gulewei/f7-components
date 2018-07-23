import Button from './button'
import Checkbox from './checkbox-item'
import Input from './input-item'
import Forms from './form-inputs'
import ListView from './list'
import Modals from './Modals'
import Overlay from './Overlay'
import Picker from './Picker'
import PullToRefresh from './PullToRefresh'
import Transition from './Transition'
import Textarea from './Textarea'

/**
 * transform key to path
 * @param {PageModel[]} models
 */
function transformModels (models) {
  return models.map(({ key, path = `/${key}`, ...r }) => {
    return { key, path, ...r }
  })
}

export default transformModels([
  Button,
  // Checkbox,
  // Input,
  Forms,
  ListView,
  Modals,
  Overlay,
  Picker,
  PullToRefresh,
  Transition,
  Textarea
])
