export function setCookie(
  name: string,
  value: string,
  expires: number
){
	const date = new Date()
	date.setTime(date.getTime() + expires*24*60*60*1000)

  document.cookie = `${name}=${value}; path=/; expires=${date}`
}

export function getCookie(name: string) {
	const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    
	return value ? value[2] : null
}

export function removeCookie(name: string) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`
}