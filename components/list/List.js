// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * List block
 * @typedef {Object} ListProps
 * @prop {boolean} [inset=false]
 * @prop {string} [label]
 * @prop {boolean} [useForm]
 * @prop {boolean} [noHairlines]
 * @prop {boolean} [noHairlinesBetween]
 *
 * @param {ListProps} props
 * @param {JSX.Element[]} children
 */
export const List = (props, children) => {
  const {
    inset,
    label,
    noHairlines,
    noHairlinesBetween,
    useForm,
    isGroup,
    ...rests
  } = props

  const wraperCls = cc(rests.class, 'list-block', {
    inset,
    'no-hairlines': noHairlines,
    'no-hairlines-between': noHairlinesBetween
  })
  const WraperEl = useForm ? 'form' : 'div' // eslint-disable-line
  return (
    <WraperEl {...rests} class={wraperCls}>
      {isGroup
        ? children
        : <ul>{renderListChildren(children)}</ul>
      }
      {label && <div class="list-block-label">{label}</div>}
    </WraperEl>
  )
}

export const Group = (props, children) => {
  const {
    title,
    ...rests
  } = props
  return (
    <div {...rests} class={cc('list-group', rests.class)}>
      <ul>
        {title && <li key="_group-title" class="list-group-title">{title}</li>}
        {renderListChildren(children)}
      </ul>
    </div>
  )
}

const renderListChildren = children => children.map(child => <li key={child.key}>{child}</li>)

export const Divider = (props, children) => {
  return (
    <div {...props} class={cc('item-divider', props.class)}>{children}</div>
  )
}
