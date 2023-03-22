export interface InputCommon {
  type: 'text' | 'password' | 'number' | 'email' | 'radio' | 'checkbox' | 'textarea' | string,
  name: string,
  id?: string,
  label?: string,
  value?: string,
  placeholder?: string,
}

export interface InputCategory extends InputCommon {
  reg?: RegExp
}

export interface Forms {
  [key: string]: string
}