import ContentWrapper from "@/components/layouts/ContentWrapper"
import Input from "@/components/elements/Input"
import Button from "@/components/elements/Button"
import useInputs from "@/hooks/useInputs"
import styled from "styled-components"

interface writeProps {

}

function write(props: writeProps) {
  const [forms, onChange, reset] = useInputs({
    boardTitle: '',
    boardContent: '',
  })

  return (
    <ContentWrapper size="narrow" contentType="main">
      <Input
        type="text"
        name="boardTitle"
        value={forms.boardTitle}
        placeholder="입력 하세요. 제목."
        size="big"
        onChange={onChange}
      />
      <TextareaWrapper>
        <Input
          type="textarea"
          name="boardContent"
          value={forms.boardContent}
          placeholder="입력 하세요. 내용."
          size="big"
          onChange={onChange}
        />
      </TextareaWrapper>
      <BottomFixBar>
        <Button
          styleType="square-round"
          buttonText="다썼다. 📝"
          bgColor="primary"
          size="large"
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

export default write