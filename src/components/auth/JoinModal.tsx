import { useDispatch } from "react-redux";
import { fetchJoin, fetchLogin } from "@/store/auth"
import Modal from "@/components/elements/Modal"
import useInputs from "@/hooks/useInputs"
import Button from "@/components/elements/Button"
import JoinModalInputs from "./JoinModalInputs";
import styled from "styled-components"
import { APP_TITLE } from "@/constants/etc";
import { SyntheticEvent, useCallback, useState } from "react";
import { ValidationsState } from "@/types/auth";
import checkValidations from "@/utils/validation";

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
    userId: '',
    email: '',
    password1: '',
    password2: '',
    username: '',
    gender: '',
    birthday: '',
  })
  const [validations, setValidations] = useState<ValidationsState>({
    userId: { text: '', isValid: false },
    email: { text: '', isValid: false },
    password1: { text: '', isValid: false },
    password2: { text: '', isValid: false },
    username: { text: '', isValid: false },
    birthday: { text: '', isValid: false },
  })

  const dispatch = useDispatch()

  const onSubmitJoin = async(e: SyntheticEvent) => {
    e.preventDefault()
    const { userId, username, password2, email, gender, birthday } = forms
    const birthdayResult = birthday && `${birthday.slice(0, 4)}-${birthday.slice(4, 6)}-${birthday.slice(4, 6)}`
    const result = {
      userId,
      username,
      password: password2,
      email,
      gender,
      birthday: birthdayResult
    }
    const validationResults = isValidList(Object.keys(validations))
    const hasInvalidData = checkValidations({
      ...validationResults,
      gender
    })
    if(hasInvalidData) return
    await dispatch(fetchJoin(result) as any)
    reset()
    toggle()
  }

  const isValidList = useCallback((names: string[]) => {
    return names.reduce((result: any, key: string) => {
      return Object.assign(
        result,
        {[key]: validations[key].isValid}
      )
    }, {})
  }, [validations])

  const onSubmitLogin = async(e: SyntheticEvent) => {
    e.preventDefault()
    const { userId, password1 } = forms
    const result = {
      userId,
      password: password1,
    }
    const hasInvalidData = checkValidations(result)
    if(hasInvalidData) return
    await dispatch(fetchLogin(result) as any)
    onClose()
  }

  const onClose = () => {
    reset()
    setValidations({
      userId: { text: '', isValid: false },
      email: { text: '', isValid: false },
      password1: { text: '', isValid: false },
      password2: { text: '', isValid: false },
      username: { text: '', isValid: false },
      birthday: { text: '', isValid: false },
    })
    toggle()
  }
  
  const isLogin = modalType === 'login'
  const modalTitle = isLogin ? 'Welcome back ' : `Join ${APP_TITLE} 🐣` 
  const submitButtonText = isLogin ? '로그인' : '가입' 
  const onSubmitEvent = isLogin ? onSubmitLogin : onSubmitJoin 
  const SubmitButton = <Button buttonType="submit" styleType="round" bgColor="primary" size="medium" buttonText={submitButtonText} />

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      toggle={onClose}
      size="large"
      submitButton={SubmitButton}
    >
      <WrapForm onSubmit={onSubmitEvent}>
        <JoinModalInputs
          isLogin={isLogin}
          forms={forms}
          onChange={onChange}
          validations={validations}
          setValidations={setValidations}
        />
      </WrapForm>
    </Modal>
  )
}

const WrapForm = styled.form`
  width: 250px;
`

export default JoinModal
