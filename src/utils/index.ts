import { APP_TITLE } from "@/constants/etc"

export const getMetaTitle = (PAGE_TITLE: string) => {
  return `${PAGE_TITLE} | ${APP_TITLE}`
}

export const toDateString = (date: Date | string) => {
  if(typeof date === 'string') date = new Date(date)
  
  return date
    .toLocaleDateString('ko-KR', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, '')
    .replace(/ /g,'-')
}