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
export default (props, children) => {
  const {
    inset,
    label,
    noHairlines,
    noHairlinesBetween,
    useForm,
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
      <ul>
        {children.map(child => (
          <li key={child.key}>{child}</li>
        ))}
      </ul>
      {label && <div class="list-block-label">{label}</div>}
    </WraperEl>
  )
}
