import '@/styles/globals/index.scss'
import GlobalStyle from '@/styles/global-style'
import Header from '@/components/layouts/Header'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/store'

const store = configureStore({reducer: rootReducer});
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />      
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </>
  )
}
