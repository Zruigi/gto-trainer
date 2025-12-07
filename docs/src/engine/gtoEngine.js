import { enumerateRange } from './ranges.js'

export function analyzePreflop(position, heroHand) {
  const range = enumerateRange(position)
  const inRange = range.some(h => (h[0] === heroHand[0] && h[1] === heroHand[1]) || (h[0] === heroHand[1] && h[1] === heroHand[0]))
  const action = inRange ? 'Open' : 'Fold'
  return { position, action }
}

