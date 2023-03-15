import { useDispatch } from "react-redux";
import { fetchJoin, fetchLogin } from "@/store/auth"
import Modal from "@/components/elements/Modal"
import Input from "@/components/elements/Input";
import WrapInputs from "@/components/elements/WrapInputs";
import useInputs from "@/hooks/useInputs"
import Button from "@/components/elements/Button";
import styled from "styled-components"

interface JoinModalProps {
  modalType: string,
  isOpen: boolean,
  toggle: () => void,
};

function JoinModal(props: JoinModalProps) {
  const { isOpen, toggle, modalType } = props
  const [forms, onChange, reset] = useInputs({
    userId: '',
    email: '',
    password1: '',
    password2: '',
    username: '',
    gender: '',
    birthday: '',
  })
  const dispatch = useDispatch()

  const onSubmitJoin = async() => {
    const { userId, username, password2, email, gender, birthday } = forms
    const result = {
      userId,
      username,
      password: password2,
      email,
      gender,
      birthday
    }
    await dispatch(fetchJoin(result) as any)
    reset()
    toggle()
  }

  const onSubmitLogin = async() => {
    const { userId, password2 } = forms
    const result = {
      userId,
      password: password2,
    }
    await dispatch(fetchLogin(result) as any)
    reset()
    toggle()
  }

  const onClose = () => {
    reset()
    toggle()
  }
  
  const isJoin = modalType === 'join'
  const modalTitle = isJoin ? 'Welcome to Open Velog 🐣' : 'Nice to see you again 😁'
  const submitButtonText = isJoin ? '가입' : '로그인'
  const onSubmitEvent = isJoin ? onSubmitJoin : onSubmitLogin
  const SubmitButton = <Button styleType="round" bgColor="primary" size="medium" buttonText={submitButtonText} onClick={onSubmitEvent} />
  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      toggle={onClose}
      size="large"
      submitButton={SubmitButton}
    >
      <WrapForm>
        <WrapInputs>
          <Input
            type="text"
            name="userId"
            label="아이디"
            value={forms.userId}
            placeholder="영문, 숫자(6~16자)"
            onChange={onChange}
          />
        </WrapInputs>
        <WrapInputs>
          <Input
            type="password"
            name="password1"
            label="비밀번호"
            value={forms.password1}
            placeholder="영문, 숫자, 특수문자 포함(8~15자)"
            onChange={onChange}
          />
        </WrapInputs>
        {isJoin && 
          <>
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
                type="text"
                name="username"
                label="닉네임"
                value={forms.username}
                placeholder="한글, 영문, 숫자(3~10자)"
                onChange={onChange}
              />
            </WrapInputs>
            <WrapInputs>
              <Input
                type="text"
                name="birthday"
                label="생년월일"
                value={forms.birthday}
                placeholder="생년월일 8자리 ex)1991-06-10"
                onChange={onChange}
              />
            </WrapInputs>
            <WrapInputs label="성별" labelFor="female">
              <Input
                type="radio"
                id="woman"
                name="gender"
                label="여"
                value="woman"
                checked={true}
                onChange={onChange}
              />
              <Input
                type="radio"
                id="man"
                name="gender"
                label="남"
                value="man"
                onChange={onChange}
              />
            </WrapInputs>
          </>
        }
      </WrapForm>
    </Modal>
  )
}

const WrapForm = styled.div`
  width: 250px;
`

export default JoinModal
