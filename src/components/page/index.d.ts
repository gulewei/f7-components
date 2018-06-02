import { Component } from "hyperapp";

interface PageProperties {

  navbar?: JSX.Element

  toolbar?: JSX.Element

  outside?: JSX.Element

  key?: string

  oncreate?: (el: HTMLElement) => void

  onremove?: (el: HTMLElement, done: () => void) => void

  ondestroy?: (el: HTMLElement) => void

  onupdate?: (el: HTMLElement, oldAttributs: any) => void
}

const Page: Component<PageProperties>

export default Page
