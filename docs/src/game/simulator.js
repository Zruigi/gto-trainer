import { makeDeck, removeCards, pickRandomCards } from '../engine/deck.js'
import { sampleHandsFromRange } from '../engine/ranges.js'
import { compareHands } from '../engine/evaluator.js'

export function simulateFoldOutcome(heroHand, position, knownBoard=[], trials=1000, pot=20) {
  let win = 0, tie = 0
  for (let t = 0; t < trials; t++) {
    const deck = makeDeck()
    const used = [heroHand[0], heroHand[1], ...knownBoard]
    const d2 = removeCards(deck, used)
    const [villain] = sampleHandsFromRange(position, 1, used)
    const d3 = removeCards(d2, villain)
    const need = 5 - knownBoard.length
    const runout = pickRandomCards(d3, need)
    const board = knownBoard.concat(runout)
    const res = compareHands([heroHand[0], heroHand[1], ...board], [villain[0], villain[1], ...board])
    if (res > 0) win++
    else if (res === 0) tie++
  }
  const equity = (win + tie * 0.5) / trials
  const ev = equity * pot - (1 - equity) * pot
  return { equity, ev }
}

