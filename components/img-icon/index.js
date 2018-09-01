// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

const Icon = ({ name, ...r }) => {
  return (
    <i {...r} class={cc('icon', 'icon-' + name, r.class)}></i>
  )
}

Icon.Back = <Icon name='back' />
Icon.Forward = <Icon name='forward' />

export default Icon
