import React, { useEffect, useRef, useState, PropsWithChildren } from 'react'
import { useLayerScrollSubscriber } from "./useScrollLayer";

export interface ScrollLayerProps extends PropsWithChildren<any> {
  frames: number
  id: string
  className?: string
  noSticky?: boolean
}

const ScrollClass = 'scroll-layer-sticky'

export const ScrollLayer = (
  {
    children,
    frames = 1,
    id,
    className = '',
    noSticky = false
  }: ScrollLayerProps
) => {
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const {subscribe} = useLayerScrollSubscriber()
  useEffect(() => {
    const unsubscribe = subscribe(id, ref)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const resize = () => {
      if (ref?.current && ref.current?.children?.length) {
        if (!noSticky && ref.current?.children[0].classList.contains(ScrollClass)) {
          ref.current?.children[0].classList.add(ScrollClass)
        }
        const rect = (ref.current as any).children[0].getBoundingClientRect()
        setHeight(rect.height * frames)
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    }
  }, [frames])

  return (
    <div id={id} style={{height}} className={className as string} ref={ref}>
      {children}
    </div>
  )
}
