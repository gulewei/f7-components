import Buttons from './Buttons'
import Inputs from './Inputs'
import Textareas from './Textareas'
import Checkboxes from './Checkboxes'
import Radios from './Radios'
import Sliders from './Sliders'
import Switches from './Switches'
import Pickers from './Pickers'

import ContentBlocks from './ContentBlocks'
import ListView from './Lists'

import Dialogs from './Dialogs'
import Toasts from './Toasts'
import Loadings from './Loadings'
import Preloaders from './Preloaders'
import Overlay from './Overlay'

import PullToRefresh from './PullToRefresh'
import Transition from './Transition'

/**
 * transform key to path
 * @param {PageModel[]} models
 */
function transformModels (models) {
  return models.map(({ key, path = `/${key}`, ...r }) => {
    return { key, path, ...r }
  })
}

export const demos = transformModels([
  Buttons,
  Inputs,
  Textareas,
  Checkboxes,
  Radios,
  Sliders,
  Switches,
  Pickers,
  // Forms,
  ContentBlocks,
  ListView,
  // Modals,
  Dialogs,
  Toasts,
  Loadings,
  Preloaders,
  Overlay,

  PullToRefresh,
  Transition
])

export const categories = [
  {
    category: 'Layout',
    components: transformModels([
      { title: 'View', key: 'view' },
      { title: 'Page', key: 'page' },
      { title: 'Toolbars', key: 'toolbars' }
    ])
  },
  {
    category: 'Data Display',
    components: transformModels([
      ContentBlocks,
      ListView,
      { title: 'Img Icon', key: 'imgicon' }
    ])
  },
  {
    category: 'Data Entry',
    components: transformModels([
      Buttons,
      Inputs,
      Textareas,
      Checkboxes,
      Radios,
      Sliders,
      Switches,
      Pickers
    ])
  },
  {
    category: 'Feedback',
    components: transformModels([
      Dialogs,
      Toasts,
      Loadings,
      Overlay,
      Preloaders
    ])
  },
  {
    category: 'Gesture',
    components: transformModels([
      PullToRefresh
    ])
  },
  {
    category: 'Transition',
    components: transformModels([
      Transition
    ])
  }
]

export default demos
