const RANKS = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
const SUITS = ['s','h','d','c']

export function makeDeck() {
  const deck = []
  for (let r = 0; r < 13; r++) {
    for (let s = 0; s < 4; s++) {
      deck.push(r * 4 + s)
    }
  }
  return deck
}

export function rankOf(card) {
  return Math.floor(card / 4)
}

export function suitOf(card) {
  return card % 4
}

export function cardToString(card) {
  return RANKS[rankOf(card)] + SUITS[suitOf(card)]
}

export function stringToCard(str) {
  const r = RANKS.indexOf(str[0])
  const s = SUITS.indexOf(str[1])
  if (r < 0 || s < 0) throw new Error('invalid card: ' + str)
  return r * 4 + s
}

export function removeCards(deck, cards) {
  const set = new Set(cards)
  return deck.filter(c => !set.has(c))
}

export function pickRandomCards(deck, count) {
  const d = deck.slice()
  const picked = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * d.length)
    picked.push(d[idx])
    d.splice(idx, 1)
  }
  return picked
}

export const RANKS_MAP = {
  '2':0,'3':1,'4':2,'5':3,'6':4,'7':5,'8':6,'9':7,'T':8,'J':9,'Q':10,'K':11,'A':12
}

export const SUITS_MAP = { 's':0,'h':1,'d':2,'c':3 }

