import { h } from 'hyperapp'
import { ContentBlock, List, ListItem, Slider, ImgIcon } from '../components'

const F7Icon = <ImgIcon name='f7' />

const FullLayout = ({ data, action, title, noIcon, noLabel, inset }) => {
  return [
    <ContentBlock title={title} />,
    <List inset={inset}>
      <ListItem
        media={!noIcon && F7Icon}
        input={
          <Slider
            min={0}
            max={100}
            value={data.value}
            onChange={action}
          />
        }
      >
        {!noLabel && 'Slider'}
      </ListItem>
    </List>
  ]
}

const slideAction = (value) => {
  return { value }
}

export default {
  key: 'slider',
  title: 'Slider',
  state: {
    full: {
      value: 50
    },
    icon: {
      value: 50
    },
    label: {
      value: 50
    },
    just: {
      value: 50
    },
    inset: {
      value: 50
    }
  },
  actions: {
    full: {
      slide: slideAction
    },
    icon: {
      slide: slideAction
    },
    label: {
      slide: slideAction
    },
    just: {
      slide: slideAction
    },
    inset: {
      slide: slideAction
    }
  },
  view: (state, actions) => {
    return (
      <div>
        <FullLayout
          title="Full layout"
          data={state.full}
          action={actions.full.slide}
        />
        <FullLayout
          title="Icon and input"
          data={state.icon}
          action={actions.icon.slide}
          noLabel
        />
        <FullLayout
          title="Label and input"
          data={state.label}
          action={actions.label.slide}
          noIcon
        />
        <FullLayout
          title="Just input"
          data={state.just}
          action={actions.just.slide}
          noIcon
          noLabel
        />
        <FullLayout
          title="Inset list"
          data={state.inset}
          action={actions.inset.slide}
          inset
          noIcon
          noLabel
        />
      </div>
    )
  }
}
