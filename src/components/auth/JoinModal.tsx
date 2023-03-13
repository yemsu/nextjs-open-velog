import Modal from "@/components/elements/Modal"
import Input from "@/components/elements/Input";
import WrapInputs from "@/components/elements/WrapInputs";
import useInputs from "@/hooks/useInputs"
import Button from "@/components/elements/Button";
import styled from "styled-components"
import { useCallback, useEffect } from "react";

type JoinModalProps = {
  isOpen: boolean,
  toggle: () => void,
};

function JoinModal(props: JoinModalProps) {
  const [forms, onChange, reset] = useInputs({
    email: '',
    password1: '',
    password2: '',
    nick: '',
    gender: '',
    birth: '',
  })
  const { isOpen, toggle } = props
  
  useEffect(() => {
    console.log('forms', forms)
  }, [forms])

  const onSubmit = () => {
    reset()
    toggle()
  }

  const onClose = () => {
    reset()
    toggle()
  }

  const SubmitButton = <Button styleType="round" bgColor="primary" size="medium" buttonText="다 했어요" onClick={onSubmit} />
  return (
    <Modal
      isOpen={isOpen}
      title="Welcome! 🐣"
      toggle={onClose}
      size="large"
      submitButton={SubmitButton}
    >
      <WrapForm>
        <WrapInputs>
          <Input
            type="email"
            name="email"
            label="이메일"
            value={forms.email}
            placeholder="ex) abcde@gmail.com"
            onChange={onChange}
          />
        </WrapInputs>
        <WrapInputs>
          <Input
            type="password"
            name="password1"
            label="비밀번호"
            value={forms.password1}
            placeholder="영문, 숫자, 특수문자 포함(8자 이상)"
            onChange={onChange}
          />
        </WrapInputs>
        <WrapInputs>
          <Input
            type="password"
            name="password2"
            label="비밀번호 확인"
            value={forms.password2}
            placeholder="영문, 숫자, 특수문자 포함(8자 이상)"
            onChange={onChange}
          />
        </WrapInputs>
        <WrapInputs>
          <Input
            type="text"
            name="nick"
            label="닉네임"
            value={forms.nick}
            placeholder="특수문자 사용 불가(8~10자)"
            onChange={onChange}
          />
        </WrapInputs>
        <WrapInputs>
          <Input
            type="number"
            name="birth"
            label="생년월일"
            value={forms.birth}
            placeholder="생년월일 8자리 ex)19910610"
            onChange={onChange}
          />
        </WrapInputs>
        <WrapInputs label="성별" labelFor="female">
          <Input
            type="radio"
            id="female"
            name="gender"
            label="여"
            value="F"
            checked={true}
            onChange={onChange}
          />
          <Input
            type="radio"
            id="mail"
            name="gender"
            label="남"
            value="M"
            onChange={onChange}
          />
        </WrapInputs>
      </WrapForm>
    </Modal>
  )
}

const WrapForm = styled.div`
  width: 250px;
`

export default JoinModal
