export default {
  /**
   * @param {JSX.Element[]} children
   */
  childOnly (children) {
    return children[0]
  },

  cloneNode (node, attrs, children) {
    return {
      nodeName: node.nodeName,
      key: node.key,
      attributes: {
        ...node.attributes,
        ...attrs
      },
      children: children || node.children
    }
  }
}
