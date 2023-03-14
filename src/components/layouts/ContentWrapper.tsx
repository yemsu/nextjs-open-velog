import { ReactNode } from "react"
import styled, { css } from "styled-components"

type LayoutTypes = 'basic' | 'flex-row'
type Sizes = 'normal' | 'wide' | 'full'

interface ContentWrapperProps {
  children: ReactNode,
  layoutType?: LayoutTypes,
  size?: Sizes,
}

function ContentWrapper(props: ContentWrapperProps) {
  const { children, size = 'normal', layoutType = 'basic' } = props
  return (
    <Wrapper className={`layout-${layoutType} size-${size}`}>
      {children}
    </Wrapper>
  )
}

export default ContentWrapper

const Wrapper = styled.div`
  &.layout {
    &-flex-row {
      display: flex;
      align-items: center;
    }
  }
  /* size */
  &.size {
    &-normal,
    &-wide {
      max-width: 100%;
      min-height: 100%;
      margin-left: auto;
      margin-right: auto;
      padding: 0 20px;
    }
    &-normal {
      width: 1200px;
    }
    &-wide {
      width: 1200px;
    }
    &-full {
      width: 100%;
      padding: 0 64px;
    }
  }
`