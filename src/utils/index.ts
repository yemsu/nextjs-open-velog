import { APP_TITLE } from "@/constants/etc"

export const getMetaTitle = (PAGE_TITLE: string) => {
  return `${PAGE_TITLE} | ${APP_TITLE}`
}