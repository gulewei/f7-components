import { h } from 'hyperapp'
import { ContentBlock, List, Switch, ImgIcon } from '../components'

const F7Icon = <ImgIcon name='f7' />

const FullLayout = ({ data, action, title, noIcon, noLabel, inset }) => {
  return [
    <ContentBlock title={title} />,
    <List inset={inset}>
      <List.Item
        media={!noIcon && F7Icon}
        input={
          <Switch
            checked={data.value}
            onChange={action}
          />
        }
      >
        {!noLabel && 'Slider'}
      </List.Item>
    </List>
  ]
}

const switchAction = (value) => {
  return { value }
}

export default {
  key: 'switches',
  title: 'Switch',
  state: {
    full: {
      value: false
    },
    icon: {
      value: true
    },
    label: {
      value: false
    },
    just: {
      value: true
    },
    inset: {
      value: false
    }
  },
  actions: {
    full: {
      slide: switchAction
    },
    icon: {
      slide: switchAction
    },
    label: {
      slide: switchAction
    },
    just: {
      slide: switchAction
    },
    inset: {
      slide: switchAction
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
          action={actions.just.inset}
          inset
          noIcon
          noLabel
        />
      </div>
    )
  }
}
