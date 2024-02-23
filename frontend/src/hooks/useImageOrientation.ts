'use client'

import { useEffect, useState } from 'react'

type Orientation = 'landscape' | 'portrait' | null

const createImageElement = (src: string) =>
  new Promise<HTMLImageElement>((resolve) => {
    const imageElement = new Image()
    imageElement.onload = () => resolve(imageElement)
    imageElement.src = src
  })

export const useImageOrientation = (imageSrc: string): string | null => {
  const [orientation, setOrientation] = useState<Orientation>(null)

  useEffect(() => {
    const handleSetOrientation = async () => {
      const imageElement = await createImageElement(imageSrc)
      setOrientation(imageElement.width > imageElement.height ? 'landscape' : 'portrait')
    }
    void handleSetOrientation()
  }, [imageSrc])

  return orientation
}

export default useImageOrientation
