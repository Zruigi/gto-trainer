import { RANKS_MAP, SUITS_MAP, stringToCard } from './deck.js'
import rangesData from './preflopRanges.js'

function pairCombos(rank) {
  const cards = [0,1,2,3].map(s => rank * 4 + s)
  const combos = []
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      combos.push([cards[i], cards[j]])
    }
  }
  return combos
}

function suitedCombos(r1, r2) {
  const combos = []
  for (let s = 0; s < 4; s++) {
    combos.push([r1 * 4 + s, r2 * 4 + s])
  }
  return combos
}

function offsuitCombos(r1, r2) {
  const combos = []
  for (let s1 = 0; s1 < 4; s1++) {
    for (let s2 = 0; s2 < 4; s2++) {
      if (s1 === s2) continue
      combos.push([r1 * 4 + s1, r2 * 4 + s2])
    }
  }
  return combos
}

function parseCombo(combo) {
  if (combo.length === 2 && combo[0] === combo[1]) {
    const r = RANKS_MAP[combo[0]]
    return pairCombos(r)
  }
  const r1 = RANKS_MAP[combo[0]]
  const r2 = RANKS_MAP[combo[1]]
  const tail = combo[2] || ''
  if (tail === 's') return suitedCombos(r1, r2)
  if (tail === 'o') return offsuitCombos(r1, r2)
  return suitedCombos(r1, r2).concat(offsuitCombos(r1, r2))
}

export function enumerateRange(position) {
  const list = rangesData[position] || []
  const out = []
  for (const c of list) {
    for (const h of parseCombo(c)) out.push(h)
  }
  return out
}

export function sampleHandsFromRange(position, n, exclude=[]) {
  const all = enumerateRange(position).filter(h => !exclude.includes(h[0]) && !exclude.includes(h[1]))
  const res = []
  const used = new Set()
  while (res.length < n && all.length > 0) {
    const idx = Math.floor(Math.random() * all.length)
    const h = all[idx]
    const key = h[0] + '-' + h[1]
    if (!used.has(key)) {
      res.push(h)
      used.add(key)
    }
  }
  return res
}

export function parseHandString(str) {
  const [a,b] = [str.slice(0,2), str.slice(2,4)]
  return [stringToCard(a), stringToCard(b)]
}

