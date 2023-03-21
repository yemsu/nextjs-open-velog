import styled from "styled-components"
import Input from "@/components/elements/Input";
import WrapInputs from "@/components/elements/InputWrapper";
import { InputCommon } from "@/types/form";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { getIsDuplicatedId } from "@/api/auth";
import { ValidationsState } from "@/types/auth";

interface InputCategory extends InputCommon {
  isForLogin?: boolean
  reg?: RegExp
}

interface JoinModalInputsProps {
  isLogin: boolean,
  forms: {[key: string]: string}
  onChange: (e: SyntheticEvent) => void
  validations: ValidationsState
  setValidations: () => void
}

interface InputCategory {
  type: string
  name: string
  label: string
  value?: string
  placeholder?: string
  reg?: RegExp
}

const inputCategories: InputCategory[][] = [
  [{
    type: 'text',
    name: 'userId',
    label: '아이디',
    placeholder: '영문, 숫자 포함(6~16자)',
    reg: /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{6,16}$/,
  }],
  [{
    type: 'password',
    name: 'password1',
    label: '비밀번호',
    placeholder: '영문, 숫자, 특수문자 포함(8자 이상)',
    reg: /^(?=.*[a-z])(?=.*\d)[a-z\d$@$!%*#?&]{8,}$/i,
  }],
  [{
    type: 'password',
    name: 'password2',
    label: '비밀번호 확인',
  }],
  [{
    type: 'email',
    name: 'email',
    label: '이메일',
    placeholder: 'ex) abcde@gmail.com',
    reg: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  }],
  [{
    type: 'text',
    name: 'username',
    label: '닉네임',
    placeholder: '한글, 영문, 숫자 사용 가능(3~10자)',
    reg: /^[a-z가-힣0-9]{3,10}$/i,
  }],
  [{
    type: 'number',
    name: 'birthday',
    label: '생년월일',
    placeholder: '생년월일 8자리 ex)19910610',
    reg: /^[0-9]{8}$/,
  }],
  [{
    type: 'radio',
    id: 'woman',
    name: 'gender',
    label: '여',
    value: 'woman'
  },
  {
    type: 'radio',
    id: 'man',
    name: 'gender',
    label: '남',
    value: 'man'
  }]
]

function JoinModalInputs(props: JoinModalInputsProps) {
  const {
    isLogin,
    forms,
    onChange,
    validations,
    setValidations } = props
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const isInValidRegexp = useCallback((
    value: string,
    reg: RegExp | undefined
  ) => {
    if(isLogin || !value || !reg) return false
    return !value.match(reg)
  }, [isLogin, forms])

  const getInputCategoryOf = useCallback((name: string) => {
    return inputCategories
      .flatMap(category => category)
      .find((category) => category.name === name)
  }, [])

  const onChangeValue = (e: SyntheticEvent) => {
    onChange(e)
    
    const { name, value } = e.target as HTMLInputElement
    checkValidationHandler(name, value)
  }

  const checkValidationHandler = (
    name: string,
    value: string
  ) => {
    if(!validations[name] || !inputCategories) return
    const inputCategory = getInputCategoryOf(name)
    if(!inputCategory) return
    const { reg, placeholder } = inputCategory
    const isValidRegexp = !isInValidRegexp(value, reg)
    // 정규식 조건도 안맞으면 무조건 placeholder 노출
    if(!isValidRegexp) {
      setValidationHandler(
        name, placeholder || '', isValidRegexp
      )
      return
    }
    // 항목별 validation 처리
    switch (name) {
      case 'userId':
        setValidationUserIdHandler(value)
        break
      case 'password2':
        setValidationPassword2Handler('password2', value)
        break
      case 'password1':
        setValidationPassword2Handler('password1', value)
      default:
        setValidationHandler(
          name, placeholder || '', isValidRegexp
        )
    }
  }

  const setValidationHandler = useCallback((
    name: string,
    placeholder: string,
    isValidRegexp: boolean
  ) => {
    setValidations(prev => ({
      ...prev,
      [name]: {
        text: placeholder,
        isValid: isValidRegexp
      }
    }))
  }, [setValidations])

  const checkUserIDDuplicated = useCallback((value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise((resolve) => {
      const newTimer = setTimeout(async () => {
        const isDuplicatedId = await getIsDuplicatedId({
          userId: value
        })
        resolve(isDuplicatedId)
      }, 800);
      setTimer(newTimer);
    })
  }, [timer, setValidations])

  const setValidationUserIdHandler = useCallback((value: string) => {
    checkUserIDDuplicated(value)
      .then(isDuplicatedId => {
        const text = !isDuplicatedId
          ? '사용 가능한 아이디 입니다.'
          : '이미 사용중인 아이디입니다.'
        setValidationHandler(
          'userId', text, !isDuplicatedId
        )
      })
  }, [timer, setValidations])

  const setValidationPassword2Handler = useCallback((
    name: string,
    value: string,
  ) => {
    const targetValue = name === 'password1'
      ? forms.password2 : forms.password1
    const isValid = targetValue === value
    const text = isValid
      ? '사용 가능한 패스워드 입니다.'
      : '입력한 패스워드가 서로 다릅니다.'
    setValidationHandler(
      'password2', text, isValid
    )
  }, [forms.password1, forms.password2])

  const isVisibleCategory = useCallback((inputs: InputCategory[]) => {
    return !isLogin || (isLogin && isInputForLogin(inputs))
  }, [isLogin])

  const isChecked = (
    formData: string,
    type: string,
    i: number,
    value?: string,
  ) => {
    if(!['radio', 'checkbox'].includes(type)) return undefined
    // radio 버튼 첫번째 기본 상태 그대로 submit할 가능성 고려하여 default check 제거
    // const defaultFirstCheck = type === 'radio' && !formData && i === 0
    return formData === value
  }

  return (
    <>
      {inputCategories.map((inputs, i) => {
        return (
          isVisibleCategory(inputs) &&
            <WrapInputs key={`category${i}`}>
              {inputs.map(({
                type,
                id,
                name,
                label,
                value,
                placeholder,
                reg
              }: InputCategory, i) => {
                return (
                  <React.Fragment key={name + id}>
                    <Input
                      type={type}
                      id={id}
                      name={name}
                      label={label}
                      value={value || forms[name]}
                      checked={isChecked(forms[name], type, i, value)}
                      placeholder={placeholder}
                      onChange={onChangeValue}
                    />
                    {
                      validations[name]?.text && 
                        <TextValidation className={validations[name].isValid ? 'pass' : ''}>
                          {validations[name].text}
                        </TextValidation>
                    }
                  </React.Fragment>
                )
              })}
            </WrapInputs>
        )
      })}
    </>
  )
}

function isInputForLogin(inputs: InputCategory[]) {
  return ['userId', 'password1'].includes(inputs[0].name)
}


const TextValidation = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: var(--font-size-XS);
  &:not(.pass) {
    color: #f33c5a;
    font-weight: var(--font-weight-bold);
    &:before {
      content: '❗';
    }
  }
  &.pass {
    color: #21b98c;
    &:before {
      content: '✅';
    }
  }
`

export default JoinModalInputs