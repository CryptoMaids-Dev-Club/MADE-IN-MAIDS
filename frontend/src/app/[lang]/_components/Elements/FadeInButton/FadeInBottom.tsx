'use client'

// https://zenn.dev/cureapp/articles/63c399916396b6

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
  children: React.ReactNode
}

/**
 * 子要素を下からフェードインさせる
 *
 * @example
 * ```tsx
 * <FadeInBottom>
 *  <div>フェードインする要素</div>
 * </FadeInBottom>
 * ```
 */
export const FadeInBottom: React.FC<Props> = ({ children }) => {
  const { ref, inView } = useInView({
    // ref要素が現れてから50px過ぎたら
    rootMargin: '-50px',
    // 最初の一度だけ実行
    triggerOnce: true,
  })

  const fadeInClassName = inView ? 'animate-fade-in-bottom' : 'opacity-0'

  const wrappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childElement = child as React.ReactElement<{ className?: string; ref?: React.Ref<unknown> }>
      const className = [childElement.props.className, fadeInClassName].filter((el) => el).join(' ')

      return React.cloneElement(childElement, {
        ref,
        className,
      })
    }
    return child
  })

  return <>{wrappedChildren}</>
}
