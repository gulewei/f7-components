// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

const Icon = ({ name, ...r }) => {
  return (
    <i {...r} class={cc('icon', 'icon-' + name, r.class)}></i>
  )
}

const IconBack = <Icon name='back' />

const IconForward = <Icon name='forward' />

export default Icon
export {
  IconBack,
  IconForward
}
