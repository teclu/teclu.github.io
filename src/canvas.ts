import { BACKGROUND, FPS_LIMIT, MAX_PARTICLES, SQUARE_WIDTH } from './constants'
import { Particle } from './types'
import { generateRandomCoordinate, generateRandomColor } from './utils'

const particles: Array<Particle> = []

let previousTick: number = 0

const isNextFrameReady = (): boolean => {
  const currentTick = Math.round((FPS_LIMIT * Date.now()) / 1000)
  if (currentTick === previousTick) {
    return false
  }
  previousTick = currentTick
  return true
}

const updateCanvas = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
): void => {
  window.requestAnimationFrame((): void => updateCanvas(canvas, context))
  if (isNextFrameReady()) {
    context.fillStyle = BACKGROUND
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.lineWidth = 1
    particles.forEach((particle: Particle): void => {
      context.strokeStyle = particle.color
      context.strokeRect(particle.x, particle.y, SQUARE_WIDTH, SQUARE_WIDTH)
      particle.x += (Math.random() > 0.5 ? 1 : -1) * SQUARE_WIDTH
      particle.y += (Math.random() > 0.5 ? 1 : -1) * SQUARE_WIDTH
      if (particle.x > canvas.width || particle.x < 0) {
        particle.x = generateRandomCoordinate(canvas.width)
      }
      if (particle.y > canvas.height || particle.x < 0) {
        particle.y = generateRandomCoordinate(canvas.height)
      }
    })
  }
}

const initialiseParticles = (canvas: HTMLCanvasElement): void => {
  if (particles.length === 0) {
    for (let index = 0; index < MAX_PARTICLES; index++) {
      particles.push({
        color: generateRandomColor(),
        x: generateRandomCoordinate(canvas.width),
        y: generateRandomCoordinate(canvas.height),
      })
    }
  } else {
    particles.forEach((particle: Particle): void => {
      particle.x = generateRandomCoordinate(canvas.width)
      particle.y = generateRandomCoordinate(canvas.height)
    })
  }
}

const initialiseCanvas = (): void => {
  const canvas: HTMLCanvasElement | null =
    document.querySelector('canvas#background')
  if (canvas) {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    if (context) {
      const resizeCanvas = (): void => {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        initialiseParticles(canvas)
      }
      const observer = new ResizeObserver(resizeCanvas)
      observer.observe(document.body)
      window.requestAnimationFrame((): void => updateCanvas(canvas, context))
    } else {
      console.error('CanvasRenderingContext2D not found!')
    }
  } else {
    console.error('HTMLCanvasElement not found!')
  }
}

initialiseCanvas()
