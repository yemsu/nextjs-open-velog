export interface InputCommon {
  type: 'text' | 'password' | 'new-password' | 'number' | 'email' | 'radio' | 'checkbox' | 'textarea' | string,
  name: string,
  id?: string,
  label?: string,
  value?: string,
  placeholder?: string,
  maxLength?: number
  minLength?: number
  autoCompleteName?: string
  checked?: boolean
  isRequired?: boolean
  size?: 'small' | 'medium' | 'big'
}

export interface InputCategory extends InputCommon {
  reg?: RegExp
}

export interface Forms {
  [key: string]: string
}