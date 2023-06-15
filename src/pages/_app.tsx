import { AuthProvider } from '../../context/AuthContext'
import { PlaygroundProvider } from '../../context/PlaygroundContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <> <AuthProvider>
      <PlaygroundProvider>
        <Component {...pageProps} />
      </PlaygroundProvider>
    </AuthProvider>
  </>
}
