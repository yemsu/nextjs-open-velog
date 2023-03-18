interface Category {
  [key: string]: boolean
}

interface Messages {
  [key: string]: string
}

const messages: Messages = {
  title: '제목을 입력해주세요.',
  content: '내용을 입력해주세요.'
}

function checkValidations(category: Category) {
  const alerts = []
  for(const key in category) {
    const value = category[key]
    if(value) continue
    alerts.push(messages[key])
  }
  if(alerts.length > 0) {
    alert(alerts.join('\n'))
  } 
  return alerts.length > 0
}

export default checkValidations