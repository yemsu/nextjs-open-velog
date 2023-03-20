import { useDispatch } from "react-redux";
import { fetchJoin, fetchLogin } from "@/store/auth"
import Modal from "@/components/elements/Modal"
import useInputs from "@/hooks/useInputs"
import Button from "@/components/elements/Button"
import JoinModalInputs from "./JoinModalInputs";
import styled from "styled-components"
import { APP_TITLE } from "@/constants/etc";

interface JoinModalProps {
  modalType: string,
  isOpen: boolean,
  toggle: () => void,
}


interface FormDataTypes {
  [key: string]: string
}

function JoinModal(props: JoinModalProps) {
  const { isOpen, toggle, modalType } = props
  const [forms, onChange, reset] = useInputs<FormDataTypes>({
    userId: 'test1test1',
    email: '',
    password1: 'a123123123!',
    password2: 'a123123123!',
    username: '',
    gender: '',
    birthday: '',
  })
  const dispatch = useDispatch()

  const onSubmitJoin = async() => {
    const { userId, username, password2, email, gender, birthday } = forms
    const birthdayResult = `${birthday.slice(0, 4)}-${birthday.slice(4, 6)}-${birthday.slice(4, 6)}`
    const result = {
      userId,
      username,
      password: password2,
      email,
      gender,
      birthday: birthdayResult
    }
    await dispatch(fetchJoin(result) as any)
    reset()
    toggle()
  }

  const onSubmitLogin = async() => {
    const { userId, password1 } = forms
    const result = {
      userId,
      password: password1,
    }
    await dispatch(fetchLogin(result) as any)
    reset()
    toggle()
  }

  const onClose = () => {
    reset()
    toggle()
  }
  
  const isLogin = modalType === 'login'
  const modalTitle = isLogin ? 'Welcome back ' : `Join ${APP_TITLE} 🐣` 
  const submitButtonText = isLogin ? '로그인' : '가입' 
  const onSubmitEvent = isLogin ? onSubmitLogin : onSubmitJoin 
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
        <JoinModalInputs
          isLogin={isLogin}
          forms={forms}
          onChange={onChange}
        />
      </WrapForm>
    </Modal>
  )
}

const WrapForm = styled.div`
  width: 250px;
`

export default JoinModal
