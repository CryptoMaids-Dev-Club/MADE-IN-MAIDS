'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const BackToTop = () => {
  // 表示切り替えフラグ
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // スクロールイベントをListen
  useEffect(() => {
    window.addEventListener('scroll', watchScroll)
    return () => {
      window.removeEventListener('scroll', watchScroll)
    }
  }, [])

  // Scrollを検知しボタン表示のフラグを切り替え
  const watchScroll = () => {
    const basePosition = 500
    const scrollPosition = window.scrollY
    setShowScrollToTop(basePosition <= scrollPosition)
  }

  return (
    <>
      {showScrollToTop && (
        <div className='fixed bottom-12 right-8 hidden md:block'>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='rounded-full bg-pink-500 p-2 text-white hover:bg-pink-600'>
            ↑ Back to Top
          </Button>
        </div>
      )}
    </>
  )
}

export default BackToTop
