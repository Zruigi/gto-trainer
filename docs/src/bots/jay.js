import { chooseAction } from './decisionTree.js'

export function actJay(context) {
  const rules = [
    { when: ctx => ctx.equity > 0.6, do: ctx => ({ type: 'Bet', size: ctx.pot }) },
    { when: ctx => ctx.equity < 0.4 && ctx.position === 'Late' && ctx.boardScary, do: ctx => ({ type: 'Raise', size: ctx.pot }) },
    { when: ctx => (ctx.boardHasAK && ctx.opponentChecked), do: ctx => ({ type: 'Bet', size: ctx.pot * 0.75 }) }
  ]
  return chooseAction(context, rules)
}

