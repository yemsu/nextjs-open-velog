import { ReactNode } from "react"
import styled from "styled-components"
import IrText from "../elements/IrText"

interface ContentWrapperProps {
  children: ReactNode
  size?: 'narrow' | 'normal' | 'wide' | 'full'
  contentType?: 'normal' | 'main' | 'last-content'
  title?: string
  bgColor?: 'primary-1' | 'primary-2'
  isFullHeight?: boolean
  isSection?: boolean
}

function ContentWrapper(props: ContentWrapperProps) {
  const {
    children,
    size = 'normal',
    contentType = 'normal',
    title,
    bgColor,
    isFullHeight,
    isSection = false
  } = props
  return (
    <Wrapper 
      as={title || isSection ? 'section' : 'div'}
      className={[
        `size-${size}`,
        `type-${contentType}`,
        bgColor ? `bg-${bgColor}` : '',
        isFullHeight ? 'full-height' : ''
      ].join(' ')}
    >
      {title && <IrText text={title} />}
      {children}
    </Wrapper>
  )
}

export default ContentWrapper

const Wrapper = styled.div`
  min-height: 100%;
  &.type {
    &-main {
      padding-top: calc(60px + 55px);
      padding-bottom: 60px;
    }
    &-last-content {
      padding-top: 20px;
      padding-bottom: 60px;
    }
  }
  &.layout {
    &-flex-row {
      display: flex;
      align-items: center;
    }
  }
  /* size */
  &.size {
    &-narrow {
      width: var(--content-wrap-narrow);
    }
    &-normal {
      width: var(--content-wrap-normal);
    }
    &-wide {
      width: var(--content-wrap-wide);
    }
    &-full {
      width: 100%;
      padding-left: 64px;
      padding-right: 64px;
    }
  }
  &.bg {
    &-primary-1 {
      background-color: hsla(var(--primary-hsl), .1);
    }
    &-primary-2 {
      background-color: hsla(var(--primary-hsl), .2);
    }
  }
  &:not(.size-full) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--content-wrap-hrz-padding);
    padding-right: var(--content-wrap-hrz-padding);
  }
  &.full-height {
    height: calc(100vh - (60px * 2) - 44px);
  }
`