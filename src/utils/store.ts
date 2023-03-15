import { ErrorResponse } from '@/types/api'

export function getRejectValue(error: any): ErrorResponse {
  let rejectValue = { message: '', code: '', status: 0 }
  if(error.response.data) {
    const responseData = error.response.data
    rejectValue = { 
      message: responseData.data.errorMessage,
      code: responseData.data.errorType,
      status: responseData.status
    }
  } else {
    const { message, code, response: { status } } = error
    rejectValue = { 
      message,
      code,
      status
    }
  }
  return rejectValue
}