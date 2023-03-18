export interface InputCommon {
  type: 'text' | 'password' | 'number' | 'email' | 'radio' | 'checkbox' | 'textarea' | string,
  name: string,
  id?: string,
  label?: string,
  value?: string,
  placeholder?: string,
}
