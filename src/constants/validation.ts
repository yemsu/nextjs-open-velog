interface UserInfoValidation {
  [key: string]: {TEXT: string, REG: RegExp | undefined}
}

export const USER_INFO_VALIDATION: UserInfoValidation = {
  USER_ID: {
    TEXT: '영문, 숫자 포함(6~16자)',
    REG: /(?=.*?[0-9])(?=.*?[a-z]).{6,16}/
  },
  PASSWORD: {
    TEXT: '영문, 숫자, 특수문자 포함(8자 이상)',
    REG: /(?=.*[a-z])(?=.*\d)[a-z\d$@$!%*#?&]{8,}/i
  },
  EMAIL: {
    TEXT: 'ex) abcde@gmail.com',
    REG: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i
  },
  USERNAME: {
    TEXT: '한글, 영문, 숫자 사용 가능(3~10자)',
    REG: /[a-z가-힣ㄱ-ㅎㅏ-ㅣ0-9]{3,10}/i
  },
  BIRTHDAY: {
    TEXT: '생년월일 8자리 ex)19910610',
    REG: /[0-9]{8}/
  },
}
