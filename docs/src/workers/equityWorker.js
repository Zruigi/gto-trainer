import { equityVsRange } from '../engine/equityMonteCarlo.js'

self.onmessage = e => {
  const { hero, position, board, trials } = e.data
  const r = equityVsRange(hero, position, board, trials)
  self.postMessage(r)
}

