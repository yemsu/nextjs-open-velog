import styled from "styled-components"
import Button from "./Button"

interface tabMenu {
  text: string
  isActive: boolean
  href?: string
  onClick?: () => void
}

interface TabsProps {
  tabs: tabMenu[],
  align?: 'left' | 'center' | 'right'
  size: 'x-small' | 'small' | 'medium'
}

function Tabs(props: TabsProps) {
  const {
    tabs,    
    align = 'left',
    size
  } = props

  return (
    <TabList className={`align-${align}`}>
      {
        tabs.map(({
          text,
          isActive,
          href,
          onClick = undefined,
        }) => (
          <li>
            <Button
              styleType="round"
              buttonText={text}
              href={href}
              onClick={onClick}
              bgColor={isActive ? 'black' : 'border-gray'}
              size={size}
            />
          </li>
        ))
      }
    </TabList>
  )
}

const TabList = styled.ul`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-light-gray);
  &.align {
    &-center {
      justify-content: center;
    }
    &-right {
      justify-content: flex-end;
    }
  }
`

export default Tabs