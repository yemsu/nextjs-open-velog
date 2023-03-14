import GlobalStyle from '@/styles/global-style'
import Header from '@/components/layouts/Header'
import '@/styles/globals/index.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/store'

const store = configureStore({reducer: rootReducer});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
