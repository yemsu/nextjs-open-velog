import { SyntheticEvent } from "react"
import styled from "styled-components"
import Button from "../elements/Button"
import Input from "../elements/Input"
import ContentWrapper from "../layouts/ContentWrapper"

interface WriteBoardProps {
  boardTitle: string
  boardContent: string
  isEdit: boolean
  onChange: (e: SyntheticEvent) => void
  onClickSave: () => void
}

function WriteBoard(props: WriteBoardProps) {
  const {
    boardTitle,
    boardContent,
    isEdit,
    onChange,
    onClickSave
  } = props
  return (
    <ContentWrapper
      size="narrow"
      contentType="main"
      isFullHeight={true}
    >
      <Input
        type="text"
        name="boardTitle"
        value={boardTitle}
        placeholder="제목을 입력하세요"
        size="big"
        onChange={onChange}
      />
      <TextareaWrapper>
        <Input
          type="textarea"
          name="boardContent"
          value={boardContent}
          placeholder="내용을 입력하세요"
          size="big"
          onChange={onChange}
        />
      </TextareaWrapper>
      <BottomFixBar>
        <Button
          styleType="square-round"
          buttonText={
            isEdit
              ? `수정 완료 📝`
              : `작성 완료 📝`
          }
          bgColor="primary"
          size="large"
          onClick={onClickSave}
        />
      </BottomFixBar>
    </ContentWrapper>
  )
}

const TextareaWrapper = styled.div`
  height: calc(100vh - (60px * 2) - 53px - 55px);
  padding: 30px 0;
  * {
    height: 100%;
  }
`

const BottomFixBar = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 0 15px;
  background: linear-gradient(to bottom, transparent, var(--bg-gray));
`

export default WriteBoard