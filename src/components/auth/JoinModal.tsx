import { useDispatch } from "react-redux";
import { fetchJoin, fetchLogin } from "@/store/auth"
import Modal from "@/components/elements/Modal"
import Input from "@/components/elements/Input";
import WrapInputs from "@/components/elements/InputWrapper";
import useInputs from "@/hooks/useInputs"
import Button from "@/components/elements/Button"
import styled from "styled-components"
import { APP_TITLE } from "@/constants/etc";
import { InputCommon } from "@/types/form";

interface JoinModalProps {
  modalType: string,
  isOpen: boolean,
  toggle: () => void,
}

interface InputCategory extends InputCommon {
  isForLogin?: boolean,
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
  const isInputForLogin = (inputs: InputCategory[]) => (
    ['userId', 'password1'].includes(inputs[0].name)
  )
  const isVisibleCategory = (inputs: InputCategory[]) => (
    !isLogin || (isLogin && isInputForLogin(inputs))
    )
  const inputCategories = [
    [{
      type: 'text',
      name: 'userId',
      label: '아이디',
      placeholder: '영문, 숫자(6~16자)'
    }],
    [{
      type: 'password',
      name: 'password1',
      label: '비밀번호',
      placeholder: '영문, 숫자, 특수문자 포함(8~15자)'
    }],
    [{
      type: 'password',
      name: 'password2',
      label: '비밀번호 확인',
      placeholder: '영문, 숫자, 특수문자 포함(8자 이상)'
    }],
    [{
      type: 'email',
      name: 'email',
      label: '이메일',
      placeholder: 'ex) abcde@gmail.com'
    }],
    [{
      type: 'text',
      name: 'username',
      label: '닉네임',
      placeholder: '한글, 영문, 숫자(3~10자)'
    }],
    [{
      type: 'text',
      name: 'birthday',
      label: '생년월일',
      placeholder: '생년월일 8자리 ex)1991-06-10'
    }],
    [{
        type: 'radio',
        id: 'woman',
        name: 'gender',
        label: '여',
        value: 'woman',
        isForJoin: true
      },
      {
        type: 'radio',
        id: 'man',
        name: 'gender',
        label: '남',
        value: 'man',
        isForJoin: true
    }]
  ]
  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      toggle={onClose}
      size="large"
      submitButton={SubmitButton}
    >
      <WrapForm>
        {inputCategories.map((inputs, i) => {
          return (
            isVisibleCategory(inputs) &&
            <WrapInputs key={`category${i}`}>
              {inputs.map(({ type, id, name, label, value, placeholder }: InputCategory, i) => {
                const defaultFirstCheck = !forms[name] && type === 'radio' && i === 0
                const isChecked = (defaultFirstCheck || forms[name] === value)
                return (
                  <Input
                    type={type}
                    id={id}
                    name={name}
                    label={label}
                    value={value || forms[name]}
                    checked={isChecked}
                    placeholder={placeholder}
                    onChange={onChange}
                    key={name + id}
                  />
                )
              })}
            </WrapInputs>
          )
          })}
      </WrapForm>
    </Modal>
  )
}

const WrapForm = styled.div`
  width: 250px;
`

export default JoinModal
