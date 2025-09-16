import { useEffect, useState } from 'react'
import { useUsers } from '../context/UserContext'

// A tiny diagnostic component to verify dark mode application.
export default function ThemeProbe() {
  const { theme } = useUsers() || { theme: 'light' }
  const [computed, setComputed] = useState({ bodyBg: '', rootClasses: '' })

  useEffect(() => {
    const bodyBg = getComputedStyle(document.body).backgroundColor
    setComputed({ bodyBg, rootClasses: document.documentElement.className })
    // eslint-disable-next-line no-console
    console.log('[ThemeProbe]', { theme, bodyBg, rootClasses: document.documentElement.className })
  }, [theme])

  return (
    <div className="fixed bottom-2 right-2 z-50 text-xs font-mono px-2 py-1 rounded bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-300 dark:border-gray-600 shadow">
      <div>theme: <strong>{theme}</strong></div>
      <div>html: {computed.rootClasses || '(none)'}</div>
      <div>bg: {computed.bodyBg}</div>
    </div>
  )
}