import GlobalStyle from '@/styles/global-style'
import Header from '@/components/layouts/Header'
import '@/styles/globals/index.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  )
}
