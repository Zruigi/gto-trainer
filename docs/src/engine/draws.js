import { rankOf, suitOf } from './deck.js'

export function flushDraw(hand, board) {
  const counts = Array(4).fill(0)
  for (const c of hand.concat(board)) counts[suitOf(c)]++
  const suit = counts.findIndex(x => x === 4)
  return suit !== -1
}

export function openEndedStraightDraw(hand, board) {
  const set = new Set()
  for (const c of hand.concat(board)) set.add(rankOf(c))
  for (let r = 0; r <= 8; r++) {
    const need = [r,r+1,r+2,r+3]
    const have = need.filter(x => set.has(x)).length
    if (have >= 4) {
      const left = r-1 >= 0 ? !set.has(r-1) : false
      const right = r+4 <= 12 ? !set.has(r+4) : false
      if (left && right) return true
    }
  }
  return false
}

export function gutshotDraw(hand, board) {
  const set = new Set()
  for (const c of hand.concat(board)) set.add(rankOf(c))
  for (let r = 0; r <= 9; r++) {
    const window = [r,r+1,r+2,r+3,r+4]
    const have = window.filter(x => set.has(x)).length
    if (have === 4) return true
  }
  return false
}

