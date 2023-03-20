import styled from "styled-components"
import Input from "@/components/elements/Input";
import WrapInputs from "@/components/elements/InputWrapper";
import { InputCommon } from "@/types/form";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";

interface InputCategory extends InputCommon {
  isForLogin?: boolean
  reg?: RegExp
}

interface JoinModalInputsProps {
  isLogin: boolean,
  forms: {[key: string]: string}
  onChange: (e: SyntheticEvent) => void
}

const inputCategories = [
  [{
    type: 'text',
    name: 'userId',
    label: '아이디',
    placeholder: '영문, 숫자 포함(6~16자)',
    reg: /(?=.*?[0-9])(?=.*?[a-z]).{6,16}/,
  }],
  [{
    type: 'password',
    name: 'password1',
    label: '비밀번호',
    placeholder: '영문, 숫자, 특수문자 포함(8자 이상)',
    reg: /(?=.*[a-z])(?=.*\d)[a-z\d$@$!%*#?&]{8,}/i,
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
    reg: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
  }],
  [{
    type: 'text',
    name: 'username',
    label: '닉네임',
    placeholder: '한글, 영문, 숫자 사용 가능(3~10자)',
    reg: /[a-z가-힣ㄱ-ㅎㅏ-ㅣ0-9]{3,10}/i,
  }],
  [{
    type: 'number',
    name: 'birthday',
    label: '생년월일',
    placeholder: '생년월일 8자리 ex)19910610',
    reg: /[0-9]{8}/,
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
  const { isLogin, forms, onChange } = props
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [customValidations, setCustomValidations] = useState<{[key: string]: string}>({
    userId: '',
    password2: '',
  })

  const showInvalidRegAlert = useCallback((
    inputName: string,
    reg: RegExp | undefined
  ) => {
    if(isLogin || !forms[inputName] || !reg) return false
    return !forms[inputName].match(reg)
  }, [isLogin, forms])

  useEffect(() => {
    if (timer) {
      console.log('clear timer');
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      // setCustomValidations(prev => ({...prev, userId: '사용 가능한 아이디 입니다.'}))
    }, 800);
    setTimer(newTimer);
  }, [forms.userId])
  
  useEffect(() => {
    console.log('dsdfsf', forms.password2 , forms.password1)
    if(forms.password2 !== forms.password1) {
      setCustomValidations(prev => ({...prev, password2: '입력한 패스워드가 서로 다릅니다.'}))
    } else {
      setCustomValidations(prev => ({...prev, password2: ''}))
    }
  }, [forms.password1, forms.password2])

  const customInvalidAlert = useCallback((
    name: string
  ) => {
    if(isLogin || !['userId', 'password2'].includes(name) || !forms[name]) return false

    switch(name) {
      case 'userId':
      //  setTimer(forms.userId)
      case 'password2':
        if(forms.password2 !== forms.password1) {
          return '입력한 패스워드가 서로 다릅니다.'
        }
      default:
        return false
    }
  }, [isLogin, forms])

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
    const defaultFirstCheck = type === 'radio' && !formData && i === 0
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
                      onChange={onChange}
                    />
                    {
                      reg && forms[name] && !customValidations[name] &&
                        <TextValidation>{placeholder}</TextValidation>
                    }
                    {
                      customValidations[name] &&
                        <TextValidation>{customValidations[name]}</TextValidation>
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
  color: hsla(var(--primary-hsl));
`

export default JoinModalInputs