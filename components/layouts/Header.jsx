import Link from "next/link"
import styles from '@/styles/components/layouts/Header.module.scss'

export default function Header() {
  const { header, logo, utils, util } = styles
  return (
    <div className={header}>
      <h1 className={logo}>
        <Link href="/">📑blog</Link>
      </h1>
      <ul className={utils}>
        <li className={util}>
          <button>회원 가입</button>
        </li>
        <li className={util}>
          <button>로그인</button>
        </li>
      </ul>
    </div>
  )
}
