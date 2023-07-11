import { SQUARE_WIDTH } from './constants'

export const generateRandomColor = (): string => {
  const generateRandomColorValue = (): number => Math.round(Math.random() * 255)
  const r = generateRandomColorValue()
  const g = generateRandomColorValue()
  const b = generateRandomColorValue()
  const a = 0.5
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const generateRandomCoordinate = (length: number): number => {
  const max = length * 0.675
  const min = length * 0.325
  let coordinate = Math.round(Math.random() * (max - min) + min)
  while (coordinate % SQUARE_WIDTH) {
    coordinate += 1
  }
  return coordinate
}
