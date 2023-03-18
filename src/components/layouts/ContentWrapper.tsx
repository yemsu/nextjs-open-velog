import { ReactNode } from "react"
import styled, { css } from "styled-components"

interface ContentWrapperProps {
  children: ReactNode,
  layoutType?: 'basic' | 'flex-row',
  size?: 'narrow' | 'normal' | 'wide' | 'full',
  contentType?: 'normal' | 'main'
  title?: string
}

function ContentWrapper(props: ContentWrapperProps) {
  const {
    children,
    size = 'normal',
    layoutType = 'basic',
    contentType = 'normal',
    title
  } = props
  return (
    <Wrapper 
      as={title ? 'section' : 'div'}
      className={[
        `layout-${layoutType}`,
        `size-${size}`,
        `type-${contentType}`
      ].join(' ')}
    >
      {title && <h2 className="ir-hidden">{title}</h2>}
      {children}
    </Wrapper>
  )
}

export default ContentWrapper

const Wrapper = styled.div`
  min-height: 100%;
  &.type {
    &-main {
      padding-top: 60px;
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
      width: 768px;
    }
    &-normal {
      width: 1000px;
    }
    &-wide {
      width: 1200px;
    }
    &-full {
      width: 100%;
      padding: 0 64px;
    }
  }
  &:not(.size-full) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
  }
`