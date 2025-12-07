import { rankOf, suitOf } from './deck.js'

function countsByRank(cards) {
  const counts = Array(13).fill(0)
  for (const c of cards) counts[rankOf(c)]++
  return counts
}

function countsBySuit(cards) {
  const counts = Array(4).fill(0)
  for (const c of cards) counts[suitOf(c)]++
  return counts
}

function highestStraightRank(rankSet) {
  for (let r = 12; r >= 4; r--) {
    let ok = true
    for (let k = 0; k < 5; k++) if (!rankSet.has(r - k)) ok = false
    if (ok) return r
  }
  const wheel = [12,0,1,2,3]
  if (wheel.every(x => rankSet.has(x))) return 3
  return -1
}

function topRanks(rankCounts, n) {
  const arr = []
  for (let r = 12; r >= 0 && arr.length < n; r--) if (rankCounts[r] > 0) arr.push(r)
  return arr
}

export function evaluateSeven(cards) {
  const rc = countsByRank(cards)
  const sc = countsBySuit(cards)
  const rankSet = new Set()
  for (let r = 0; r < 13; r++) if (rc[r] > 0) rankSet.add(r)
  const flushSuit = sc.findIndex(x => x >= 5)
  const straightHigh = highestStraightRank(rankSet)
  let four = -1, three = -1
  const pairs = []
  for (let r = 12; r >= 0; r--) {
    if (rc[r] === 4) four = r
    else if (rc[r] === 3) three = three === -1 ? r : three
    else if (rc[r] === 2) pairs.push(r)
  }
  if (flushSuit !== -1 && straightHigh !== -1) {
    return { cat: 8, ranks: [straightHigh] }
  }
  if (four !== -1) {
    return { cat: 7, ranks: [four, topRanks(rc,1)[0]] }
  }
  if (three !== -1 && pairs.length > 0) {
    return { cat: 6, ranks: [three, pairs[0]] }
  }
  if (flushSuit !== -1) {
    const flushRanks = cards.filter(c => suitOf(c) === flushSuit).map(rankOf).sort((a,b)=>b-a).slice(0,5)
    return { cat: 5, ranks: flushRanks }
  }
  if (straightHigh !== -1) {
    return { cat: 4, ranks: [straightHigh] }
  }
  if (three !== -1) {
    const kickers = topRanks(rc, 5).filter(r => r !== three).slice(0,2)
    return { cat: 3, ranks: [three, ...kickers] }
  }
  if (pairs.length >= 2) {
    const top2 = pairs.slice(0,2)
    const kicker = topRanks(rc,5).filter(r => r !== top2[0] && r !== top2[1])[0]
    return { cat: 2, ranks: [...top2, kicker] }
  }
  if (pairs.length === 1) {
    const pair = pairs[0]
    const kickers = topRanks(rc,5).filter(r => r !== pair).slice(0,3)
    return { cat: 1, ranks: [pair, ...kickers] }
  }
  const highs = topRanks(rc,5)
  return { cat: 0, ranks: highs }
}

export function compareHands(cardsA, cardsB) {
  const a = evaluateSeven(cardsA)
  const b = evaluateSeven(cardsB)
  if (a.cat !== b.cat) return a.cat > b.cat ? 1 : -1
  for (let i = 0; i < Math.max(a.ranks.length, b.ranks.length); i++) {
    const ar = a.ranks[i] || -1
    const br = b.ranks[i] || -1
    if (ar !== br) return ar > br ? 1 : -1
  }
  return 0
}

