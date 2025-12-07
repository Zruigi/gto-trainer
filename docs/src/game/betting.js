export function betSizes(pot, cap=50) {
  const s1 = Math.min(Math.floor(pot * 0.5), cap)
  const s2 = Math.min(Math.floor(pot * 1.0), cap)
  const s3 = cap
  return [s1, s2, s3]
}

export function requiredEquity(bet, pot) {
  return bet / (bet + pot)
}

export function applyBet(state, player, amount) {
  const a = Math.min(amount, state.stacks[player])
  state.stacks[player] -= a
  state.pot += a
  state.bets[player] += a
}

