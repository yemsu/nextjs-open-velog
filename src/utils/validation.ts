interface Category {
  [key: string]: string | number | boolean
}

interface Messages {
  [key: string]: string
}

const messages: Messages = {
  title: '제목',
  content: '내용',
  searchKeyword: '검색어',
  userId: '아이디',
  username: '닉네임',
  password: '비밀번호',
  password1: '비밀번호',
  password2: '비밀번호 확인',
  email: '이메일',
  birthday: '생년월일',
  gender: '성별',
}

function checkValidations(category: Category) {
  const alerts = []
  for(const key in category) {
    const value = `${category[key]}`.replace(/ /g, '')
    if(value) continue
    
    alerts.push(messages[key])
  }
  if(alerts.length > 0) {
    alert(`❗${alerts.join(', ')}❗\n위 항목을 확인해 주세요!`)
  } 
  return alerts.length > 0
}

export default checkValidations