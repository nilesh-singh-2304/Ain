import { AppProps } from 'next/app'
import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps } : AppProps) {
  useEffect(() => {
    // prefer-reduced-motion: respect user preference
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) {
      document.documentElement.dataset.reducedMotion = "true"
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
