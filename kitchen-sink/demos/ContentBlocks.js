import { h } from 'hyperapp'
import { ContentBlock } from '../components'

export default {
  key: 'contentblocks',
  title: 'Content Block',
  state: {},
  actions: {},
  view: () => {
    return (
      <div>
        <p>This paragraph is outside of content block. Not cool, but useful for any custom elements with custom styling.</p>

        <ContentBlock>
          <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
        </ContentBlock>

        <ContentBlock inner>Here comes another text block additionaly wrapped with "content-block-inner". Praesent nec imperdiet diam. Maecenas vel lectus porttitor, consectetur magna nec, viverra sem. Aliquam sed risus dolor. Morbi tincidunt ut libero id sodales. Integer blandit varius nisi quis consectetur.</ContentBlock>

        <ContentBlock title="Content block title">
          <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
        </ContentBlock>

        <ContentBlock title="Another ultra long content block title" inner>
          <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
        </ContentBlock>

        <ContentBlock title="Inset" inner inset>
          <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
        </ContentBlock>
      </div>
    )
  }
}
